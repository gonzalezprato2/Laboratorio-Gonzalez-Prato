import { LabExam, KnowledgeDocument, WorkingScheduleConfig, SystemConfig } from '../types/lab';
import { knowledgeService } from './knowledgeService';

export interface AgentAnalysisResult {
  replyText: string;
  matchedExams: LabExam[];
  matchedKnowledgeDocs: KnowledgeDocument[];
  totalUsd: number;
  shouldEscalate: boolean;
  isOutOfHours: boolean;
  escalationStatus: 'BOT_ACTIVO' | 'ESCALADO_HUMANO' | 'ESCALADO_FUERA_HORARIO';
  escalationReason?: string;
}

const ESCALATION_TRIGGERS = [
  'secretaria', 'secretario', 'persona', 'humano', 'operador', 'asesor',
  'hablar con alguien', 'hablar con una persona', 'recepcion', 'gerente',
  'reclamo', 'emergencia', 'urgente', 'urgencia', 'domicilio', 'toma a domicilio',
  'transferir', 'doctora', 'luisa', 'gonzalez'
];

function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();
}

export function isCurrentlyInWorkingHours(schedule?: WorkingScheduleConfig): { isOpen: boolean; nextOpening: string } {
  if (!schedule) return { isOpen: true, nextOpening: 'Horario Regular' };

  const now = new Date();
  const day = now.getDay(); // 0: Dom, 1-5: Lun-Vie, 6: Sab
  const hour = now.getHours();
  const minutes = now.getMinutes();
  const currentMinutes = hour * 60 + minutes;

  // Domingo
  if (day === 0) {
    if (!schedule.sundayEnabled) {
      return { isOpen: false, nextOpening: 'Lunes a las ' + schedule.weekdaysOpen + ' AM' };
    }
    const [sOpenH, sOpenM] = (schedule.sundayOpen || '08:00').split(':').map(Number);
    const [sCloseH, sCloseM] = (schedule.sundayClose || '12:00').split(':').map(Number);
    const isOpen = currentMinutes >= (sOpenH * 60 + sOpenM) && currentMinutes < (sCloseH * 60 + sCloseM);
    return { isOpen, nextOpening: 'Lunes a las ' + schedule.weekdaysOpen + ' AM' };
  }

  // Sábado
  if (day === 6) {
    if (!schedule.saturdayEnabled) {
      return { isOpen: false, nextOpening: 'Lunes a las ' + schedule.weekdaysOpen + ' AM' };
    }
    const [satOpenH, satOpenM] = (schedule.saturdayOpen || '08:00').split(':').map(Number);
    const [satCloseH, satCloseM] = (schedule.saturdayClose || '13:00').split(':').map(Number);
    const isOpen = currentMinutes >= (satOpenH * 60 + satOpenM) && currentMinutes < (satCloseH * 60 + satCloseM);
    return { isOpen, nextOpening: 'Lunes a las ' + schedule.weekdaysOpen + ' AM' };
  }

  // Lunes a Viernes
  const [wOpenH, wOpenM] = (schedule.weekdaysOpen || '07:00').split(':').map(Number);
  const [wCloseH, wCloseM] = (schedule.weekdaysClose || '15:00').split(':').map(Number);
  const openMins = wOpenH * 60 + wOpenM;
  const closeMins = wCloseH * 60 + wCloseM;
  const isOpen = currentMinutes >= openMins && currentMinutes < closeMins;
  const nextOpening = day === 5 && currentMinutes >= closeMins
    ? (schedule.saturdayEnabled ? 'Sábado a las ' + (schedule.saturdayOpen || '08:00') + ' AM' : 'Lunes a las ' + schedule.weekdaysOpen + ' AM')
    : 'Mañana a las ' + schedule.weekdaysOpen + ' AM';

  return { isOpen, nextOpening };
}

