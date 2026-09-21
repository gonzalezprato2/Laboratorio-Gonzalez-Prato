const fs = require('fs');
const path = require('path');
const INITIAL_EXAMS = JSON.parse(fs.readFileSync(path.join(__dirname, '../src/data/examenes_espejo.json'), 'utf8'));

console.log('=== VERIFICACIÓN DEL CATÁLOGO MAESTRO DE EXÁMENES ===\n');

// 1. Total count
console.log(`1. Total de exámenes cargados: ${INITIAL_EXAMS.length} (Esperado: 187)`);
if (INITIAL_EXAMS.length !== 187) {
  console.error('❌ ERROR: Cantidad de exámenes no coincide con los 187 oficiales.');
  process.exit(1);
} else {
  console.log('✅ Cantidad exacta verificada.');
}

// 2. Uniqueness of IDs
const idSet = new Set();
const duplicates = [];
INITIAL_EXAMS.forEach(e => {
  if (idSet.has(e.id)) duplicates.push(e.id);
  idSet.add(e.id);
});

if (duplicates.length > 0) {
  console.error('❌ ERROR: IDs duplicados encontrados:', duplicates);
  process.exit(1);
} else {
  console.log('✅ Todos los 187 IDs son únicos.');
}

// 3. Price validation
const invalidPrices = INITIAL_EXAMS.filter(e => typeof e.priceUsd !== 'number' || e.priceUsd <= 0 || isNaN(e.priceUsd));
if (invalidPrices.length > 0) {
  console.error('❌ ERROR: Exámenes con precios inválidos:', invalidPrices);
  process.exit(1);
} else {
  console.log('✅ Todos los precios en USD son válidos y mayores a cero.');
}

// 4. Preanalytical requirements validation
const missingPreanalytics = INITIAL_EXAMS.filter(e => !e.fastingHours || !e.sampleType || !e.category);
if (missingPreanalytics.length > 0) {
  console.error('❌ ERROR: Exámenes con datos preanalíticos faltantes:', missingPreanalytics);
  process.exit(1);
} else {
  console.log('✅ Requisitos de ayuno, tipo de muestra y categoría completos en el 100% de los exámenes.');
}

// 5. Category breakdown
const categoryCounts = {};
INITIAL_EXAMS.forEach(e => {
  categoryCounts[e.category] = (categoryCounts[e.category] || 0) + 1;
});
console.log('\n--- DESGLOSE POR CATEGORÍA CLÍNICA ---');
Object.entries(categoryCounts).forEach(([cat, count]) => {
  console.log(`• ${cat}: ${count} exámenes`);
});

// 6. Convenience Caracas and Previa Cita checks
const caracasCount = INITIAL_EXAMS.filter(e => e.isCaracasConvenio).length;
console.log(`\n• Pruebas Convenio Torre Caracas: ${caracasCount}`);

console.log('\n✅ ¡TODAS LAS VERIFICACIONES DEL CATÁLOGO PASARON SATISFACTORIAMENTE!');
