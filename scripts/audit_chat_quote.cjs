const fs = require('fs');
const path = require('path');
const exams = JSON.parse(fs.readFileSync(path.join(__dirname, '../src/data/examenes_espejo.json'), 'utf8'));

const quotedList = [
  { name: 'Hematología Completa', quotedPrice: 7.5, term: 'hematologia completa' },
  { name: 'Colesterol Total', quotedPrice: 5.0, term: 'colesterol total' },
  { name: 'HDL Colesterol', quotedPrice: 7.0, term: 'hdl colesterol' },
  { name: 'Triglicéridos', quotedPrice: 5.5, term: 'trigliceridos' },
  { name: 'Lipidograma / Perfil Lipídico', quotedPrice: 17.0, term: 'lipidograma' },
  { name: 'Glicemia en ayunas (Glicemia basal)', quotedPrice: 4.5, term: 'glicemia en ayunas' },
  { name: 'Insulina Basal (en Ayunas)', quotedPrice: 14.0, term: 'insulina basal' },
  { name: 'TGO/AST y TGP/ALT (Transaminasas)', quotedPrice: 11.0, term: 'tgo/ast' },
  { name: 'GGT (Gamma Glutamil Transferasa)', quotedPrice: 6.0, term: 'gamma glutamil transferasa' },
  { name: 'Bilirrubina Total y Fraccionada', quotedPrice: 8.5, term: 'bilirrubina' },
  { name: 'Fosfatasa Alcalina', quotedPrice: 5.0, term: 'fosfatasa alcalina' },
  { name: 'Creatinina Sérica', quotedPrice: 4.5, term: 'cretinina' },
  { name: 'Urea / BUN', quotedPrice: 4.5, term: 'urea o bun' },
  { name: 'Ácido Úrico', quotedPrice: 4.5, term: 'acido urico' },
  { name: 'TSH Ultrasensible', quotedPrice: 13.0, term: 'tsh' },
  { name: 'T4 Libre', quotedPrice: 13.0, term: 't4 libre' },
  { name: 'FSH (Hormona Folículo Estimulante)', quotedPrice: 12.0, term: 'fsh' },
  { name: 'LH (Hormona Luteinizante)', quotedPrice: 12.0, term: 'lh' },
  { name: 'Prolactina', quotedPrice: 12.0, term: 'prolactina' },
  { name: 'Estradiol (E2)', quotedPrice: 13.0, term: 'estradiol' },
  { name: 'Uroanálisis General', quotedPrice: 5.0, term: 'uroanalisis' },
  { name: 'Vitamina D (25-OH)', quotedPrice: 20.0, term: 'vitamina d' },
  { name: 'Vitamina B12 (Cobalamina)', quotedPrice: 20.0, term: 'vitamina b12' },
  { name: 'Ferritina Sérica', quotedPrice: 13.0, term: 'ferritina' }
];

console.log('=== AUDITORÍA CLÍNICA Y FINANCIERA DEL CHAT ===\n');

let discrepanciesCount = 0;
let totalQuoted = 0;
let totalOfficial = 0;

quotedList.forEach(item => {
  const normTerm = item.term.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  const match = exams.find(e => {
    const eName = e.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    if (eName.includes(normTerm)) return true;
    return e.synonyms.some(s => s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').includes(normTerm));
  });

  if (!match) {
    console.log(`❌ NO ENCONTRADO EN BASE DE DATOS: ${item.name}`);
    discrepanciesCount++;
    return;
  }

  const isPriceMatch = (match.priceUsd === item.quotedPrice);
  totalQuoted += item.quotedPrice;
  totalOfficial += match.priceUsd;

  if (isPriceMatch) {
    console.log(`✅ [CORRECTO] ${item.name}`);
    console.log(`   • Nombre BD: ${match.name}`);
    console.log(`   • Precio: $${match.priceUsd} USD (Coincide)`);
  } else {
    console.log(`🚨 [DISCREPANCIA DE PRECIO] ${item.name}`);
    console.log(`   • Nombre BD: ${match.name}`);
    console.log(`   • Cotizado en chat: $${item.quotedPrice} USD  vs  OFICIAL EN BD: $${match.priceUsd} USD`);
    discrepanciesCount++;
  }
  console.log(`   • Ayuno Oficial BD: ${match.fastingHours}`);
  console.log(`   • Muestra Oficial BD: ${match.sampleType}`);
  console.log(`   • Notas Clínicas: ${match.notes}`);
  console.log('--------------------------------------------------');
});

console.log(`\nRESUMEN DE AUDITORÍA:`);
console.log(`• Total Exámenes evaluados: ${quotedList.length}`);
console.log(`• Discrepancias encontradas: ${discrepanciesCount}`);
console.log(`• Total cotizado en el chat (sumando items): $${totalQuoted.toFixed(2)} USD`);
console.log(`• Total OFICIAL según Tarifario Septiembre 2026: $${totalOfficial.toFixed(2)} USD`);
