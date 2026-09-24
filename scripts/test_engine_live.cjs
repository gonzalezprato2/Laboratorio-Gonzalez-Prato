const fs = require('fs');
const path = require('path');

// Read master data
const exams = JSON.parse(fs.readFileSync(path.join(__dirname, '../src/data/examenes_espejo.json'), 'utf8'));

console.log(`=== TEST CLÍNICO DEL MOTOR CON ${exams.length} EXÁMENES ===\n`);

// Quick simulation function matching clinicalAiEngine logic
function normalizeText(text) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();
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

function findMatchingExams(query) {
  const normQuery = normalizeText(query);
  const matched = [];
  const matchedIds = new Set();

  for (const exam of exams) {
    if (matchedIds.has(exam.id)) continue;
    const normName = normalizeText(exam.name);
    
    // Exact name match or word match
    if (normQuery.includes(normName) || isWordMatch(normQuery, normName)) {
      matched.push(exam);
      matchedIds.add(exam.id);
      continue;
    }

    // Synonyms match
    for (const syn of exam.synonyms) {
      const normSyn = normalizeText(syn);
      if (normSyn.length > 2 && isWordMatch(normQuery, normSyn)) {
        matched.push(exam);
        matchedIds.add(exam.id);
        break;
      }
    }
  }

  return matched;
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

const testQueries = [
  'Hola, quiero saber el precio de una hematologia completa',
  'Buenas tardes, necesito hacerme glicemia en ayunas y perfil lipidico',
  'Cuanto sale el urocultivo con antibiograma?',
  'Tienen examen de demodex?',
  'Cuanto cuesta el VDRL y el examen de VIH?',
  'Quisiera saber el costo de TSH y T4 libre',
  'Hacen coprocultivo y examen de orina?',
  'Costo de vitamina D y vitamina B12',
  'Precio de Coproantígenos Helicobacter pylori y examen de heces',
  'Cuánto cuesta el examen de heces y sudan iii?'
];

testQueries.forEach((q, idx) => {
  const matches = findMatchingExams(q);
  const hasSpecial = matches.some(e => SPECIAL_FECAL_IDS.includes(e.id));
  const isCopro = (e) => e.id === 'gp_135_coproparasitologico_o_examen_de_hec';
  const totalUsd = matches.reduce((acc, curr) => (hasSpecial && isCopro(curr)) ? acc : acc + curr.priceUsd, 0);
  console.log(`\n[Consulta ${idx + 1}]: "${q}"`);
  console.log(`-> Coincidencias encontradas (${matches.length}):`);
  matches.forEach(m => {
    const isFree = hasSpecial && isCopro(m);
    console.log(`   • ${m.name} | ${isFree ? '$0.00 USD (INCLUIDO)' : '$' + m.priceUsd + ' USD'} | Ayuno: ${m.fastingHours}`);
  });
  console.log(`   TOTAL: $${totalUsd.toFixed(2)} USD`);
});

console.log('\n✅ Prueba de simulación clínica ejecutada con éxito.');
