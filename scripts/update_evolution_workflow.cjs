const fs = require('fs');
const path = require('path');

const workflowPath = path.join(__dirname, '../agents/n8n/gonzalez_prato_evolution_api_workflow.json');
const examsPath = path.join(__dirname, '../src/data/examenes_espejo.json');

const workflow = JSON.parse(fs.readFileSync(workflowPath, 'utf8'));
const exams = JSON.parse(fs.readFileSync(examsPath, 'utf8'));

// 1. Group exams by category for prompt reference
const byCat = {};
exams.forEach(e => {
  if (!byCat[e.category]) byCat[e.category] = [];
  byCat[e.category].push(e);
});

let catalogText = '';
for (const [cat, items] of Object.entries(byCat)) {
  catalogText += `\n### CATEGORÍA: ${cat}\n`;
  items.forEach(item => {
    const synStr = item.synonyms && item.synonyms.length > 0 ? ` (Alias: ${item.synonyms.slice(0, 4).join(', ')})` : '';
    catalogText += `• ${item.name}${synStr}: $${item.priceUsd} USD | Muestra: ${item.sampleType} | Requisitos: ${item.fastingHours}`;
    if (item.notes) {
      catalogText += ` | Notas: ${item.notes}`;
    }
    catalogText += '\n';
  });
}

// 2. Prepare compact mirror catalog for n8n code node
const compactExams = exams.map(e => ({
  id: e.id,
  name: e.name,
  syns: e.synonyms || [],
  price: e.priceUsd,
  sample: e.sampleType,
  fasting: e.fastingHours,
  notes: e.notes || '',
  caracas: !!e.isCaracasConvenio
}));

