const fs = require('fs');

const wfPath = 'agents/n8n/gonzalez_prato_evolution_api_workflow.json';
const wf = JSON.parse(fs.readFileSync(wfPath, 'utf8'));

const parserNode = wf.nodes.find(n => n.name === 'Parsear Mensaje Evolution API');
const agentNode = wf.nodes.find(n => n.name === 'Agente Clínico Inteligente 24/7');

const espejo = JSON.parse(fs.readFileSync('src/data/examenes_espejo.json', 'utf8'));
const catalogMapped = espejo.map(e => ({
  id: e.id,
  name: e.name,
  syns: e.synonyms,
  price: e.priceUsd,
  sample: e.sampleType,
  fasting: e.fastingHours,
  notes: e.notes,
  caracas: e.isCaracasConvenio
}));

// 1. Build new parser jsCode
const originalJsCode = parserNode.parameters.jsCode;
// find where BLOQUE 6 starts
const bloque6Header = '// BLOQUE 6: Pre-Retrieval Clínico Determinista (Catálogo Espejo)';
const bloque6Index = originalJsCode.indexOf(bloque6Header);
if (bloque6Index === -1) {
  throw new Error('Could not find BLOQUE 6 header in parser jsCode');
}

const beforeBloque6 = originalJsCode.slice(0, bloque6Index);