export function processPatientMessage(
  userText: string,
  catalog: LabExam[],
  exchangeRate?: number,
  scheduleConfig?: WorkingScheduleConfig,
  forceWeekendMode?: boolean,
  systemConfig?: SystemConfig
): AgentAnalysisResult {
  const normUser = normalizeText(userText);
  const knowledgeDocs = knowledgeService.getDocs().filter(d => d.active);

  const effectiveSchedule = scheduleConfig || systemConfig?.scheduleConfig;
  const scheduleStatus = forceWeekendMode ? { isOpen: false, nextOpening: 'Lunes a las 7:00 AM' } : isCurrentlyInWorkingHours(effectiveSchedule);
  const isOutOfHours = !scheduleStatus.isOpen;

  // 1. Detección de Handover Humano
  const needsHuman = ESCALATION_TRIGGERS.some(trigger => normUser.includes(trigger));

  if (needsHuman) {
    if (isOutOfHours) {
      const customMsg = effectiveSchedule?.outOfHoursCustomMessage || 'Estimado paciente, nuestra sede física se encuentra en receso fuera de horario laboral. He registrado su solicitud con prioridad alta.';
      return {
        replyText: '📌 *ATENCIÓN DE RECEPCIÓN FUERA DE HORARIO*\n\n' + customMsg + '\n\n⏰ *Próxima apertura para atención humana:* ' + scheduleStatus.nextOpening + '.\n\n*(El Asistente Virtual sigue 100% disponible en este chat para cotizar exámenes y consultar ayunos).*',
        matchedExams: [],
        matchedKnowledgeDocs: [],
        totalUsd: 0,
        shouldEscalate: true,
        isOutOfHours: true,
        escalationStatus: 'ESCALADO_FUERA_HORARIO',
        escalationReason: 'Solicitud humana registrada fuera de horario (Pendiente de guardia)'
      };
    } else {
      const labName = systemConfig?.laboratoryName || 'GONZALEZ-PRATO Laboratorio';
      return {
        replyText: 'Comprendo perfectamente su solicitud. He notificado de inmediato al personal de recepción y secretaría de *' + labName + '* 🔔.\n\nUn operador humano se encuentra revisando este chat y le responderá directamente en breves momentos. Por favor permanezca en línea.',
        matchedExams: [],
        matchedKnowledgeDocs: [],
        totalUsd: 0,
        shouldEscalate: true,
        isOutOfHours: false,
        escalationStatus: 'ESCALADO_HUMANO',
        escalationReason: 'Solicitud explícita de atención humana en horario laboral'
      };
    }
  }

  // 2. Búsqueda en Catálogo de Exámenes
  const matchedExams: LabExam[] = [];
  for (const exam of catalog) {
    if (!exam.active) continue;
    const normName = normalizeText(exam.name);
    if (normUser.includes(normName)) {
      matchedExams.push(exam);
      continue;
    }
    for (const syn of exam.synonyms) {
      const normSyn = normalizeText(syn);
      if (normUser.includes(normSyn) && normSyn.length >= 3) {
        matchedExams.push(exam);
        break;
      }
    }
  }

  // 2.1. Detección de exámenes NO realizados (Anti-alucinación explícita)
  if (normUser.includes('espermograma') || normUser.includes('espermatograma') || normUser.includes('seminograma') || normUser.includes('espermiograma')) {
    return {
      replyText: 'Estimado paciente, le informamos que actualmente en *GONZALEZ-PRATO Laboratorio* **NO realizamos el examen de Espermograma / Seminograma**.\n\n*(Nota clínica: Disponemos de Espermocultivo para diagnóstico microbiológico de infecciones bacterianas, pero no de análisis morfológico o recuento espermático).*',
      matchedExams: [],
      matchedKnowledgeDocs: [],
      totalUsd: 0,
      shouldEscalate: false,
      isOutOfHours,
      escalationStatus: 'BOT_ACTIVO'
    };
  }

  // 2.1.1. Desambiguación de consultas genéricas de "CULTIVO"
  const isGenericCultivo = (normUser === 'cultivo' || normUser === 'cultivos' || normUser === 'precio de cultivo' || normUser === 'precio de los cultivos' || normUser === 'cuanto cuesta un cultivo' || (normUser.includes('cultivo') && !normUser.includes('orina') && !normUser.includes('urocultivo') && !normUser.includes('heces') && !normUser.includes('coprocultivo') && !normUser.includes('faringeo') && !normUser.includes('garganta') && !normUser.includes('esputo') && !normUser.includes('secrecion') && !normUser.includes('herida') && !normUser.includes('absceso') && !normUser.includes('sangre') && !normUser.includes('hemocultivo') && !normUser.includes('semen') && !normUser.includes('espermocultivo') && !normUser.includes('micologico') && !normUser.includes('una') && !normUser.includes('unas') && !normUser.includes('piel') && !normUser.includes('hongo')));

  if (isGenericCultivo) {
    let cultivoReply = '🧫 *TARIFARIO DE CULTIVOS Y MICROBIOLOGÍA EN GONZALEZ-PRATO LABORATORIO*\n\n';
    cultivoReply += 'Cada cultivo tiene un costo y preparación específica según el tipo de muestra:\n\n';
    cultivoReply += '• **Urocultivo con Antibiograma (Orina):** **$35.00 USD** (Primera orina matutina o retención 3-4h, frasco estéril, en hielo).\n';
    cultivoReply += '• **Coprocultivo (Heces):** **$42.00 USD** (Muestra fecal fresca sin antibióticos 48-72h).\n';
    cultivoReply += '• **Exudado Faríngeo con Antibiograma (Garganta):** **$35.00 USD** (En ayunas, sin cepillarse los dientes ni enjuagues).\n';
    cultivoReply += '• **Cultivo de Esputo (Expectoración profunda):** **$50.00 USD**.\n';
    cultivoReply += '• **Cultivo de Secreciones (Óticas, Oculares, Nasales):** **$45.00 USD**.\n';
    cultivoReply += '• **Cultivo de Heridas y Úlceras / Abscesos:** **$45.00 - $50.00 USD**.\n';
    cultivoReply += '• **Hemocultivo Automatizado (Sangre):** **$48.00 USD** por botella.\n';
    cultivoReply += '• **Espermocultivo (Prueba de 4 vasos):** **$45.00 USD**.\n';
    cultivoReply += '• **Cultivo Micológico (Uñas, Piel, Cuero cabelludo):** **$38.00 USD** (Con previa cita con micóloga).\n\n';
    cultivoReply += '📍 *Horario de Atención:* Lunes a Viernes de 7:00 AM a 3:00 PM | Sábados de 8:00 AM a 1:00 PM.\n\n';
    cultivoReply += '¿Cuál de estos cultivos requiere realizarse o qué muestra le indicó su médico?';

    return {
      replyText: cultivoReply,
      matchedExams: [],
      matchedKnowledgeDocs: knowledgeDocs.filter(d => d.category === 'MICROBIOLOGIA'),
      totalUsd: 0,
      shouldEscalate: false,
      isOutOfHours,
      escalationStatus: 'BOT_ACTIVO'
    };
  }

  // 2.2. Detección y diferenciación clínica de EHRLICHIA (Sede Mérida vs Convenio Caracas)
  if (normUser.includes('ehrlichia') || normUser.includes('erlichia')) {
    const isExplicitlyCaracas = normUser.includes('pcr') || normUser.includes('caracas') || normUser.includes('molecular') || normUser.includes('serologia');
    const isExplicitlyCapaBlanca = normUser.includes('capa blanca') || normUser.includes('frotis') || normUser.includes('sede') || normUser.includes('merida');

    if (!isExplicitlyCaracas && (isExplicitlyCapaBlanca || !normUser.includes('pcr'))) {
      const capaBlancaExam = catalog.find(e => normalizeText(e.name).includes('capa blanca')) || {
        id: 'capa-blanca-ehrlichia',
        name: 'Estudio de Ehrlichias (Capa Blanca / Frotis Sanguíneo)',
        category: 'HEMATOLOGIA',
        costUsd: 13.00,
        fastingHours: 'Sin ayuno estricto',
        sampleType: 'Sangre periférica / Capa leucocitaria (EDTA)',
        deliveryTime: 'Mismo día',
        notes: 'Idealmente tomar la muestra durante la fase febril aguda (pico febril) o con sintomatología activa.',
        synonyms: ['erlichia', 'erlichias', 'frotis capa blanca', 'ehrlichia'],
        active: true
      };

      let ehrlichiaReply = '🔬 *DIAGNÓSTICO DE EHRLICHIA EN GONZALEZ-PRATO LABORATORIO*\n\n';
      ehrlichiaReply += 'Para el diagnóstico de **Ehrlichia (Erlichia)** disponemos de las siguientes modalidades:\n\n';
      ehrlichiaReply += '1️⃣ *EN NUESTRA SEDE FÍSICA (MÉRIDA):*\n';
      ehrlichiaReply += '• **Estudio de Ehrlichias (Capa Blanca / Frotis Sanguíneo)**: **$13.00 USD**\n';
      ehrlichiaReply += '• *Muestra:* Sangre periférica / Capa leucocitaria.\n';
      ehrlichiaReply += '• *Requisitos:* Sin ayuno estricto. Se recomienda tomar la muestra idealmente durante el pico o fase febril aguda para mayor sensibilidad diagnóstica.\n\n';
      ehrlichiaReply += '2️⃣ *POR CONVENIO TORRE CARACAS (ESTUDIO MOLECULAR / SEROLOGÍA):*\n';
      ehrlichiaReply += '• **PCR Molecular de Ehrlichia / Serología de Ehrlichia**\n';
      ehrlichiaReply += '📢 *"Estos exámenes son remitidos a un laboratorio en Caracas, por lo tanto, Gonzalez Prato Laboratorio actúa como enlace para la recolección y envío de las muestras. En consecuencia, el resultado llega vía correo electrónico y se le remite al paciente usando esa misma modalidad."*\n\n';

      if (isOutOfHours) {
        ehrlichiaReply += '📍 *Horario de Atención en Sede:* Lunes a Viernes de 7:00 AM a 3:00 PM | Sábados de 8:00 AM a 1:00 PM.\nPróxima apertura: ' + scheduleStatus.nextOpening + '.\n\n¿Desea realizarse el frotis de Capa Blanca en Mérida o requiere coordinar el envío de PCR a Caracas?';
      } else {
        ehrlichiaReply += '📍 *Horario de Atención en Sede:* Lunes a Viernes de 7:00 AM a 3:00 PM | Sábados de 8:00 AM a 1:00 PM.\n\n¿Desea realizarse el frotis de Capa Blanca ($13 USD) en nuestra sede o requiere información de envío para el estudio molecular de Caracas?';
      }

      return {
        replyText: ehrlichiaReply,
        matchedExams: [capaBlancaExam as LabExam],
        matchedKnowledgeDocs: knowledgeDocs.filter(d => d.category === 'PREANALITICA' || d.category === 'CONVENIO_CARACAS'),
        totalUsd: 13.00,
        shouldEscalate: false,
        isOutOfHours,
        escalationStatus: 'BOT_ACTIVO'
      };
    }
  }

  // 3. Detección especial de CONVENIO TORRE CARACAS (Remisión a Caracas)
  const isCaracasRequest = matchedExams.some(e => e.isCaracasConvenio) ||
    ['caracas', 'torre caracas', 'convenio caracas', 'rast', 'alergias alimentos', 'panel rast', 'zonulina', 'borrelia', 'lyme', 'babesia', 'anaplasma', 'subclases igg', 'caseina', 'leche de bufala', 'leche de cabra', 'leche de oveja', 'homocisteina', 'iga saliva'].some(term => normUser.includes(term));

  if (isCaracasRequest) {
    const caracasDoc = knowledgeDocs.find(d => d.category === 'CONVENIO_CARACAS');
    const matchedDocs = caracasDoc ? [caracasDoc] : [];

    let caracasReply = '📌 *CONVENIO TORRE CARACAS — GONZALEZ-PRATO LABORATORIO*\n\n';
    caracasReply += 'Estimado paciente, con respecto a su solicitud de estudios especializados:\n\n';
    caracasReply += '📢 *"Estos exámenes son remitidos a un laboratorio en Caracas, por lo tanto, Gonzalez Prato Laboratorio actúa como enlace para la recolección y envío de las muestras. En consecuencia, el resultado llega vía correo electrónico y se le remite al paciente usando esa misma modalidad."*\n\n';

    if (matchedExams.length > 0) {
      caracasReply += '🔬 *Pruebas identificadas en convenio:*\n';
      matchedExams.forEach(e => {
        caracasReply += '• *' + e.name + '* (' + e.fastingHours + ')\n';
      });
      caracasReply += '\n';
    }

    if (isOutOfHours) {
      caracasReply += '⏰ He transferido su caso con prioridad alta a nuestra secretaría. Al reanudar operaciones (' + scheduleStatus.nextOpening + '), nuestro equipo se comunicará para brindarle cotización exacta y coordinar el envío de su muestra a Caracas.';
      return {
        replyText: caracasReply,
        matchedExams,
        matchedKnowledgeDocs: matchedDocs,
        totalUsd: 0,
        shouldEscalate: true,
        isOutOfHours: true,
        escalationStatus: 'ESCALADO_FUERA_HORARIO',
        escalationReason: 'Solicitud Convenio Torre Caracas fuera de horario (Derivado a secretaría)'
      };
    } else {
      caracasReply += '🔔 He notificado de inmediato a nuestra secretaría para cotizarle estos paneles especializados y coordinar la recepción de sus muestras. Un operador humano le atenderá en breves momentos en este mismo chat.';
      return {
        replyText: caracasReply,
        matchedExams,
        matchedKnowledgeDocs: matchedDocs,
        totalUsd: 0,
        shouldEscalate: true,
        isOutOfHours: false,
        escalationStatus: 'ESCALADO_HUMANO',
        escalationReason: 'Solicitud Convenio Torre Caracas (Remisión externa a secretaría)'
      };
    }
  }

  // 4. Triangulación con Base de Conocimiento (PDFs / RAG)
  const matchedKnowledge: KnowledgeDocument[] = [];
  for (const doc of knowledgeDocs) {
    const hasTopicMatch = doc.keyTopics.some(topic => normUser.includes(normalizeText(topic)));
    const hasSnippetMatch = normalizeText(doc.contentSnippet).includes(normUser) || (normUser.length > 4 && normalizeText(doc.title).includes(normUser));

    // Categorías específicas
    if (doc.category === 'SEGUROS' && (normUser.includes('pago') || normUser.includes('seguro') || normUser.includes('zelle') || normUser.includes('pago movil') || normUser.includes('efectivo') || normUser.includes('dolar') || normUser.includes('transferencia') || normUser.includes('binance') || normUser.includes('tarjeta'))) {
      matchedKnowledge.push(doc);
    } else if (doc.category === 'DOMICILIOS' && (normUser.includes('domicilio') || normUser.includes('casa') || normUser.includes('encamado') || normUser.includes('a domicilio'))) {
      matchedKnowledge.push(doc);
    } else if (doc.category === 'MICROBIOLOGIA' && (
      normUser.includes('urocultivo') || normUser.includes('cultivo') || normUser.includes('antibiograma') ||
      normUser.includes('coprocultivo') || normUser.includes('exudado') || normUser.includes('faringeo') ||
      normUser.includes('esputo') || normUser.includes('herida') || normUser.includes('ulcera') || normUser.includes('absceso') ||
      normUser.includes('hemocultivo') || normUser.includes('broncoalveolar') || normUser.includes('espermocultivo') || normUser.includes('4 vasos') ||
      normUser.includes('antibiotico')
    )) {
      matchedKnowledge.push(doc);
    } else if (doc.category === 'MICOLOGIA' && (
      normUser.includes('micologico') || normUser.includes('hongo') || normUser.includes('hongos') ||
      normUser.includes('onicomicosis') || normUser.includes('una') || normUser.includes('unas') ||
      normUser.includes('cuero cabelludo') || normUser.includes('tinea') || normUser.includes('tina') ||
      normUser.includes('pitiriasis') || normUser.includes('escama') || normUser.includes('antimicotico') ||
      normUser.includes('esmalte') || normUser.includes('pie de atleta')
    )) {
      matchedKnowledge.push(doc);
    } else if (doc.category === 'URO_COPRO' && (
      normUser.includes('orina') || normUser.includes('24 horas') || normUser.includes('depuracion') ||
      normUser.includes('microalbuminuria') || normUser.includes('proteinuria') || normUser.includes('relaciones urinarias') ||
      normUser.includes('heces') || normUser.includes('coproanalisis') || normUser.includes('parasito') || normUser.includes('leucograma') ||
      normUser.includes('sudan') || normUser.includes('graham') || normUser.includes('calprotectina') ||
      normUser.includes('esteatocrito') || normUser.includes('sangre oculta') || normUser.includes('disbiosis') ||
      normUser.includes('probiotico') || normUser.includes('yogurt')
    )) {
      matchedKnowledge.push(doc);
    } else if (doc.category === 'QUIMICA_HORMONAS' && (
      normUser.includes('ayuno') || normUser.includes('glicemia') || normUser.includes('glucosa') || normUser.includes('postprandial') ||
      normUser.includes('colesterol') || normUser.includes('trigliceridos') || normUser.includes('lipidico') || normUser.includes('lipidograma') ||
      normUser.includes('acido urico') || normUser.includes('urea') || normUser.includes('creatinina') ||
      normUser.includes('transaminasas') || normUser.includes('tgo') || normUser.includes('tgp') || normUser.includes('ggt') ||
      normUser.includes('bilirrubina') || normUser.includes('perfil 20') || normUser.includes('ferritina') || normUser.includes('hierro') ||
      normUser.includes('vitamina b12') || normUser.includes('vitamina d') || normUser.includes('acido folico') ||
      normUser.includes('tiroides') || normUser.includes('tsh') || normUser.includes('t4') || normUser.includes('t3') || normUser.includes('biotina') || normUser.includes('levotiroxina') ||
      normUser.includes('cortisol') || normUser.includes('prolactina') || normUser.includes('lh') || normUser.includes('fsh') ||
      normUser.includes('estradiol') || normUser.includes('progesterona') || normUser.includes('testosterona') || normUser.includes('insulina') ||
      normUser.includes('psa') || normUser.includes('ca-125') || normUser.includes('ca125') || normUser.includes('ca 15-3') || normUser.includes('ca 19-9') || normUser.includes('cea') || normUser.includes('afp')
    )) {
      matchedKnowledge.push(doc);
    } else if (hasTopicMatch || hasSnippetMatch) {
      matchedKnowledge.push(doc);
    }
  }

  // 5. Saludos
  const isGreeting = ['hola', 'buenos dias', 'buenas tardes', 'buenas noches', 'saludos', 'que tal'].some(g => normUser.includes(g));
  if (matchedExams.length === 0 && matchedKnowledge.length === 0 && isGreeting) {
    let greetingReply = systemConfig?.welcomeMessage;
    
    if (!greetingReply) {
      const labName = systemConfig?.laboratoryName || 'GONZALEZ-PRATO Laboratorio';
      const director = systemConfig?.directorName || 'Luisa Carolina González Ramírez';
      greetingReply = '¡Hola! Bienvenido a *' + labName + '* 🧪 (Dirección Técnica: ' + director + ').\n\nSoy su Asistente Clínico Virtual disponible 24/7 para brindarle:\n• 💰 Cotizaciones instantáneas de más de 80 exámenes en USD ($).\n• ⏱️ Requisitos de ayuno y preparación de muestras.\n• 🔬 Protocolos de Microbiología, Coproanálisis, Uroanálisis y Estudios Micológicos.\n• 🏛️ Información del Convenio Torre Caracas (pruebas especiales remitidas a Caracas).\n• 📋 Formas de pago (Divisas en efectivo, Zelle, Pago Móvil, Binance Pay y Tarjetas).\n\n';
      if (isOutOfHours) {
        greetingReply += '*(Nota: Nuestra sede física se encuentra en receso fuera de horario, pero puedo cotizarle y orientarle de inmediato).*\\n\\n¿Qué prueba médica desea consultar hoy?';
      } else {
        greetingReply += '¿Qué prueba médica o perfil desea consultar hoy?\n*(En cualquier momento puede escribir "secretaria" para hablar con nuestro equipo).*';
      }
    }

    return {
      replyText: greetingReply,
      matchedExams: [],
      matchedKnowledgeDocs: [],
      totalUsd: 0,
      shouldEscalate: false,
      isOutOfHours,
      escalationStatus: 'BOT_ACTIVO'
    };
  }

  // Sin coincidencia
  if (matchedExams.length === 0 && matchedKnowledge.length === 0) {
    return {
      replyText: 'Disculpe, no logré identificar con exactitud el examen o procedimiento en su mensaje.\n\nEn *GONZALEZ-PRATO Laboratorio* disponemos de áreas de Hematología, Química Sanguínea, Hormonas, Microbiología Automatizada, Uroanálisis, Coproanálisis, Estudios Micológicos, Marcadores Tumorales y Convenio Torre Caracas para pruebas especiales.\n\nPor favor indíqueme el nombre exacto de la prueba médica o envíenos una foto de su orden médica.\n' + (isOutOfHours ? '*(Nuestra sede abrirá el ' + scheduleStatus.nextOpening + ' para atención humana y toma de muestras).*' : '*(O si lo prefiere, escriba "secretaria" para hablar con un asesor).*'),
      matchedExams: [],
      matchedKnowledgeDocs: [],
      totalUsd: 0,
      shouldEscalate: false,
      isOutOfHours,
      escalationStatus: 'BOT_ACTIVO'
    };
  }

  // Calcular totales (excluyendo exámenes de convenio con precio 0 que cotiza secretaría)
  const totalUsd = matchedExams.reduce((acc, curr) => acc + curr.priceUsd, 0);

  let reply = 'Con gusto le presento la información oficial de *GONZALEZ-PRATO Laboratorio* 🧪:\n\n';
  if (matchedExams.length > 0) {
    reply += '📋 *COTIZACIÓN OFICIAL Y PREPARACIÓN:*\n';
    matchedExams.forEach((exam, idx) => {
      reply += '*' + (idx + 1) + '. ' + exam.name + '*\n';
      if (exam.priceUsd > 0) {
        reply += '   💵 *Precio:* $' + exam.priceUsd.toFixed(2) + ' USD\n';
      } else {
        reply += '   💵 *Precio:* Cotización por Secretaría (Convenio Caracas)\n';
      }
      reply += '   🩸 *Tipo de muestra:* ' + exam.sampleType + '\n';
      reply += '   ⌛ *Ayuno / Preparación:* ' + exam.fastingHours + '\n';
      if (exam.notes) {
        reply += '   ⚠️ *Condiciones Preanalíticas:* ' + exam.notes + '\n';
      }
      reply += '\n';
    });
    if (totalUsd > 0) {
      reply += '──────────────────────────\n';
      reply += '💰 *TOTAL A CANCELAR:* **$' + totalUsd.toFixed(2) + ' USD**\n\n';
    }
  }

  if (matchedKnowledge.length > 0) {
    reply += 'ℹ️ *PROTOCOLO CLÍNICO & GUÍA PREANALÍTICA OFICIAL:*\n';
    const uniqueDocs = Array.from(new Set(matchedKnowledge.map(d => d.id))).map(id => matchedKnowledge.find(d => d.id === id)!);
    uniqueDocs.slice(0, 2).forEach(doc => {
      reply += '• *' + doc.title + ':*\n' + doc.contentSnippet + '\n\n';
    });
  }

  const hasMycology = matchedExams.some(e => 
    e.name.toLowerCase().includes('koh') || 
    e.name.toLowerCase().includes('micol') || 
    e.name.toLowerCase().includes('demodex')
  );

  if (hasMycology) {
    reply += '\n⚠️ *IMPORTANTE — ESTUDIOS MICOLÓGICOS:* La toma de muestra para este examen se realiza **ESTRICTAMENTE CON PREVIA CITA**, ya que la especialista micóloga asiste en horarios pautados determinados.\n\n🔔 *He notificado a nuestra secretaría para que le asigne y coordine su cita directamente por este chat.*';
    return {
      replyText: reply,
      matchedExams,
      matchedKnowledgeDocs: matchedKnowledge,
      totalUsd,
      shouldEscalate: true,
      isOutOfHours,
      escalationStatus: isOutOfHours ? 'ESCALADO_FUERA_HORARIO' : 'ESCALADO_HUMANO',
      escalationReason: 'Estudio micológico (Requiere cita previa con micóloga)'
    };
  }

  if (isOutOfHours) {
    reply += '📍 *Próxima Apertura de Sede:* ' + scheduleStatus.nextOpening + '.\n';
    reply += 'Le esperamos en nuestra sede. Si desea dejar una orden agendada, puede indicarlo por aquí.';
  } else {
    reply += '📍 *Horario de Atención:* Lunes a Viernes de 7:00 AM a 3:00 PM | Sábados de 8:00 AM a 1:00 PM.\n';
    reply += '¿Desea agendar su turno o requiere alguna orientación adicional?';
  }

  return {
    replyText: reply,
    matchedExams,
    matchedKnowledgeDocs: matchedKnowledge,
    totalUsd,
    shouldEscalate: false,
    isOutOfHours,
    escalationStatus: 'BOT_ACTIVO'
  };
}