// 3. Build JS code for "Parsear Mensaje Evolution API"
const parseMessageJsCode = `// Parser de mensajes entrantes de Evolution API con Pre-Retrieval Clínico Determinista
const item = $input.first();
if (!item || !item.json) return [];
const body = item.json.body || item.json;
const data = body.data || body;
if (!data) return [];

const SUPABASE_URL = 'https://petcqaixzetwsduscvtx.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBldGNxYWl4emV0d3NkdXNjdnR4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODk1OTAxNjMsImV4cCI6MjEwNTE2NjE2M30.4vDNJ3nBMi0TQg71KZUpyJdcBWr5zyTDKR92xA4obgM';

async function httpReq(url, options = {}) {
  const method = options.method || 'GET';
  const headers = options.headers || {};
  const reqBody = options.body;
  if (typeof $httpRequest === 'function') {
    return await $httpRequest({ method, url, headers, body: reqBody, json: true });
  }
  if (typeof fetch !== 'undefined') {
    const res = await fetch(url, { method, headers, body: reqBody ? JSON.stringify(reqBody) : undefined });
    try { return await res.json(); } catch { return null; }\n  }
  return null;
}

// BLOQUE 1: Mensajes salientes de la Secretaría (fromMe = true)
if (data.key && data.key.fromMe) {
  const remoteJid = data.key.remoteJid || '';
  if (remoteJid && !remoteJid.includes('@g.us') && !remoteJid.includes('status@broadcast')) {
    const patientPhone = remoteJid.replace('@s.whatsapp.net', '');
    let msgObj = data.message || {};
    if (msgObj.viewOnceMessage && msgObj.viewOnceMessage.message) msgObj = msgObj.viewOnceMessage.message;
    if (msgObj.ephemeralMessage && msgObj.ephemeralMessage.message) msgObj = msgObj.ephemeralMessage.message;
    let secText = msgObj.conversation || (msgObj.extendedTextMessage && msgObj.extendedTextMessage.text) || '';
    if (secText) {
      try {
        await httpReq(SUPABASE_URL + '/rest/v1/mensajes_chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'apikey': SUPABASE_KEY, 'Authorization': 'Bearer ' + SUPABASE_KEY },
          body: { whatsapp_id: patientPhone, emisor: 'SECRETARIA', contenido: secText }
        });
        await httpReq(SUPABASE_URL + '/rest/v1/pacientes_leads?whatsapp_id=eq.' + patientPhone, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json', 'apikey': SUPABASE_KEY, 'Authorization': 'Bearer ' + SUPABASE_KEY },
          body: { estado_atencion: 'ESCALADO_HUMANO', ultimo_mensaje: secText, updated_at: new Date().toISOString() }
        });
      } catch (err) {}
    }
  }
  return [];
}

// BLOQUE 2: Parsear remitente
const senderRemoteJid = (data.key && data.key.remoteJid) || '';
if (!senderRemoteJid || senderRemoteJid.includes('@g.us') || senderRemoteJid.includes('status@broadcast')) return [];

const senderPhone = senderRemoteJid.replace('@s.whatsapp.net', '');
const senderName = data.pushName || 'Paciente';
const instanceName = body.instance || 'gonzalez-prato';

// BLOQUE 3: Extraer texto del mensaje
let msgObj = data.message || {};
if (msgObj.viewOnceMessage && msgObj.viewOnceMessage.message) msgObj = msgObj.viewOnceMessage.message;
if (msgObj.viewOnceMessageV2 && msgObj.viewOnceMessageV2.message) msgObj = msgObj.viewOnceMessageV2.message;
if (msgObj.ephemeralMessage && msgObj.ephemeralMessage.message) msgObj = msgObj.ephemeralMessage.message;
if (msgObj.documentWithCaptionMessage && msgObj.documentWithCaptionMessage.message) msgObj = msgObj.documentWithCaptionMessage.message;

let userText = '';
if (msgObj.conversation) userText = msgObj.conversation;
else if (msgObj.extendedTextMessage && msgObj.extendedTextMessage.text) userText = msgObj.extendedTextMessage.text;
else if (msgObj.imageMessage) userText = msgObj.imageMessage.caption || '[Foto de orden médica adjunta]';
else if (msgObj.audioMessage) userText = '[Nota de voz del paciente]';

if (!userText) return [];

// BLOQUE 4: Estado del lead (¿bot activo o escalado?)
let leadStatus = 'BOT_ACTIVO';
try {
  const leadRows = await httpReq(
    SUPABASE_URL + '/rest/v1/pacientes_leads?whatsapp_id=eq.' + senderPhone + '&select=estado_atencion',
    { headers: { 'apikey': SUPABASE_KEY, 'Authorization': 'Bearer ' + SUPABASE_KEY } }
  );
  if (Array.isArray(leadRows) && leadRows.length > 0 && leadRows[0].estado_atencion) {
    leadStatus = leadRows[0].estado_atencion;
  }
} catch(e) {}

const botActive = (leadStatus !== 'ESCALADO_HUMANO' && leadStatus !== 'FINALIZADO');

// BLOQUE 5: Horario laboral Venezuela (UTC-4)
const now = new Date();
const vzlaDate = new Date(now.toLocaleString('en-US', { timeZone: 'America/Caracas' }));
const dayOfWeek = vzlaDate.getDay();
const totalMinutes = vzlaDate.getHours() * 60 + vzlaDate.getMinutes();

let isOpen = false;
let nextOpening = 'Mañana a las 7:00 AM';
if (dayOfWeek >= 1 && dayOfWeek <= 5) {
  isOpen = totalMinutes >= 420 && totalMinutes < 900;
  if (!isOpen) nextOpening = totalMinutes < 420 ? 'Hoy a las 7:00 AM' : (dayOfWeek === 5 ? 'Sábado a las 8:00 AM' : 'Mañana a las 7:00 AM');
} else if (dayOfWeek === 6) {
  isOpen = totalMinutes >= 480 && totalMinutes < 780;
  if (!isOpen) nextOpening = totalMinutes < 480 ? 'Hoy a las 8:00 AM' : 'Lunes a las 7:00 AM';
} else {
  nextOpening = 'Lunes a las 7:00 AM';
}

const dayNames = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
const currentFormattedTime = vzlaDate.toLocaleTimeString('es-VE', { hour: '2-digit', minute: '2-digit', hour12: true });
const scheduleContext = 'Hoy es ' + dayNames[dayOfWeek] + ', hora actual: ' + currentFormattedTime + '. Sede: ' + (isOpen ? 'ABIERTA' : 'CERRADA (próxima apertura: ' + nextOpening + ')');

// BLOQUE 6: Pre-Retrieval Clínico Determinista (Catálogo Espejo)
const catalog = ${JSON.stringify(compactExams)};

function normText(t) {
  return (t || '').toLowerCase().normalize('NFD').replace(/[\\u0300-\\u036f]/g, '').trim();
}

function isWordMatch(text, pattern) {
  if (!text || !pattern) return false;
  if (pattern.length <= 4) {
    const escaped = pattern.replace(/[.*+?^$\{}()|[\\]\\\\]/g, '\\\\$&');
    const regex = new RegExp('(?:^|\\\\s|[^a-z0-9])' + escaped + '(?:$|\\\\s|[^a-z0-9])', 'i');
    return regex.test(text);
  }
  return text.includes(pattern);
}

const normU = normText(userText);
const matchedList = [];
const matchedIds = new Set();

for (const ex of catalog) {
  if (matchedIds.has(ex.id)) continue;
  const nName = normText(ex.name);
  if (isWordMatch(normU, nName)) {
    matchedList.push(ex);
    matchedIds.add(ex.id);
    continue;
  }
  for (const s of ex.syns) {
    const nSyn = normText(s);
    if (nSyn.length >= 2 && isWordMatch(normU, nSyn)) {
      matchedList.push(ex);
      matchedIds.add(ex.id);
      break;
    }
  }
}

// Anti-canibalización clínica rigurosa
const filteredMatches = matchedList.filter(ex => {
  // 1. Plaquetas vs Hematología
  if (ex.id === 'gp_001_hematologia_completa' && normU.includes('plaqueta') && !normU.includes('hematolog') && !normU.includes('hemograma') && !normU.includes('formula')) {
    return false;
  }
  // 2. Moco nasal vs Citología vaginal
  if (normU.includes('moco nasal') && normText(ex.name).includes('vaginal')) return false;

  // 3. Urea vs Mycoplasma/Ureaplasma
  if (ex.id === 'gp_040_mycoplasma_y_ureaplasma') {
    const wantsUreaplasma = normU.includes('ureaplasma') || normU.includes('mycoplasma') || normU.includes('micoplasma');
    if (!wantsUreaplasma) return false;
  }

  // 4. Creatinina simple vs 24 horas / Clearence
  if (ex.id === 'gp_127_depuracion_de_creatinina_24_h_o_cle' || ex.id === 'gp_133_concentraciones_urinarias_24_h_o_au') {
    const wants24h = normU.includes('24') || normU.includes('depuracion') || normU.includes('clearence') || normU.includes('concentraciones urinarias');
    if (!wants24h) return false;
  }

  // 5. Helicobacter en heces vs Serología en sangre
  if (ex.id === 'gp_086_helicobacter_pylori_igm_o_anticuerp' || ex.id === 'gp_087_helicobacter_pylori_igg_o_anticuerp' || ex.id === 'gp_088_serologia_h_pylori_o_serologia_heli') {
    const wantsFecal = normU.includes('heces') || normU.includes('coproantigeno') || normU.includes('fecal') || normU.includes('antigeno');
    const wantsBlood = normU.includes('sangre') || normU.includes('serologia') || normU.includes('igm') || normU.includes('igg') || normU.includes('anticuerpo');
    if (wantsFecal && !wantsBlood) return false;
  }

  // 6. Panel Respiratorio vs Anticuerpos Sars Cov 2
  if (ex.id.includes('sars_cov') && !ex.id.includes('panel_respiratorio') && normU.includes('panel respiratorio')) {
    return false;
  }

  // 7. Cultivo de Esputo vs Ziehl modificado / Kinyoun
  if (normU.includes('esputo') && (ex.id.includes('zielh') || ex.id.includes('ziehl') || ex.id.includes('kinyoun') || normText(ex.name).includes('zielh') || normText(ex.name).includes('kinyoun'))) {
    if (normU.includes('cultivo')) return false; // Ya incluido en cultivo de esputo
  }

  // 8. Azúcares reductores vs Glicemia basal
  if (ex.id.includes('glicemia') && (normU.includes('azucares reductores') || normU.includes('absorcion intestinal')) && !normU.includes('glicemia') && !normU.includes('glucosa')) {
    return false;
  }

  return true;
});

const SPECIAL_FECAL_IDS = [
  'gp_142_coproantigenos_helicobacter_pylori',
  'gp_139_absorcion_intestinal_o_azucares_red',
  'gp_151_ag_e_histolytica_giardia_crypto_cop',
  'gp_150_ag_entamoeba_histolytica_coproantig',
  'gp_137_sudan_iii_o_esteatorrea_en_heces',
  'gp_136_leucograma_fecal_o_leucocitos_en_he',
  'gp_143_esteatocrito_acido',
  'gp_038_calprotectina_semicuantitativa'
];

const hasSpecialFecal = filteredMatches.some(e => SPECIAL_FECAL_IDS.includes(e.id) || normText(e.name).includes('calprotectina'));
const isCoproSimple = (e) => e.id === 'gp_135_coproparasitologico_o_examen_de_hec' || normText(e.name).includes('coproparasitologico') || normText(e.name) === 'examen de heces';

let calculatedTotalUsd = 0;
let matchedExamsSummary = '';

if (filteredMatches.length > 0) {
  matchedExamsSummary = '📋 FICHA TÉCNICA OFICIAL DE EXÁMENES (DATOS DETERMINISTAS CONGELADOS):\\n';
  filteredMatches.forEach((ex, idx) => {
    let p = ex.price;
    let isFree = false;
    if (hasSpecialFecal && isCoproSimple(ex)) {
      p = 0;
      isFree = true;
    } else {
      calculatedTotalUsd += p;
    }
    matchedExamsSummary += (idx + 1) + '. ' + ex.name + ':\\n';
    matchedExamsSummary += '   • Precio: ' + (isFree ? '$0.00 USD (¡INCLUIDO SIN COSTO en su estudio coprológico especializado!)' : '$' + p.toFixed(2) + ' USD') + '\\n';
    matchedExamsSummary += '   • Muestra: ' + ex.sample + '\\n';
    matchedExamsSummary += '   • Requisitos: ' + ex.fasting + '\\n';
    if (ex.notes) matchedExamsSummary += '   • Notas: ' + ex.notes + '\\n';
  });
  matchedExamsSummary += '\\n💰 TOTAL CALCULADO: $' + calculatedTotalUsd.toFixed(2) + ' USD';
} else {
  matchedExamsSummary = 'NO_EXAMS_MATCHED';
}

return [{
  json: {
    senderRemoteJid: senderRemoteJid,
    senderPhone: senderPhone,
    senderName: senderName,
    userText: userText,
    instance: instanceName,
    leadStatus: leadStatus,
    botActive: botActive,
    scheduleContext: scheduleContext,
    matchedExamsSummary: matchedExamsSummary,
    hasMatchedExams: filteredMatches.length > 0,
    calculatedTotalUsd: calculatedTotalUsd
  }
}];`;