const newBloque6 = `// BLOQUE 6: Pre-Retrieval Clínico Determinista (Catálogo Espejo)
const catalog = ${JSON.stringify(catalogMapped)};

function normText(str) {
  if (!str) return '';
  return str.toLowerCase().normalize('NFD').replace(/[\\u0300-\\u036f]/g, '').trim();
}

function isWordMatch(text, pattern) {
  if (!text || !pattern) return false;
  if (pattern.length <= 4) {
    const escaped = pattern.replace(/[.*+?^\${}()|[\\]\\\\]/g, '\\\\$&');
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
let filteredMatches = matchedList.filter(ex => {
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

  // 9. ASLO Cuantitativo ($15 USD) vs Semicuantitativo ($7.50 USD)
  if (normU.includes('aslo') || normU.includes('antiestreptolisina') || normU.includes('aso')) {
    const wantsSemicuant = normU.includes('semicuantitativ');
    if (wantsSemicuant && ex.id === 'gp_066_aslo_cuantitativo_o_titulos_de_anti') return false;
    if (!wantsSemicuant && ex.id === 'gp_065_aslo_semicuantitativo_o_titulos_de') return false;
  }

  return true;
});

// Expansión automática de Combo Testosterona (Total y Libre)
if (normU.includes('testosterona') && normU.includes('libre') && (normU.includes('total') || normU.includes('y libre') || normU.includes('ambas') || normU.includes('las dos') || normU.includes('los dos'))) {
  const tTotal = catalog.find(e => e.id === 'gp_057_testosterona_total_o_tt');
  const tLibre = catalog.find(e => e.id === 'gp_058_testosterona_libre');
  if (tTotal && !filteredMatches.some(e => e.id === tTotal.id)) filteredMatches.push(tTotal);
  if (tLibre && !filteredMatches.some(e => e.id === tLibre.id)) filteredMatches.push(tLibre);
}

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

// Auto-inclusión de examen de heces si pide Calprotectina o estudio fecal especial + heces
if (hasSpecialFecal && (normU.includes('heces') || normU.includes('coproanalisis') || normU.includes('coproparasitologico'))) {
  const coproSimple = catalog.find(e => e.id === 'gp_135_coproparasitologico_o_examen_de_hec');
  if (coproSimple && !filteredMatches.some(e => e.id === coproSimple.id)) filteredMatches.push(coproSimple);
}

const isCoproSimple = (e) => e.id === 'gp_135_coproparasitologico_o_examen_de_hec' || normText(e.name).includes('coproparasitologico') || normText(e.name).includes('examen de heces') || normText(e.name) === 'heces';

// Regla combo Testosterona Total + Libre
const hasTestoTotal = filteredMatches.some(e => e.id === 'gp_057_testosterona_total_o_tt');
const hasTestoLibre = filteredMatches.some(e => e.id === 'gp_058_testosterona_libre');
const isTestoCombo = hasTestoTotal && hasTestoLibre;
const isTestoTotalExam = (e) => e.id === 'gp_057_testosterona_total_o_tt';

// BLOQUE 7: Sincronización Dinámica de Tarifas en Vivo desde Supabase (Dashboard Sync)
if (filteredMatches.length > 0) {
  try {
    const inClause = filteredMatches.map(e => '"' + e.name.replace(/"/g, '\\\\"') + '"').join(',');
    const liveRows = await httpReq(
      SUPABASE_URL + '/rest/v1/examenes?nombre_examen=in.(' + encodeURIComponent(inClause) + ')&select=nombre_examen,costo_usd,activo',
      { headers: { 'apikey': SUPABASE_KEY, 'Authorization': 'Bearer ' + SUPABASE_KEY } }
    );
    if (Array.isArray(liveRows) && liveRows.length > 0) {
      liveRows.forEach(row => {
        const match = filteredMatches.find(e => e.name.toLowerCase() === (row.nombre_examen || '').toLowerCase());
        if (match && row.costo_usd !== undefined && row.costo_usd !== null && !isNaN(Number(row.costo_usd))) {
          match.price = Number(row.costo_usd);
        }
      });
    }
  } catch (liveErr) {
    // Si Supabase falla o hay timeout de red, se mantiene el precio en memoria de respaldo
  }
}

let calculatedTotalUsd = 0;
let matchedExamsSummary = '';

if (filteredMatches.length > 0) {
  const tLibreObj = filteredMatches.find(e => e.id === 'gp_058_testosterona_libre');
  const comboPrice = tLibreObj ? tLibreObj.price : 24;
  matchedExamsSummary = '📋 FICHA TÉCNICA OFICIAL DE EXÁMENES (DATOS DETERMINISTAS CONGELADOS):\\n';
  filteredMatches.forEach((ex, idx) => {
    let p = ex.price;
    let priceLabel = '$' + p.toFixed(2) + ' USD';
    if (hasSpecialFecal && isCoproSimple(ex)) {
      p = 0;
      priceLabel = '$0.00 USD (¡INCLUIDO SIN COSTO en su estudio coprológico especializado!)';
    } else if (isTestoCombo && isTestoTotalExam(ex)) {
      p = 0;
      priceLabel = '$0.00 USD (¡INCLUIDA / PROCESADA CONJUNTAMENTE en el estudio de Testosterona Libre por $' + comboPrice.toFixed(2) + ' USD total!)';
    } else {
      calculatedTotalUsd += p;
    }
    matchedExamsSummary += (idx + 1) + '. ' + ex.name + ':\\n';
    matchedExamsSummary += '   • Precio: ' + priceLabel + '\\n';
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
}];
`;

parserNode.parameters.jsCode = beforeBloque6 + newBloque6;

// 2. Build new systemMessage for Gemini Agent
let sysMsg = agentNode.parameters.options.systemMessage;

