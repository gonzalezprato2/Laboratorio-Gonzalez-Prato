const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

const exams = JSON.parse(fs.readFileSync(path.join(__dirname, '../src/data/examenes_espejo.json'), 'utf8'));
const SUPABASE_URL = 'https://petcqaixzetwsduscvtx.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBldGNxYWl4emV0d3NkdXNjdnR4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODk1OTAxNjMsImV4cCI6MjEwNTE2NjE2M30.4vDNJ3nBMi0TQg71KZUpyJdcBWr5zyTDKR92xA4obgM';

const client = createClient(SUPABASE_URL, SUPABASE_KEY);

async function sync() {
  console.log('=== SINCRONIZANDO SUPABASE CON CATÁLOGO MAESTRO (187 EXÁMENES) ===\n');
  
  // 1. Limpiar base de datos
  console.log('1. Purgando registros obsoletos...');
  const { error: delError } = await client.from('examenes').delete().neq('categoria', 'NON_EXISTENT_PURGE');
  if (delError) {
    console.error('Error al purgar tabla examenes:', delError);
    return;
  }
  console.log('✅ Purgado completado.');

  // 2. Insertar registros
  console.log('\n2. Insertando los 187 registros oficiales...');
  const records = exams.map(e => ({
    categoria: e.category,
    nombre_examen: e.name,
    sinonimos: e.synonyms,
    costo_usd: e.priceUsd,
    requisitos_preanaliticos: e.fastingHours,
    tipo_muestra: e.sampleType,
    tiempo_entrega: e.turnaround,
    activo: e.active,
    notas: e.notes || null,
    updated_at: new Date().toISOString()
  }));

  const CHUNK_SIZE = 50;
  for (let i = 0; i < records.length; i += CHUNK_SIZE) {
    const chunk = records.slice(i, i + CHUNK_SIZE);
    const { error: insError } = await client.from('examenes').insert(chunk);
    if (insError) {
      console.error(`Error insertando lote ${i}-${i + chunk.length}:`, insError);
    }
  }

  // 3. Verificación final
  const { data: countData } = await client.from('examenes').select('id, nombre_examen');
  console.log(`\n✅ Total de exámenes activos en Supabase: ${countData ? countData.length : 0} (Esperado: 187)`);
}

sync().catch(console.error);
