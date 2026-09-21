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

const testQueries = [
  'Hola, quiero saber el precio de una hematologia completa',
  'Buenas tardes, necesito hacerme glicemia en ayunas y perfil lipidico',
  'Cuanto sale el urocultivo con antibiograma?',
  'Tienen examen de demodex?',
  'Cuanto cuesta el VDRL y el examen de VIH?',
  'Quisiera saber el costo de TSH y T4 libre',
  'Hacen coprocultivo y examen de orina?',
  'Costo de vitamina D y vitamina B12'
];

testQueries.forEach((q, idx) => {
  const matches = findMatchingExams(q);
  const totalUsd = matches.reduce((acc, curr) => acc + curr.priceUsd, 0);
  console.log(`\n[Consulta ${idx + 1}]: "${q}"`);
  console.log(`-> Coincidencias encontradas (${matches.length}):`);
  matches.forEach(m => console.log(`   • ${m.name} | $${m.priceUsd} USD | Ayuno: ${m.fastingHours}`));
  console.log(`   TOTAL: $${totalUsd.toFixed(2)} USD`);
});

console.log('\n✅ Prueba de simulación clínica ejecutada con éxito.');