// Add specific instructions to DIRECTRICES CLÍNICAS
const oldRule3 = '• Solo indica ayuno (8 a 12 horas) para los exámenes en sangre que lo requieran (Glicemia, Perfil Lipídico, Hormonas, etc.). NO indiques ayuno para orina, heces ni hisopados.';
const newRule3 = `• Solo indica ayuno (8 a 12 horas) para los exámenes en sangre que lo requieran (Glicemia, Perfil Lipídico, Hormonas, etc.). NO indiques ayuno para orina, heces ni hisopados.
• CORRECCIÓN CRÍTICA — GASES VENOSOS Y ARTERIALES ($68.00 USD):
  - Horario exclusivo de toma en sede: Lunes a Viernes de 7:00 AM a 11:30 AM (NO en horario de la tarde hasta las 3 PM).
  - Preparación: Debe tomarse 1 hora después del desayuno (postprandial) o tras un reposo de 15 a 20 minutos.
  - Traslado: Si la toma se efectúa en nuestra sede física, la muestra NO requiere ningún tipo de traslado en hielo (solo si proviene de centro externo).
• CORRECCIÓN CRÍTICA — ASLO (ANTIESTREPTOLISINA O):
  - Por protocolo oficial, la cotización predeterminada para "ASLO", "antiestreptolisina" o "ASO" es ASLO cuantitativo ($15.00 USD).
  - Solo brindar ASLO semicuantitativo ($7.50 USD) si el paciente especifica expresamente la versión semicuantitativa.
• CORRECCIÓN CRÍTICA — TESTOSTERONA TOTAL Y LIBRE (COMBO $24.00 USD):
  - Para procesar la Testosterona Libre se requiere técnicamente la Testosterona Total. Por lo tanto, si el paciente solicita ambos estudios (Total y Libre), el precio total es $24.00 USD (NO sumar $12 + $24 = $36). La Testosterona Total se desglosa como incluida por $0.00 USD.
  - Si solicita únicamente Testosterona Total sola: $12.00 USD.
  - Si solicita únicamente Testosterona Libre sola: $24.00 USD.`;

if (sysMsg.includes(oldRule3)) {
  sysMsg = sysMsg.replace(oldRule3, newRule3);
}

// Update catalog section in systemMessage
// Update Gases venosos line in systemMessage:
sysMsg = sysMsg.replace(
  /• Gases venosos \(Alias: gases venosos\): \$68 USD \| Muestra: Muestra de sangre venosa \| Requisitos: No requiere ayuno \| Notas: Gasometría venosa\./g,
  '• Gases venosos (Alias: gases venosos, gasometria venosa): $68 USD | Muestra: Muestra de sangre venosa heparinizada | Requisitos: 1 hora postprandial o reposo 15-20 min | Notas: Horario exclusivo de toma en sede: Lunes a Viernes de 7:00 AM a 11:30 AM. Debe tomarse 1 hora después del desayuno o tras reposo de 15 a 20 min. En sede no requiere hielo.'
);

// Update Gases arteriales line in systemMessage:
sysMsg = sysMsg.replace(
  /• Gases arteriales \(Alias: gases arteriales\): \$68 USD \| Muestra: Muestra de sangre arterial \| Requisitos: No requiere ayuno \| Notas: Punción arterial estricta con reposo previo de 15 minutos\./g,
  '• Gases arteriales (Alias: gases arteriales, gasometria arterial): $68 USD | Muestra: Muestra de sangre arterial heparinizada | Requisitos: 1 hora postprandial o reposo 15-20 min | Notas: Horario exclusivo de toma en sede: Lunes a Viernes de 7:00 AM a 11:30 AM. Punción arterial con reposo previo de 15 a 20 minutos.'
);

// Update Testosterona lines in systemMessage:
sysMsg = sysMsg.replace(
  /• Testosterona Total  o TT \(Alias: testosterona total\): \$12 USD \| Muestra: Muestra de sangre \| Requisitos: 8 - 12 horas \| Notas: Extracción matutina ideal\. Notificar terapias hormonales\./g,
  '• Testosterona Total  o TT (Alias: testosterona total, testosterona tt, tt): $12 USD | Muestra: Muestra de sangre | Requisitos: 8 - 12 horas | Notas: Extracción matutina ideal. Notificar terapias hormonales. Si se solicita junto con Testosterona Libre, la Total está incluida por $24.00 USD total.'
);

sysMsg = sysMsg.replace(
  /• Testosterona libre \(Alias: testosterona libre\): \$24 USD \| Muestra: Muestra de sangre \| Requisitos: 8 - 12 horas \| Notas: Extracción matutina ideal\. Notificar terapias hormonales\./g,
  '• Testosterona libre (Alias: testosterona libre, testosterona total y libre, testosterona libre y total): $24 USD | Muestra: Muestra de sangre | Requisitos: 8 - 12 horas | Notas: Extracción matutina ideal. Notificar terapias hormonales. Incluye procesamiento de Testosterona Total (ambos por $24.00 USD).'
);

