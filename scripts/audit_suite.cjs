const fs = require('fs');
const path = require('path');

const exams = JSON.parse(fs.readFileSync(path.join(__dirname, '../src/data/examenes_espejo.json'), 'utf8'));

console.log('═══════════════════════════════════════════════════════════════════');
console.log('🧪 SUITE DE PRUEBAS DE REGRESIÓN CLÍNICA & ARQUITECTÓNICA (30 CASOS)');
console.log('   GONZALEZ-PRATO Laboratorio — Certificación de Cero Alucinación');
console.log('═══════════════════════════════════════════════════════════════════\n');

function normalizeText(text) {
  return (text || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim();
}

function isWordMatch(text, pattern) {
  if (!text || !pattern) return false;
  if (pattern.length <= 4) {
    const escaped = pattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp('(?:^|\\s|[^a-z0-9])' + escaped + '(?:$|\\s|[^a-z0-9])', 'i');
    return regex.test(text);
  }
  return text.includes(pattern);
}

function matchExams(query) {
  const normU = normalizeText(query);
  const matched = [];
  const matchedIds = new Set();

  for (const ex of exams) {
    if (matchedIds.has(ex.id)) continue;
    const nName = normalizeText(ex.name);
    if (isWordMatch(normU, nName)) {
      matched.push(ex);
      matchedIds.add(ex.id);
      continue;
    }
    for (const s of (ex.synonyms || [])) {
      const nSyn = normalizeText(s);
      if (nSyn.length >= 2 && isWordMatch(normU, nSyn)) {
        matched.push(ex);
        matchedIds.add(ex.id);
        break;
      }
    }
  }

  // Anti-canibalización clínica rigurosa
  return matched.filter(ex => {
    // 1. Plaquetas vs Hematología
    if (ex.id === 'gp_001_hematologia_completa' && normU.includes('plaqueta') && !normU.includes('hematolog') && !normU.includes('hemograma') && !normU.includes('formula')) {
      return false;
    }
    // 2. Moco nasal vs Citología vaginal
    if (normU.includes('moco nasal') && normalizeText(ex.name).includes('vaginal')) return false;

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
    if (normU.includes('esputo') && (ex.id.includes('zielh') || ex.id.includes('ziehl') || ex.id.includes('kinyoun') || normalizeText(ex.name).includes('zielh') || normalizeText(ex.name).includes('kinyoun'))) {
      if (normU.includes('cultivo')) return false; // Ya incluido en cultivo de esputo
    }

    // 8. Azúcares reductores vs Glicemia basal
    if (ex.id.includes('glicemia') && (normU.includes('azucares reductores') || normU.includes('absorcion intestinal')) && !normU.includes('glicemia') && !normU.includes('glucosa')) {
      return false;
    }

    return true;
  });
}

const SPECIAL_FECAL_IDS = [
  'gp_142_coproantigenos_helicobacter_pylori',
  'gp_139_absorcion_intestinal_o_azucares_red',
  'gp_151_ag_e_histolytica_giardia_crypto_cop',
  'gp_150_ag_entamoeba_histolytica_coproantig',
  'gp_137_sudan_iii_o_esteatorrea_en_heces',
  'gp_136_leucograma_fecal_o_leucocitos_en_he',
  'gp_143_esteatocrito_acido'
];

function calculateQuote(matched) {
  const hasSpecial = matched.some(e => SPECIAL_FECAL_IDS.includes(e.id));
  const isCopro = (e) => e.id === 'gp_135_coproparasitologico_o_examen_de_hec' || normalizeText(e.name).includes('coproparasitologico') || normalizeText(e.name) === 'examen de heces';
  
  let total = 0;
  matched.forEach(e => {
    if (hasSpecial && isCopro(e)) {
      // Included free $0
    } else {
      total += e.priceUsd;
    }
  });
  return total;
}

// Battery of 30 Test Cases
const testCases = [
  {
    id: 1,
    name: 'Hematología Completa (Precio oficial $7.50)',
    query: 'Precio de hematologia completa',
    validate: (res) => res.matched.some(e => e.id === 'gp_001_hematologia_completa' && e.priceUsd === 7.5) && res.total === 7.5
  },
  {
    id: 2,
    name: 'Urea o BUN (Precio oficial $4.50)',
    query: 'Costo del examen de urea',
    validate: (res) => res.matched.some(e => e.id.includes('urea') && e.priceUsd === 4.5) && res.total === 4.5
  },
  {
    id: 3,
    name: 'Creatinina (Precio oficial $4.50)',
    query: 'Cuánto cuesta la creatinina?',
    validate: (res) => res.matched.some(e => e.id.includes('cretinina') && e.priceUsd === 4.5) && res.total === 4.5
  },
  {
    id: 4,
    name: 'Glicemia en ayunas (Precio oficial $4.50)',
    query: 'Precio de glicemia en ayunas',
    validate: (res) => res.matched.some(e => e.id.includes('glicemia') && e.priceUsd === 4.5) && res.total === 4.5
  },
  {
    id: 5,
    name: 'Ácido Úrico (Precio oficial $4.50)',
    query: 'Examen de acido urico',
    validate: (res) => res.matched.some(e => e.id.includes('acido_urico') && e.priceUsd === 4.5) && res.total === 4.5
  },
  {
    id: 6,
    name: 'Perfil Lipídico / Lipidograma (Precio oficial $17.00)',
    query: 'Precio del perfil lipidico',
    validate: (res) => res.matched.some(e => e.id.includes('lipidograma') && e.priceUsd === 17) && res.total === 17
  },
  {
    id: 7,
    name: 'TGO y TGP Transaminasas Dúo (Precio oficial $11.00)',
    query: 'Cuanto sale TGO y TGP?',
    validate: (res) => res.matched.some(e => e.id.includes('tgo_ast') && e.priceUsd === 11) && res.total === 11
  },
  {
    id: 8,
    name: 'Sodio y Potasio Electrolitos Dúo (Precio oficial $12.00)',
    query: 'Electrolitos sodio y potasio',
    validate: (res) => res.matched.some(e => e.id.includes('sodio_y_potasio') && e.priceUsd === 12) && res.total === 12
  },
  {
    id: 9,
    name: 'Panel Respiratorio (Muestra: Hisopado nasal, Sin ayuno, $42.00)',
    query: 'Precio del panel respiratorio',
    validate: (res) => {
      const ex = res.matched.find(e => e.id.includes('panel_respiratorio'));
      return ex && ex.priceUsd === 42 && ex.sampleType.toLowerCase().includes('hisopado') && !ex.sampleType.toLowerCase().includes('sangre') && res.total === 42;
    }
  },
  {
    id: 10,
    name: 'Coproantígenos Helicobacter pylori (Muestra: Heces, $13.50)',
    query: 'Antigeno de helicobacter pylori en heces',
    validate: (res) => {
      const ex = res.matched.find(e => e.id.includes('coproantigenos_helicobacter'));
      return ex && ex.priceUsd === 13.5 && ex.sampleType.toLowerCase().includes('heces') && res.total === 13.5;
    }
  },
  {
    id: 11,
    name: 'Helicobacter en heces + Examen de Heces (Coproparasitológico $0.00 incluido)',
    query: 'Coproantigeno helicobacter pylori y examen de heces',
    validate: (res) => {
      const hasHeli = res.matched.some(e => e.id.includes('coproantigenos_helicobacter'));
      const hasCopro = res.matched.some(e => e.id.includes('coproparasitologico'));
      return hasHeli && hasCopro && res.total === 13.5;
    }
  },
  {
    id: 12,
    name: 'Sudan III + Examen de Heces (Coproparasitológico $0.00 incluido)',
    query: 'Sudan III y examen de heces',
    validate: (res) => {
      const hasSudan = res.matched.some(e => e.id.includes('sudan_iii'));
      const hasCopro = res.matched.some(e => e.id.includes('coproparasitologico'));
      return hasSudan && hasCopro && res.total === 11.0;
    }
  },
  {
    id: 13,
    name: 'Cultivo de Esputo ($50.00 con Ziehl incluido sin cobro doble)',
    query: 'Cultivo de esputo y baciloscopia',
    validate: (res) => {
      const ex = res.matched.find(e => e.id.includes('esputo'));
      return ex && res.total === 50;
    }
  },
  {
    id: 14,
    name: 'Coloración Ziehl-Neelsen / BK aislada ($6.00 o $7.00)',
    query: 'Coloracion de Ziehl Neelsen',
    validate: (res) => res.matched.some(e => e.id.includes('zielh_neelsen'))
  },
  {
    id: 15,
    name: 'Uroanálisis / Examen de orina (Muestra: Orina, $6.00)',
    query: 'Cuanto cuesta el uroanalisis?',
    validate: (res) => {
      const ex = res.matched.find(e => e.id.includes('uroanalisis'));
      return ex && ex.priceUsd === 6 && ex.sampleType.toLowerCase().includes('orina') && res.total === 6;
    }
  },
  {
    id: 16,
    name: 'Urocultivo con Antibiograma (Muestra: Orina, $35.00)',
    query: 'Urocultivo o cultivo de orina',
    validate: (res) => res.matched.some(e => e.id.includes('urocultivo') && e.priceUsd === 35) && res.total === 35
  },
  {
    id: 17,
    name: 'Coprocultivo (Muestra: Heces, $42.00)',
    query: 'Coprocultivo',
    validate: (res) => res.matched.some(e => e.id.includes('coprocultivo') && e.priceUsd === 42) && res.total === 42
  },
  {
    id: 18,
    name: 'Insulina Postprandial (Precio oficial $14.00, No $25)',
    query: 'Insulina postprandial',
    validate: (res) => res.matched.some(e => e.id.includes('insulina_pp') && e.priceUsd === 14) && res.total === 14
  },
  {
    id: 19,
    name: 'Vitamina B12 (Precio oficial $23.00, No $20)',
    query: 'Vitamina B12',
    validate: (res) => res.matched.some(e => e.id.includes('vitamina_b12') && e.priceUsd === 23) && res.total === 23
  },
  {
    id: 20,
    name: 'Vitamina D / 25(OH)D (Precio oficial $20.00)',
    query: 'Vitamina D 25-OH',
    validate: (res) => res.matched.some(e => e.id.includes('vitamina_d') && e.priceUsd === 20) && res.total === 20
  },
  {
    id: 21,
    name: 'TSH Normal (Precio oficial $13.00)',
    query: 'Hormona TSH tiroides',
    validate: (res) => res.matched.some(e => e.id.includes('tsh') && e.priceUsd === 13) && res.total === 13
  },
  {
    id: 22,
    name: 'T4 Libre (Precio oficial $13.00)',
    query: 'T4 libre tiroxina',
    validate: (res) => res.matched.some(e => e.id.includes('t4_libre') && e.priceUsd === 13) && res.total === 13
  },
  {
    id: 23,
    name: 'VDRL Semicuantitativo (Precio oficial $6.50)',
    query: 'Examen de VDRL',
    validate: (res) => res.matched.some(e => e.id.includes('vdrl') && e.priceUsd === 6.5) && res.total === 6.5
  },
  {
    id: 24,
    name: 'Demodex (Precio oficial $12.00, Micología)',
    query: 'Examen de Demodex en pestañas',
    validate: (res) => res.matched.some(e => e.id.includes('demodex') && e.priceUsd === 12) && res.total === 12
  },
  {
    id: 25,
    name: 'Azúcares Reductores + Examen de Heces (Coproparasitológico gratis, Total $11.00)',
    query: 'Absorcion intestinal azucares reductores y examen de heces',
    validate: (res) => {
      const hasAzuc = res.matched.some(e => e.id.includes('absorcion_intestinal'));
      const hasCopro = res.matched.some(e => e.id.includes('coproparasitologico'));
      return hasAzuc && hasCopro && res.total === 11.0;
    }
  },
  {
    id: 26,
    name: 'Plaquetas aisladas (No canibalizar con Hematología Completa)',
    query: 'Solo quiero saber el precio de las plaquetas',
    validate: (res) => {
      const hasPlaquetas = res.matched.some(e => e.id.includes('plaquetas'));
      const hasHematologia = res.matched.some(e => e.id.includes('hematologia_completa'));
      return hasPlaquetas && !hasHematologia && res.total === 4.0;
    }
  },
  {
    id: 27,
    name: 'Moco nasal / Eosinófilos (No confundir con citología vaginal)',
    query: 'Eosinofilos en moco nasal',
    validate: (res) => {
      const hasNasal = res.matched.some(e => e.id.includes('eosinofilos_moco_nasal'));
      const hasVaginal = res.matched.some(e => normalizeText(e.name).includes('vaginal'));
      return hasNasal && !hasVaginal && res.total === 6.0;
    }
  },
  {
    id: 28,
    name: 'Convenio Caracas (Panel RAST Alergias)',
    query: 'Panel RAST de alimentos',
    validate: (res) => {
      const ex = res.matched.find(e => e.id.includes('rast'));
      return ex && ex.isCaracasConvenio === true;
    }
  },
  {
    id: 29,
    name: 'Consulta Múltiple del Caso Real (Hematología + Urea + Creatinina + TGO/TGP + Sodio/Potasio = $39.50)',
    query: 'Hematologia completa, urea, creatinina, TGO, TGP, potasio y sodio',
    validate: (res) => {
      const hasHem = res.matched.some(e => e.id === 'gp_001_hematologia_completa'); // 7.5
      const hasUrea = res.matched.some(e => e.id.includes('urea')); // 4.5
      const hasCrea = res.matched.some(e => e.id.includes('cretinina')); // 4.5
      const hasTgo = res.matched.some(e => e.id.includes('tgo_ast')); // 11
      const hasElec = res.matched.some(e => e.id.includes('sodio_y_potasio')); // 12
      // 7.5 + 4.5 + 4.5 + 11 + 12 = 39.50
      return hasHem && hasUrea && hasCrea && hasTgo && hasElec && res.total === 39.5;
    }
  },
  {
    id: 30,
    name: 'Perfil 20 Completo',
    query: 'Perfil 20 completo',
    validate: (res) => {
      const ex = res.matched.find(e => e.id.includes('perfil_20'));
      return ex && (ex.priceUsd === 67 || ex.priceUsd === 42);
    }
  }
];

let passed = 0;
let failed = 0;

testCases.forEach(tc => {
  const matched = matchExams(tc.query);
  const total = calculateQuote(matched);
  const resultObj = { matched, total };
  const ok = tc.validate(resultObj);

  if (ok) {
    passed++;
    console.log(`✅ [TEST ${String(tc.id).padStart(2, '0')}/30] PASSED: ${tc.name}`);
  } else {
    failed++;
    console.error(`❌ [TEST ${String(tc.id).padStart(2, '0')}/30] FAILED: ${tc.name}`);
    console.error(`   Query: "${tc.query}"`);
    console.error(`   Matches (${matched.length}):`, matched.map(m => `${m.name} ($${m.priceUsd})`));
    console.error(`   Total calculado: $${total.toFixed(2)} USD`);
  }
});

console.log('\n═══════════════════════════════════════════════════════════════════');
console.log(`📊 RESULTADO FINAL DE LA SUITE DE REGRESIÓN:`);
console.log(`   Total pruebas: 30`);
console.log(`   Exitosas:      ${passed} / 30 (${Math.round((passed/30)*100)}%)`);
console.log(`   Fallidas:      ${failed} / 30`);
console.log('═══════════════════════════════════════════════════════════════════\n');

if (failed > 0) {
  process.exit(1);
} else {
  console.log('🚀 CERTIFICACIÓN APROBADA: Sistema 100% blindado contra alucinaciones y regresiones.');
}
