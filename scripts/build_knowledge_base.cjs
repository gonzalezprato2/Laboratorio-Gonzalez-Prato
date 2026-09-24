const fs = require('fs');
const path = require('path');
const XLSX = require('xlsx');

// 1. Read Excel
const excelPath = path.join(__dirname, '../docs/Lista de precios IA 20-09-2026.xlsx');
const workbook = XLSX.readFile(excelPath);
const sheet = workbook.Sheets[workbook.SheetNames[0]];
const rawRows = XLSX.utils.sheet_to_json(sheet, { header: 1 });

let currentCategory = 'HEMATOLOGÍA';
const rawItems = [];

rawRows.forEach((row, idx) => {
  if (!row || row.length === 0) return;
  const col0 = row[0] ? String(row[0]).trim() : '';
  const col1 = row[1] !== undefined && row[1] !== null ? String(row[1]).trim() : '';
  
  if (!col0 || col0.toLowerCase() === 'lista de precios') return;

  if (col1.toUpperCase().includes('COSTO') || (col1.toUpperCase().includes('$') && isNaN(Number(col1)))) {
    currentCategory = col0.toUpperCase();
    return;
  }
  
  const price = Number(col1);
  if (!isNaN(price) && col1 !== '') {
    rawItems.push({
      category: currentCategory,
      rawName: col0,
      priceUsd: price
    });
  }
});

console.log(`Loaded ${rawItems.length} raw items from Excel.`);

// Normalize category names
function normalizeCategory(cat) {
  cat = cat.toUpperCase();
  if (cat.includes('HEMATOLOG')) return 'HEMATOLOGÍA';
  if (cat.includes('QUÍMICA') || cat.includes('QUIMICA')) return 'QUÍMICA SANGUÍNEA';
  if (cat.includes('HORMONA')) return 'HORMONAS';
  if (cat.includes('INMUNOGLOBULINA')) return 'INMUNOGLOBULINAS';
  if (cat.includes('INMUNOLOG')) return 'INMUNOLOGÍA';
  if (cat.includes('FERROCIN')) return 'PERFIL FERROCINÉTICA';
  if (cat.includes('MICROBIOLOG')) return 'MICROBIOLOGÍA AUTOMATIZADA';
  if (cat.includes('ORINA')) return 'UROANÁLISIS Y ORINA';
  if (cat.includes('HECES')) return 'COPROANÁLISIS Y HECES';
  if (cat.includes('MARCADOR')) return 'MARCADORES TUMORALES';
  if (cat.includes('ESPECIAL')) return 'PRUEBAS ESPECIALES';
  if (cat.includes('CITOQUÍMICO') || cat.includes('CITOQUIMICO') || cat.includes('PÉRFILES') || cat.includes('PERFILES')) return 'CITOQUÍMICOS Y PERFILES';
  if (cat.includes('OTROS')) return 'OTROS ESTUDIOS';
  return cat;
}