// Update ASLO lines in systemMessage:
sysMsg = sysMsg.replace(
  /• ASLO semicuantitativo o titulos de antiestreptolisina O semicuantitativos o ASO semicuantitativo \(Alias: aslo semicuantitativo, titulos de antiestreptolisina, semicuantitativos, aso semicuantitativo\): \$7\.5 USD \| Muestra: Muestra de sangre \| Requisitos: 4 - 8 horas \| Notas: Atención general por orden de llegada a partir de las 7:00 AM \(Lun-Vie\) o 8:00 AM \(Sáb\)\./g,
  '• ASLO semicuantitativo o titulos de antiestreptolisina O semicuantitativos o ASO semicuantitativo (Alias: aslo semicuantitativo, aso semicuantitativo, antiestreptolisina semicuantitativa): $7.5 USD | Muestra: Muestra de sangre | Requisitos: 4 - 8 horas | Notas: ASLO semicuantitativo ($7.50 USD). Para cuantificación exacta se realiza ASLO cuantitativo por $15.00 USD.'
);

sysMsg = sysMsg.replace(
  /• ASLO cuantitativo o titulos de antiestreptolisina O cuantitativos o ASO cuantitativo \(Alias: aslo cuantitativo, titulos de antiestreptolisina, cuantitativos, aso cuantitativo\): \$15 USD \| Muestra: Muestra de sangre \| Requisitos: 4 - 8 horas \| Notas: Atención general por orden de llegada a partir de las 7:00 AM \(Lun-Vie\) o 8:00 AM \(Sáb\)\./g,
  '• ASLO cuantitativo o titulos de antiestreptolisina O cuantitativos o ASO cuantitativo (Alias: aslo cuantitativo, aslo, antiestreptolisina, aso, titulos de antiestreptolisina, aso cuantitativo, antiestreptolisinas): $15 USD | Muestra: Muestra de sangre | Requisitos: 4 - 8 horas | Notas: ASLO cuantitativo ($15.00 USD). Cotización predeterminada estándar.'
);

// Update Calprotectina line in systemMessage:
sysMsg = sysMsg.replace(
  /• Calprotectina semicuantitativa \(Alias: calproteotina semicuantitativa, calprotectina, calprotectina fecal, calprotectina semicuantitativa\): \$26 USD \| Muestra: Muestra de heces fresca en recolector estéril \| Requisitos: No requiere ayuno \| Notas: Muestra fecal fresca \(entregar en menos de 2 horas al laboratorio\)\. No requiere ayuno\./g,
  '• Calprotectina semicuantitativa (Alias: calproteotina semicuantitativa, calprotectina, calprotectina fecal, calprotectina en heces): $26 USD | Muestra: Muestra de heces fresca en recolector estéril | Requisitos: No requiere ayuno | Notas: Muestra fecal fresca (<2 horas). Ya incluye examen de heces / coproparasitológico simple sin costo adicional ($0 extra).'
);

agentNode.parameters.options.systemMessage = sysMsg;

// Actualizar nodo "Guardar Lead Paciente en Supabase" para persistir total_cotizado_usd
const saveLeadNode = wf.nodes.find(n => n.name === 'Guardar Lead Paciente en Supabase');
if (saveLeadNode) {
  saveLeadNode.parameters.jsonBody = '={{ JSON.stringify({ whatsapp_id: $("Parsear Mensaje Evolution API").first().json.senderPhone, nombre_completo: $("Parsear Mensaje Evolution API").first().json.senderName, ultimo_mensaje: $("Parsear Mensaje Evolution API").first().json.userText, total_cotizado_usd: $("Parsear Mensaje Evolution API").first().json.calculatedTotalUsd || 0, updated_at: new Date().toISOString() }) }}';
}

fs.writeFileSync(wfPath, JSON.stringify(wf, null, 2), 'utf8');
console.log('Successfully updated', wfPath);