// 4. Build newSystemMessage for AI Agent
const newSystemMessage = `Eres el Asistente Clínico Virtual Oficial 24/7 de GONZALEZ-PRATO Laboratorio (Directora Técnica: Lic. Luisa Carolina González Ramírez, Mérida, Venezuela).

ESTADO TEMPORAL ACTUAL:
{{ $json.scheduleContext || $("Parsear Mensaje Evolution API").first().json.scheduleContext }}

DATOS DEL PACIENTE:
- Nombre: {{ $json.senderName || $("Parsear Mensaje Evolution API").first().json.senderName }}
- Teléfono: {{ $json.senderPhone || $("Parsear Mensaje Evolution API").first().json.senderPhone }}

══════════════════════════════════════════════════════════════
INFORME DETERMINISTA DE EXÁMENES DETECTADOS EN ESTE MENSAJE:
══════════════════════════════════════════════════════════════
{{ $json.matchedExamsSummary || $("Parsear Mensaje Evolution API").first().json.matchedExamsSummary }}

══════════════════════════════════════════════════════════════
DIRECTRICES CLÍNICAS Y REGLAS DE COMUNICACIÓN OBLIGATORIAS
══════════════════════════════════════════════════════════════

1. IDENTIFICACIÓN INTELIGENTE DEL ASISTENTE VIRTUAL:
• EN EL SALUDO INICIAL O PRIMERA INTERACCIÓN DEL PACIENTE:
  Identifícate formalmente con la presentación institucional completa:
  "🤖 Hola [Nombre], soy el Asistente Clínico Virtual de *GONZALEZ-PRATO Laboratorio* 🧪 (Dirección Técnica: Lic. Luisa Carolina González Ramírez)."

• EN COTIZACIONES CONTINUAS O MENSAJES CONSECUTIVOS DEL MISMO CHAT:
  Para evitar sobrecargar la conversación, NO repitas todo el bloque largo de saludo institucional ni el nombre de la directora técnica. Usa la cabecera limpia y directa:
  "🤖 Con gusto le presento la cotización oficial y preparación en *GONZALEZ-PRATO Laboratorio* 🧪:"

• SI EL MENSAJE ES CONFUSO, INFORMAL, TÉCNICO O FUERA DE CONTEXTO (ej. "y haces?", "dame 5 min", "estoy reiniciando", etc.):
  Aclara amablemente tu rol de sistema automatizado sin actuar como persona cotidiana:
  "🤖 Disculpe la confusión, soy un sistema automatizado diseñado para brindarle información sobre nuestros servicios, cotizaciones y requisitos de preparación para los exámenes que realizamos en nuestro laboratorio.\n\nPor favor, *escriba aquí los nombres de los exámenes* que necesita consultar y con gusto le prepararé su presupuesto oficial y le indicaré cómo debe prepararse.\n\n*(Si prefiere hablar con una persona, realizar un reclamo o agendar una cita de micología, indíquelo y activaré la alerta para que recepción le atienda)*."

• NUNCA pretendas ser una persona real ni una secretaria física.

2. REGLA SUPREMA DE DETERMINISMO EN PRECIOS Y TOTALES (CERO ALUCINACIÓN):
• Si arriba aparece la "FICHA TÉCNICA OFICIAL DE EXÁMENES", DEBES utilizar ESTRICTAMENTE los precios, tipos de muestra, requisitos y el TOTAL CALCULADO que allí se indican. ESTÁ TERMINANTEMENTE PROHIBIDO alterar montos o inventar precios.
• Si el paciente solicita un examen que NO aparece en la ficha ni en el catálogo, indica con amabilidad:
  "Actualmente no dispongo del precio automatizado para este estudio en mi catálogo. He notificado a nuestra secretaría para que le brinde la cotización exacta a la brevedad." y ejecuta la herramienta \`activar_human_handover_alarma\`.

3. REGLAS CLÍNICAS SOBRE MUESTRAS Y PREANALÍTICA:
• NUNCA proporciones detalles técnicos internos de recipientes o tubos (ej. "tubo tapa morada", "tubo tapa roja", "EDTA") a menos que lo pregunten explícitamente. Usa siempre términos amigables: "Muestra de sangre", "Muestra de orina", "Muestra de heces", "Hisopado nasal / nasofaríngeo".
• CORRECCIÓN CRÍTICA — CALPROTECTINA: Para la "Calprotectina semicuantitativa" o "Calprotectina fecal", la muestra es ÚNICAMENTE "Muestra de heces fresca en recolector estéril". NO es muestra de sangre ni requiere ayuno de alimentos. (Requisito: entregar en menos de 2 horas al laboratorio).
• CORRECCIÓN CRÍTICA — PANEL RESPIRATORIO: Para el "Panel respiratorio (Mycoplasma, adenovirus, Influenza A y B, Sars Cov)", la muestra es ÚNICAMENTE "Hisopado nasal / nasofaríngeo". NO es muestra de sangre ni requiere ayuno de alimentos. (Requisito: no aplicar gotas o sprays nasales 4-6h antes).
• CORRECCIÓN CRÍTICA — UROANÁLISIS: Para el "Uroanálisis" y cualquier examen de orina, la muestra es ÚNICAMENTE "Orina". Jamás menciones sangre ni suero.
• CORRECCIÓN CRÍTICA — COPROANÁLISIS: Para el "Coproanálisis" o "Coproantígeno", la muestra es ÚNICAMENTE "Heces". Jamás menciones sangre ni suero.
• Solo indica ayuno (8 a 12 horas) para los exámenes en sangre que lo requieran (Glicemia, Perfil Lipídico, Hormonas, etc.). NO indiques ayuno para orina, heces ni hisopados.

4. REGLA CRÍTICA DE COPROANÁLISIS (Examen de Heces Incluido sin Costo Adicional):
Los siguientes 8 exámenes fecales especializados YA INCLUYEN el examen Coproparasitológico simple sin costo adicional ($0 extra):
1. Coproantígenos Helicobacter pylori ($13.50 USD)
2. Absorción intestinal / Azúcares reductores ($11.00 USD)
3. Ag E. histolytica / Giardia / Cryptosporidium ($40.00 USD)
4. Ag Entamoeba histolytica ($26.00 USD)
5. Sudan III / Esteatorrea en heces ($11.00 USD)
6. Leucograma fecal / Polimorfonucleares en heces ($11.00 USD)
7. Esteatocrito ácido ($10.00 USD)
8. Calprotectina semicuantitativa ($26.00 USD)
Si el paciente pide cualquiera de estos 8 estudios y además examen de heces/coproparasitológico, indícale claramente que el examen de heces YA ESTÁ INCLUIDO ($0.00 USD) y NO se cobra extra.

5. SOLICITUD DE ÓRDENES MÉDICAS Y TEXTO VS. IMAGEN:
• Si el paciente no ha especificado qué exámenes necesita o menciona que tiene una orden médica:
  "Por favor escriba aquí en texto los nombres de los exámenes que le han indicado para prepararle de inmediato su presupuesto oficial. (Si prefiere enviar una foto de la orden médica, nuestro equipo de recepción la revisará manualmente en horario de atención)."
• NUNCA prometas que el bot leerá imágenes de forma autónoma.

6. MENSAJES ADMINISTRATIVOS Y MÉTODOS DE PAGO:
• Medios de pago aceptados en sede: Efectivo (USD / Bolívares), Punto de Venta en sede física y Transferencia bancaria en Bolívares a tasa oficial BCV.
• REGLA CRÍTICA SOBRE PAGO MÓVIL: El laboratorio NO dispone de Pago Móvil. NUNCA ofrezcas Pago Móvil ni inventes plantillas de pago móvil.
• No transfieras las cotizaciones estándar a secretaría. El paciente cancela directamente al acudir a su toma en sede.

7. CONVENIO TORRE CARACAS:
Si el paciente consulta por pruebas remitidas a Caracas (Paneles RAST, Zonulina, Borrelia/Lyme, etc.), incluye textualmente el mensaje:
"Estos exámenes son remitidos a un laboratorio en Caracas, por lo tanto, Gonzalez Prato Laboratorio actúa como enlace para la recolección y envío de las muestras. En consecuencia, el resultado llega vía correo electrónico y se le remite al paciente usando esa misma modalidad."

8. FORMATO DE COTIZACIÓN OBLIGATORIO:
🤖 Con gusto le presento la cotización oficial y preparación en *GONZALEZ-PRATO Laboratorio* 🧪:

• [Nombre del Examen]
  - Precio: $[Monto] USD
  - Muestra: [Muestra de sangre / Muestra de orina / Muestra de heces / Hisopado nasal]
  - Requisitos: [Ayuno solo si aplica / Preparación preanalítica]

──────────────────────────
💰 *TOTAL ESTIMADO:* **$[Total] USD**
*(Puede cancelar directamente en recepción al momento de su toma: Efectivo USD/Bs, Punto de Venta o Transferencia BCV).*

📍 *Sede:* Urb. El Encanto, Clínica del Niño, Sótano 2 (detrás de la Contraloría del Estado Mérida).
⏰ *Horario:* Lunes a Viernes de 7:00 AM a 3:00 PM | Sábados de 8:00 AM a 1:00 PM (Atención por orden de llegada).

══════════════════════════════════════════════════════════════
CATÁLOGO INSTITUCIONAL COMPLETO (TAXONOMÍA DE REFERENCIA):
══════════════════════════════════════════════════════════════
${catalogText}`;

// 5. Apply updates to workflow JSON
let updatedParse = false;
let updatedSystem = false;

workflow.nodes.forEach(node => {
  if (node.name === 'Parsear Mensaje Evolution API' && node.parameters) {
    node.parameters.jsCode = parseMessageJsCode;
    updatedParse = true;
  }
  if (node.parameters && node.parameters.options && node.parameters.options.systemMessage) {
    node.parameters.options.systemMessage = newSystemMessage;
    updatedSystem = true;
  }
});

if (updatedParse && updatedSystem) {
  fs.writeFileSync(workflowPath, JSON.stringify(workflow, null, 2), 'utf8');
  console.log('✅ Workflow updated successfully with Deterministic Pre-Retrieval Matcher & System Message Catalog!');
} else {
  console.error('❌ Error updating nodes:', { updatedParse, updatedSystem });
}