// Generate synonyms from raw name
function extractSynonyms(rawName) {
  const syns = new Set();
  const lower = rawName.toLowerCase();
  
  // Split by ' o ', ';', '/', ','
  const parts = rawName.split(/;|\bo\b|\/|,/i).map(p => p.trim()).filter(p => p.length > 1);
  parts.forEach(p => {
    // remove parentheses content and add both
    const cleanP = p.replace(/\(.*?\)/g, '').trim();
    if (cleanP.length > 1) syns.add(cleanP.toLowerCase());
    
    // extract inside parentheses
    const matches = p.match(/\((.*?)\)/g);
    if (matches) {
      matches.forEach(m => {
        const inner = m.replace(/[()]/g, '').trim().toLowerCase();
        if (inner.length > 1) syns.add(inner);
      });
    }
  });

  // Specific common aliases
  if (lower.includes('hematologia') || lower.includes('hematología')) {
    syns.add('hematologia');
    syns.add('hemograma');
    syns.add('biometria hematica');
    syns.add('cbp');
    syns.add('cuadro hematico');
  }
  if (lower.includes('glicemia en ayunas') || lower.includes('glucosa en ayunas') || lower.includes('glicemia basal')) {
    syns.add('azucar');
    syns.add('azucar en sangre');
    syns.add('glicemia');
    syns.add('glucosa');
    syns.add('glicemia en ayunas');
    syns.add('glucosa en ayunas');
    syns.add('glicemia basal');
  }
  if (lower.includes('lipidograma') || lower.includes('perfil lipidico') || lower.includes('perfil lipídico')) {
    syns.add('perfil lipidico');
    syns.add('colesterol y trigliceridos');
    syns.add('grasas en sangre');
  }
  if (lower.includes('tsh')) {
    syns.add('tsh normal');
    syns.add('tiroides');
    syns.add('hormona tiroidea');
    syns.add('hormona tiroestimulante');
    syns.add('tirotropina');
  }
  if (lower.includes('urocultivo')) {
    syns.add('cultivo de orina');
    syns.add('cultivo con antibiograma de orina');
  }
  if (lower.includes('coprocultivo')) {
    syns.add('cultivo de heces');
  }
  if (lower.includes('vdrl')) {
    syns.add('vdrl');
    syns.add('sifilis');
    syns.add('serologia luetica');
    syns.add('serologia para sifilis');
  }
  if (lower.includes('vih') || lower.includes('hiv') || lower.includes('vhi')) {
    syns.add('vih');
    syns.add('hiv');
    syns.add('sida');
    syns.add('prueba de vih');
    syns.add('prueba de hiv');
  }
  if (lower.includes('beta') && lower.includes('hcg')) {
    syns.add('prueba de embarazo en sangre');
    syns.add('embarazo cuantitativa');
    syns.add('subunidad beta');
  }
  if (lower.includes('orina') && (lower.includes('general') || lower.includes('simple') || lower.includes('uroanalisis') || lower.includes('uroanálisis'))) {
    syns.add('examen de orina');
    syns.add('orina simple');
    syns.add('parcial de orina');
  }
  if (lower.includes('heces') && (lower.includes('simple') || lower.includes('coproanalisis') || lower.includes('coproanálisis'))) {
    syns.add('examen de heces');
    syns.add('heces simple');
    syns.add('parasitologico');
  }
  if (lower.includes('perfil 20')) {
    syns.add('perfil 20');
    syns.add('chequeo general');
    syns.add('perfil de rutina');
  }
  if (lower.includes('demodex')) {
    syns.add('acaros demodex');
    syns.add('demodex en pestanas');
    syns.add('demodex facial');
  }
  if (lower.includes('micol') || lower.includes('hongo')) {
    syns.add('estudio de hongos');
    syns.add('cultivo de hongos');
  }
  if (lower.includes('esputo')) {
    syns.add('cultivo de esputo');
    syns.add('bk');
    syns.add('ziehl neelsen');
  }

  // Remove any prohibited terms from synonyms
  syns.delete('tsh ultrasensible');

  return Array.from(syns);
}

// Determine preanalytical rules based on exam characteristics and manual
function determinePreanalytics(cat, rawName) {
  const normCat = normalizeCategory(cat);
  const lower = rawName.toLowerCase();
  
  let fastingHours = '8 - 12 horas';
  let sampleType = 'Muestra de sangre';
  let turnaround = 'Mismo día (tarde)';
  let isCaracasConvenio = false;
  let notes = 'Atención general por orden de llegada a partir de las 7:00 AM (Lun-Vie) o 8:00 AM (Sáb).';

  // CARACAS CONVENIO
  if (
    lower.includes('lyme') || lower.includes('borrelia') || lower.includes('babesia') ||
    lower.includes('rickettsia') || lower.includes('anaplasma') || lower.includes('pcr ehrlichia') ||
    lower.includes('zonulina') || lower.includes('subclases') || lower.includes('salival') ||
    lower.includes('rast') || lower.includes('alergen') || lower.includes('alérgen') ||
    lower.includes('gliadina') || lower.includes('transglutaminasa') || lower.includes('valproico') ||
    lower.includes('homocisteina') || lower.includes('homocisteína') || lower.includes('panel 10') ||
    lower.includes('anti-dna') || lower.includes('anti-ccp')
  ) {
    if (lower.includes('lyme') || lower.includes('borrelia') || lower.includes('babesia') || lower.includes('rickettsia') || lower.includes('anaplasma') || lower.includes('zonulina') || lower.includes('salival') || lower.includes('subclases') || lower.includes('rast') || lower.includes('panel 10')) {
      isCaracasConvenio = true;
      turnaround = 'Remitido a Caracas (3 a 8 días hábiles)';
      notes = 'Prueba procesada bajo Convenio Torre Caracas. El laboratorio actúa como enlace de toma y remisión.';
    }
  }

  // HEMATOLOGÍA
  if (normCat === 'HEMATOLOGÍA') {
    sampleType = 'Muestra de sangre';
    if (lower.includes('completa') || lower.includes('hemograma')) {
      fastingHours = '4 - 8 horas';
      notes = 'Evitar ejercicio intenso y alcohol 24h antes. Notificar fármacos activos.';
    } else if (lower.includes('plaqueta') || lower.includes('vsg') || lower.includes('frotis') || lower.includes('gota gruesa') || lower.includes('ehrlichia')) {
      fastingHours = 'No requiere ayuno';
      notes = 'Se procesa en cualquier momento. Para gota gruesa o ehrlichia, ideal durante pico febril.';
    } else if (lower.includes('tiempo') || lower.includes('tp') || lower.includes('tpt') || lower.includes('inr') || lower.includes('fibrinogeno')) {
      fastingHours = '3 - 4 horas';
      notes = 'Notificar si toma anticoagulantes (Warfarina, Heparina, Rivaroxabán) o aspirina.';
    } else if (lower.includes('grupo') || lower.includes('factor rh')) {
      fastingHours = 'No requiere ayuno estricto';
      notes = 'Indicar transfusiones previas en los últimos 3 meses o RhoGAM en embarazadas.';
    } else if (lower.includes('moco nasal') || lower.includes('eosinofilo')) {
      fastingHours = 'No requiere ayuno';
      sampleType = 'Secreción nasal en lámina';
      notes = 'Sin lavados nasales ni medicamentos tópicos 4 horas antes.';
    }
  }

  // QUÍMICA SANGUÍNEA
  else if (normCat === 'QUÍMICA SANGUÍNEA') {
    sampleType = 'Muestra de sangre';
    if (lower.includes('glicemia en ayunas') || lower.includes('basal') || lower.includes('glucosa')) {
      fastingHours = '8 - 12 horas';
      notes = 'Ayuno estricto. Prohibido café, chicles o caramelos. Consultar toma de hipoglucemiantes.';
    } else if (lower.includes('postprandial') || lower.includes('pp')) {
      fastingHours = 'Protocolo especial (2h post-desayuno)';
      notes = 'Toma basal en ayunas -> Desayuno habitual -> Contar 2h exactas en reposo -> Segunda extracción.';
    } else if (lower.includes('postcarga') || lower.includes('post-carga') || lower.includes('carga glucosada') || lower.includes('curva')) {
      fastingHours = 'Protocolo especial (8h ayuno + carga glucosada)';
      notes = 'Toma basal + ingesta de solución glucosada en sede. Reposo estricto en sala de espera.';
    } else if (lower.includes('lipidograma') || lower.includes('lipidico') || lower.includes('colesterol') || lower.includes('triglic')) {
      fastingHours = '10 - 12 horas';
      notes = 'Cenar ligero sin grasas antes de las 8:00 PM. Sin alcohol 48h antes.';
    } else if (lower.includes('acido urico') || lower.includes('ácido úrico')) {
      fastingHours = '8 - 12 horas';
      notes = 'Evitar carnes rojas excesivas, mariscos y cerveza 48h antes.';
    } else if (lower.includes('urea') || lower.includes('creatinina') || lower.includes('bun')) {
      fastingHours = '8 - 12 horas';
      notes = 'Evitar suplementos de creatina y ejercicio extenuante 24h previas.';
    } else if (lower.includes('tgo') || lower.includes('tgp') || lower.includes('transaminas') || lower.includes('ggt')) {
      fastingHours = '8 - 12 horas';
      notes = 'Evitar ejercicio físico intenso y alcohol 48h previas.';
    } else if (lower.includes('hba1c') || lower.includes('hemoglobina glicada')) {
      fastingHours = 'No requiere ayuno';
      notes = 'No requiere ayuno. Notificar transfusiones recientes o anemias hemolíticas.';
    } else if (lower.includes('gases arterial')) {
      fastingHours = 'No requiere ayuno';
      sampleType = 'Muestra de sangre arterial';
      notes = 'Punción arterial estricta. Transporte inmediato en baño de hielo (<30 min).';
    } else if (lower.includes('gases venos')) {
      fastingHours = lower.includes('postprandial') ? '1 hora post-desayuno' : 'No requiere ayuno';
      sampleType = 'Muestra de sangre venosa';
      notes = lower.includes('postprandial') ? 'Extracción exacta a 1 hora de finalizar el desayuno.' : 'Recolección según orden médica.';
    }
  }

  // HORMONAS
  else if (normCat === 'HORMONAS') {
    sampleType = 'Muestra de sangre';
    fastingHours = '8 - 12 horas';
    if (lower.includes('tsh') || lower.includes('t3') || lower.includes('t4')) {
      notes = 'Toma matutina (7:00-9:00 AM). Tomar levotiroxina DESPUÉS de la extracción. Suspender biotina 48-72h antes.';
    } else if (lower.includes('prolactina')) {
      notes = 'Toma antes de las 9:00 AM. Reposo obligatorio de 20-30 min en sala antes de punción. 48h sin relaciones sexuales ni estimulación mamaria.';
    } else if (lower.includes('fsh') || lower.includes('lh') || lower.includes('estradiol')) {
      notes = 'Mujeres: Días 2 a 5 del ciclo menstrual para evaluación basal, o según indicación médica. Indicar FUM.';
    } else if (lower.includes('progesterona')) {
      notes = 'Mujeres: Día 21 del ciclo (o 7 días antes de la regla esperada), o según indicación médica.';
    } else if (lower.includes('testosterona')) {
      notes = 'Extracción matutina ideal. Notificar terapias hormonales.';
    } else if (lower.includes('cortisol')) {
      notes = lower.includes('pm') 
        ? 'Cortisol PM: Llegar a las 3:30 PM para 20 min de reposo previo (ayuno ligero 2-4h).'
        : 'Cortisol AM: Llegar entre 7:30 y 7:40 AM para 20-30 min de reposo previo absoluto en sala.';
    } else if (lower.includes('insulina')) {
      if (lower.includes('postprandial') || lower.includes('pp')) {
        fastingHours = 'Protocolo especial (2h post-desayuno)';
        notes = 'Insulina PP: Desayuno habitual y extracción a las 2 horas exactas con reposo.';
      } else {
        fastingHours = '8 - 12 horas';
        notes = 'Insulina Basal: Ayuno estricto de 8 a 12 horas. Sin ejercicio el día previo.';
      }
    } else if (lower.includes('anti-tpo') || lower.includes('anti-tg')) {
      notes = 'Suspender suplementos con Biotina (Vit B7/B8) 48 a 72 horas antes.';
    }
  }

  // INMUNOLOGÍA & SEROLOGÍA
  else if (normCat === 'INMUNOLOGÍA' || normCat === 'INMUNOGLOBULINAS') {
    sampleType = 'Muestra de sangre';
    fastingHours = '4 - 8 horas';
    if (lower.includes('vdrl')) {
      notes = 'Ayuno de 4 a 8 horas. Evitar grasas y alcohol 24h antes. Notificar antibióticos o embarazo.';
    } else if (lower.includes('treponema')) {
      notes = 'Prueba treponémica específica. Notificar si tuvo sífilis tratada en el pasado (cicatriz serológica).';
    } else if (lower.includes('dengue')) {
      notes = 'Indicar días de fiebre: Días 1-5 se indica Antígeno NS1; Día 6 en adelante Anticuerpos IgM/IgG.';
    } else if (lower.includes('pcr') || lower.includes('proteina c reactiva')) {
      notes = 'Notificar si cursa con infecciones agudas, inflamación o traumatismos recientes.';
    } else if (lower.includes('panel respiratorio') || lower.includes('influenza') || lower.includes('vsr')) {
      fastingHours = 'No requiere ayuno';
      sampleType = 'Hisopado nasofaríngeo';
      notes = 'Sin lavados nasales ni sprays 4 horas antes. Realizar en primeros 3-5 días de síntomas.';
    }
  }

  // MICROBIOLOGÍA
  else if (normCat === 'MICROBIOLOGÍA AUTOMATIZADA') {
    turnaround = '3 a 8 días hábiles';
    fastingHours = 'No requiere ayuno';
    if (lower.includes('urocultivo')) {
      sampleType = 'Orina matutina (chorro medio en frasco estéril)';
      notes = 'Higiene genital con agua y jabón neutro. Descartar primer chorro. 48-72h sin antibióticos. Traslado con hielo.';
    } else if (lower.includes('coprocultivo')) {
      sampleType = 'Muestra de heces fresca en frasco estéril';
      notes = 'Muestra con moco/sangre si hay diarrea. Sin antibióticos ni antidiarreicos. Traslado inmediato.';
    } else if (lower.includes('exudado faringeo') || lower.includes('faringeo') || lower.includes('faríngeo')) {
      fastingHours = 'Ayuno matutino estricto';
      sampleType = 'Hisopado faríngeo en sede';
      notes = 'En ayunas, sin cepillarse los dientes, sin enjuagues ni caramelos antisépticos. Toma directa en sede.';
    } else if (lower.includes('esputo') || lower.includes('bronquial') || lower.includes('lavado bronqueoalveolar') || lower.includes('lba')) {
      sampleType = 'Expectoración matutina profunda / Aspirado bronquial';
      notes = 'Cultivo microbiológico de esputo (incluye coloración de Ziehl-Neelsen / BK sin cargo adicional). Enjuague bucal solo con agua simple. Tos profunda matutina en recolector estéril (no saliva).';
    } else if (lower.includes('vaginal')) {
      sampleType = 'Secreción vaginal';
      notes = '48-72h sin relaciones sexuales, óvulos, cremas ni duchas. No estar menstruando (acudir 2-3 días después).';
    } else if (lower.includes('uretral')) {
      sampleType = 'Secreción uretral';
      notes = 'Retención urinaria matutina de 4 a 6 horas (no orinar antes). Sin aseo genital inmediato.';
    } else if (lower.includes('herida') || lower.includes('ulcera') || lower.includes('úlceras')) {
      sampleType = 'Hisopado de secreción de herida en medio de transporte';
      notes = 'Sin cremas tópicas ni ungüentos 24h antes. Limpieza con solución fisiológica previa.';
    } else if (lower.includes('ocular')) {
      sampleType = 'Secreción conjuntival / ocular';
      notes = 'Sin colirios ni pomadas 12-24h antes. Retirar lentes de contacto 12h antes. Sin maquillaje.';
    } else if (lower.includes('otica') || lower.includes('ótica') || lower.includes('oído')) {
      sampleType = 'Secreción del conducto auditivo';
      notes = 'Sin gotas óticas 48 horas previas.';
    } else if (lower.includes('hemocultivo')) {
      sampleType = 'Muestra de sangre (frascos de hemocultivo)';
      notes = 'Adquirir frascos en el laboratorio. Punción periférica ideal al inicio de pico febril.';
    } else if (lower.includes('espermocultivo') || lower.includes('meares')) {
      sampleType = 'Kit de recolección de 4 frascos estériles (Meares y Stamey)';
      notes = '7-14 días sin antibióticos. Abstinencia sexual 2-3 días. Retención de orina 4h. Se recolectan 4 frascos.';
    } else if (lower.includes('demodex')) {
      turnaround = 'Mismo día o 24-48h';
      sampleType = 'Muestra de pestañas / folículos sebáceos';
      notes = '⚠️ PREVIA CITA OBLIGATORIA con la micóloga. La mañana del examen NO lavarse el rostro. Acudir sin maquillaje ni cremas durante 24h.';
    } else if (lower.includes('koh') || lower.includes('micol') || lower.includes('hongo')) {
      turnaround = '5 a 8 días hábiles';
      sampleType = 'Raspado de uñas / Escamas de piel / Muestra de cabellos';
      notes = '⚠️ PREVIA CITA OBLIGATORIA con la micóloga. 7 a 15 días sin antimicóticos tópicos ni orales. Sin cosméticos ni cremas 3 días antes.';
    } else if (lower.includes('gram')) {
      sampleType = 'Muestra biológica extendida en lámina';
      turnaround = 'Mismo día';
      notes = 'Coloración microscópica directa.';
    } else if (lower.includes('zielh') || lower.includes('zn') || lower.includes('bk')) {
      sampleType = 'Muestra biológica extendida en lámina';
      turnaround = 'Mismo día';
      notes = 'Coloración de Ziehl-Neelsen / BK aislada ($6 USD). Nota: Si se solicita el Cultivo de Esputo ($50 USD), este ya incluye la coloración sin costo adicional.';
    } else if (lower.includes('lcr') || lower.includes('cefalorraquideo') || lower.includes('cerebroespinal')) {
      sampleType = 'Líquido cefalorraquídeo (LCR) obtenido por punción médica';
      notes = 'Punción lumbar efectuada exclusivamente por médico especialista.';
    } else if (lower.includes('pleural')) {
      sampleType = 'Líquido pleural obtenido por punción médica';
      notes = 'Toracocentesis efectuada exclusivamente por médico especialista.';
    } else if (lower.includes('sinovial') || lower.includes('articular')) {
      sampleType = 'Líquido sinovial articular obtenido por punción médica';
      notes = 'Artrocentesis efectuada exclusivamente por médico especialista.';
    } else if (lower.includes('pericardico') || lower.includes('pericárdico')) {
      sampleType = 'Líquido pericárdico obtenido por punción médica';
      notes = 'Pericardiocentesis efectuada exclusivamente por médico especialista.';
    } else if (lower.includes('peritoneal') || lower.includes('ascitico') || lower.includes('ascítico')) {
      sampleType = 'Líquido peritoneal/ascítico obtenido por punción médica';
      notes = 'Paracentesis efectuada exclusivamente por médico especialista.';
    } else if (lower.includes('disbiosis')) {
      sampleType = 'Muestra de heces fresca en frasco estéril';
      notes = '15 días continuos sin antibióticos, antimicóticos, probióticos ni consumo de yogurt.';
    } else if (lower.includes('antifungigrama')) {
      sampleType = 'Aislamiento fúngico puro en cultivo';
      turnaround = '5 a 8 días hábiles';
      notes = 'Evaluación de susceptibilidad antifúngica a partir de aislamiento previo.';
    }
  }

  // ORINA
  else if (normCat === 'UROANÁLISIS Y ORINA') {
    if (lower.includes('24 horas') || lower.includes('24h') || lower.includes('depuracion') || lower.includes('depuración') || lower.includes('proteinuria 24')) {
      fastingHours = 'Ayuno para la muestra de sangre venosa';
      sampleType = 'Orina completa de 24 horas + Muestra de sangre';
      notes = 'Día 1 descartar orina 6:00 AM. Recoger todas las micciones hasta Día 2 6:00 AM refrigerado en botellón limpio. Acudir en ayunas para la toma de sangre.';
    } else if (lower.includes('segunda orina') || lower.includes('relacion') || lower.includes('relación')) {
      fastingHours = 'No requiere ayuno de alimentos';
      sampleType = 'Muestra de orina (segunda orina de la mañana)';
      notes = 'Descartar la primera orina al levantarse y recolectar la segunda orina de la mañana.';
    } else {
      fastingHours = 'No requiere ayuno';
      sampleType = 'Muestra de orina (primera orina de la mañana, chorro medio)';
      notes = 'Aseo genital neutro previo. Envase estéril de farmacia. Entregar en máx 1 hora o refrigerar.';
    }
  }

  // HECES
  else if (normCat === 'COPROANÁLISIS Y HECES') {
    sampleType = 'Muestra de heces fresca en recolector estéril';
    fastingHours = 'No requiere ayuno';
    if (lower.includes('sangre oculta')) {
      notes = 'Método inmunoquímico (no requiere restricción de carnes). Evitar alcohol, aspirina o sangrado hemorroidal.';
    } else if (lower.includes('helicobacter') || lower.includes('coproantigeno')) {
      sampleType = 'Muestra de heces fresca en recolector estéril';
      notes = 'Muestra fecal fresca (<3 horas). Notificar si toma antibióticos, bismuto, antiácidos o inhibidores de bomba de protones (Omeprazol, Pantoprazol, etc.).';
    } else if (lower.includes('graham')) {
      sampleType = 'Kit de láminas con cinta adhesiva transparente';
      notes = 'Retirar kit en sede. Toma matutina al despertar antes de levantarse y sin aseo perianal previo.';
    } else if (lower.includes('disbiosis')) {
      notes = '15 días continuos sin antibióticos, probióticos, antimicóticos ni consumo de yogurt. Llenar 3/4 partes del envase.';
    } else if (lower.includes('concentrado seriado') || lower.includes('seriado')) {
      notes = 'Retirar kit de recolección con conservante en el laboratorio para las 3 muestras.';
    } else {
      notes = 'Recolectar porción del tamaño de una nuez. Entregar en menos de 2 horas. Horario de recepción: Lun-Vie hasta 2:30 PM | Sáb hasta 12:30 PM.';
    }
  }

  // MARCADORES TUMORALES
  else if (normCat === 'MARCADORES TUMORALES') {
    sampleType = 'Muestra de sangre';
    fastingHours = '4 - 8 horas';
    if (lower.includes('psa')) {
      notes = '48h de abstinencia sexual (sin eyaculación). Sin bicicleta/moto 48h antes. 48-72h tras tacto rectal; 4-6 semanas tras biopsia.';
    } else if (lower.includes('beta') && lower.includes('hcg')) {
      notes = 'Muestra de sangre. Ayuno ligero de 4h. Indicar fecha de última menstruación (FUM).';
    } else if (lower.includes('ca 125')) {
      notes = 'Evitar toma durante menstruación (acudir al menos 5 días después de culminar el sangrado).';
    } else if (lower.includes('cea')) {
      notes = 'Indicar obligatoriamente si el paciente es fumador activo.';
    }
  }

  // CITOQUÍMICOS Y PERFILES
  else if (normCat === 'CITOQUÍMICOS Y PERFILES') {
    if (lower.includes('liquido') || lower.includes('líquido') || lower.includes('lcr') || lower.includes('pleural') || lower.includes('ascitico') || lower.includes('sinovial')) {
      sampleType = 'Líquido biológico obtenido por punción médica + Muestra de sangre';
      fastingHours = 'No requiere ayuno para el líquido';
      notes = 'Punción invasiva efectuada exclusivamente por médico especialista. Se requiere muestra de sangre simultánea.';
    } else if (lower.includes('perfil 20')) {
      fastingHours = '10 - 12 horas';
      sampleType = 'Muestra de sangre + Muestra de orina y Muestra de heces';
      notes = 'Perfil de chequeo integral. Ayuno de 10-12h, cenar ligero sin grasas la noche previa. Traer orina matutina y heces frescas.';
    }
  }

  // PERFIL FERROCINÉTICA
  else if (normCat === 'PERFIL FERROCINÉTICA') {
    sampleType = 'Muestra de sangre';
    fastingHours = '8 - 12 horas';
    notes = 'Extracción matutina ideal. Suspender suplementos de hierro 48 a 72 horas antes salvo indicación médica.';
  }

  // PRUEBAS ESPECIALES Y OTROS ESTUDIOS
  else if (normCat === 'PRUEBAS ESPECIALES' || normCat === 'OTROS ESTUDIOS') {
    if (lower.includes('citologia urinaria') || lower.includes('citología urinaria')) {
      sampleType = 'Muestra de orina (3 muestras matutinas)';
      fastingHours = 'No requiere ayuno';
      notes = 'Segunda orina matutina recolectada durante 3 días consecutivos.';
    } else if (lower.includes('citologia ginecologica') || lower.includes('citología ginecológica') || lower.includes('papanicolaou') || lower.includes('pap')) {
      sampleType = 'Muestra ginecológica (frotis en lámina)';
      fastingHours = 'No requiere ayuno';
      notes = '48h de abstinencia sexual, sin duchas vaginales ni óvulos previos. No estar en período menstrual.';
    } else if (lower.includes('lcr') || lower.includes('cefalorraquideo')) {
      sampleType = 'Líquido cefalorraquídeo (LCR) obtenido por punción médica';
      fastingHours = 'No requiere ayuno';
      notes = 'Punción asistida por médico especialista.';
    } else if (lower.includes('sinovial') || lower.includes('articular')) {
      sampleType = 'Líquido sinovial articular obtenido por punción médica';
      fastingHours = 'No requiere ayuno';
      notes = 'Punción asistida por médico especialista.';
    } else if (lower.includes('pleural')) {
      sampleType = 'Líquido pleural obtenido por punción médica';
      fastingHours = 'No requiere ayuno';
      notes = 'Punción asistida por médico especialista.';
    } else if (lower.includes('pericardico') || lower.includes('pericárdico')) {
      sampleType = 'Líquido pericárdico obtenido por punción médica';
      fastingHours = 'No requiere ayuno';
      notes = 'Punción asistida por médico especialista.';
    } else if (lower.includes('peritoneal') || lower.includes('ascitico') || lower.includes('ascítico')) {
      sampleType = 'Líquido peritoneal/ascítico obtenido por punción médica';
      fastingHours = 'No requiere ayuno';
      notes = 'Punción asistida por médico especialista.';
    } else if (lower.includes('gota gruesa') || lower.includes('hemoparasitos') || lower.includes('malaria')) {
      sampleType = 'Muestra de sangre';
      fastingHours = 'No requiere ayuno';
      notes = 'Idealmente tomar la muestra durante el pico febril.';
    } else if (lower.includes('erlichia') || lower.includes('ehrlichia') || lower.includes('capa blanca')) {
      sampleType = 'Muestra de sangre (capa blanca / frotis)';
      fastingHours = 'No requiere ayuno';
      notes = 'Idealmente tomar la muestra durante el pico febril.';
    } else if (lower.includes('gases venos')) {
      sampleType = 'Muestra de sangre venosa';
      fastingHours = lower.includes('postprandial') ? '1 hora post-desayuno' : 'No requiere ayuno';
      notes = 'Gasometría venosa.';
    } else if (lower.includes('gases arterial')) {
      sampleType = 'Muestra de sangre arterial';
      fastingHours = 'No requiere ayuno';
      notes = 'Punción arterial estricta con reposo previo de 15 minutos.';
    } else if (lower.includes('vitamina b12') || lower.includes('cobalamina')) {
      sampleType = 'Muestra de sangre';
      fastingHours = '8 - 12 horas';
      notes = 'Ayuno de 8 a 12 horas. Suspender suplementos de complejo B o vitamina B12 de 48 a 72 horas antes.';
    } else if (lower.includes('vitamina d')) {
      sampleType = 'Muestra de sangre';
      fastingHours = '8 - 12 horas';
      notes = 'Ayuno de 8 a 12 horas.';
    } else if (lower.includes('folico') || lower.includes('fólico') || lower.includes('folato')) {
      sampleType = 'Muestra de sangre';
      fastingHours = '8 - 12 horas';
      notes = 'Ayuno de 8 a 12 horas.';
    } else if (lower.includes('hba1c') || lower.includes('hemoglobina glicada') || lower.includes('glicosilada')) {
      sampleType = 'Muestra de sangre';
      fastingHours = 'No requiere ayuno';
      notes = 'No requiere ayuno obligatorio. Informar si ha recibido transfusiones recientes.';
    } else if (lower.includes('antigenos febriles') || lower.includes('widal')) {
      sampleType = 'Muestra de sangre';
      fastingHours = 'No requiere ayuno';
      notes = 'Prueba serológica febril.';
    } else {
      sampleType = 'Muestra de sangre';
      fastingHours = '8 - 12 horas';
      notes = 'Atención general por orden de llegada a partir de las 7:00 AM (Lun-Vie) o 8:00 AM (Sáb).';
    }
  }

  return {
    fastingHours,
    sampleType,
    turnaround,
    isCaracasConvenio,
    notes
  };
}

// Format canonical clean name
function cleanExamName(rawName) {
  let name = rawName.trim();
  // Ensure capital start
  return name.charAt(0).toUpperCase() + name.slice(1);
}

// Build 187 items array
const finalExams = rawItems.map((item, idx) => {
  const normCat = normalizeCategory(item.category);
  const cleanName = cleanExamName(item.rawName);
  const synonyms = extractSynonyms(item.rawName);
  const preanalytics = determinePreanalytics(item.category, item.rawName);
  
  // Create unique id
  const slug = cleanName.toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '_')
    .slice(0, 35)
    .replace(/_+$/, '');
  const id = `gp_${String(idx + 1).padStart(3, '0')}_${slug}`;

  return {
    id,
    category: normCat,
    name: cleanName,
    synonyms,
    priceUsd: item.priceUsd,
    fastingHours: preanalytics.fastingHours,
    sampleType: preanalytics.sampleType,
    turnaround: preanalytics.turnaround,
    active: true,
    notes: preanalytics.notes,
    isCaracasConvenio: preanalytics.isCaracasConvenio
  };
});

console.log(`\nSuccessfully processed ${finalExams.length} exams.`);
console.log('Sample exam 1:', JSON.stringify(finalExams[0], null, 2));
console.log('Sample exam 11 (Glicemia):', JSON.stringify(finalExams[8], null, 2));
console.log('Sample exam 18 (Perfil Lipidico):', JSON.stringify(finalExams[15], null, 2));

// 1. Write src/data/initialExams.ts
const tsContent = `import { LabExam } from '../types/lab';

/**
 * Catálogo Oficial Maestro de Exámenes y Tarifario
 * GONZALEZ-PRATO Laboratorio Clínico
 * 
 * Fuente: Lista de precios IA 20-09-2026.xlsx & Manual de Condicionamiento Preanalítico v2.0
 * Total de pruebas registradas: ${finalExams.length}
 * Moneda oficial de referencia: USD ($)
 */
export const INITIAL_EXAMS: LabExam[] = ${JSON.stringify(finalExams, null, 2)};
`;

fs.writeFileSync(path.join(__dirname, '../src/data/initialExams.ts'), tsContent, 'utf8');
console.log('-> Generated src/data/initialExams.ts');

// 2. Write src/data/examenes_espejo.json
fs.writeFileSync(path.join(__dirname, '../src/data/examenes_espejo.json'), JSON.stringify(finalExams, null, 2), 'utf8');
console.log('-> Generated src/data/examenes_espejo.json');

// 3. Write database/seed.sql
let sqlSeed = `-- =========================================================================
-- SEED OFICIAL: CATÁLOGO DE EXÁMENES Y TARIFARIO (187 PRUEBAS)
-- Institución: GONZALEZ-PRATO Laboratorio Clínico
-- Fecha de Actualización: Septiembre 2026
-- =========================================================================

TRUNCATE TABLE examenes CASCADE;

INSERT INTO examenes (
  id,
  categoria,
  nombre,
  sinonimos,
  costo_usd,
  horas_ayuno,
  tipo_muestra,
  tiempo_entrega,
  activo,
  notas,
  es_convenio_caracas
) VALUES
`;

const sqlValues = finalExams.map(e => {
  const synArray = `ARRAY[${e.synonyms.map(s => `'${s.replace(/'/g, "''")}'`).join(', ')}]`;
  const notesEsc = e.notes ? `'${e.notes.replace(/'/g, "''")}'` : 'NULL';
  return `  ('${e.id}', '${e.category.replace(/'/g, "''")}', '${e.name.replace(/'/g, "''")}', ${synArray}, ${e.priceUsd}, '${e.fastingHours.replace(/'/g, "''")}', '${e.sampleType.replace(/'/g, "''")}', '${e.turnaround.replace(/'/g, "''")}', ${e.active}, ${notesEsc}, ${Boolean(e.isCaracasConvenio)})`;
}).join(',\n');

sqlSeed += sqlValues + ';\n';

fs.writeFileSync(path.join(__dirname, '../database/seed.sql'), sqlSeed, 'utf8');
console.log('-> Generated database/seed.sql');
