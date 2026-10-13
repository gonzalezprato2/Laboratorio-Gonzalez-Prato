/**
 * SUITE DE CERTIFICACIÓN DE GUARDARRAÍLES CLÍNICOS Y CONTABLES
 * GONZALEZ-PRATO Laboratorio Clínico
 * 
 * Este script evalúa DIRECTAMENTE el código de producción que se ejecuta en n8n
 * (nodo 'Parsear Mensaje Evolution API') para garantizar que ninguna corrección
 * clínica, de precios o preanalítica sufra regresión con el tiempo.
 */

const fs = require('fs');
const path = require('path');

const wfPath = path.join(__dirname, '../agents/n8n/gonzalez_prato_evolution_api_workflow.json');
const wf = JSON.parse(fs.readFileSync(wfPath, 'utf8'));
const parserNode = wf.nodes.find(n => n.name === 'Parsear Mensaje Evolution API');

if (!parserNode) {
  console.error('❌ Error: No se encontró el nodo "Parsear Mensaje Evolution API" en el workflow de producción.');
  process.exit(1);
}

const rawParserCode = parserNode.parameters.jsCode;
const AsyncFunction = Object.getPrototypeOf(async function(){}).constructor;

async function executeProductionParser(query, mockHttp) {
  const httpImpl = mockHttp ? mockHttp.toString() : 'async () => []';
  const wrappedCode = `
    const $input = {
      first: () => ({
        json: {
          body: {
            data: {
              key: { remoteJid: '584120000000@s.whatsapp.net', fromMe: false },
              pushName: 'Paciente',
              message: { conversation: ${JSON.stringify(query)} }
            }
          }
        }
      })
    };
    const $httpRequest = ${httpImpl};
    ${rawParserCode}
  `;
  const fn = new AsyncFunction(wrappedCode);
  const result = await fn();
  return result[0].json;
}

const TEST_CASES = [
  // ─── 1. CASOS CRÍTICOS RECIENTES (HISTORIAL CEO) ───────────────────
  {
    id: 1,
    name: 'ASLO predeterminado (Cotizar Cuantitativo $15.00 USD por defecto)',
    query: 'Cuanto cuesta el examen de aslo?',
    assert: (res) => {
      return res.hasMatchedExams &&
        res.calculatedTotalUsd === 15.0 &&
        res.matchedExamsSummary.includes('ASLO cuantitativo') &&
        !res.matchedExamsSummary.includes('ASLO semicuantitativo');
    }
  },
  {
    id: 2,
    name: 'ASLO Semicuantitativo explícito ($7.50 USD)',
    query: 'Precio de ASLO semicuantitativo',
    assert: (res) => {
      return res.hasMatchedExams &&
        res.calculatedTotalUsd === 7.5 &&
        res.matchedExamsSummary.includes('1. ASLO semicuantitativo') &&
        !res.matchedExamsSummary.includes('1. ASLO cuantitativo');
    }
  },
  {
    id: 3,
    name: 'Gases Venosos (Requisitos: 1h postprandial/reposo, Horario: 7:00 AM a 11:30 AM, $68.00 USD)',
    query: 'Requisitos y precio de gases venosos',
    assert: (res) => {
      return res.hasMatchedExams &&
        res.calculatedTotalUsd === 68.0 &&
        res.matchedExamsSummary.includes('Gases venosos') &&
        res.matchedExamsSummary.includes('1 hora postprandial') &&
        res.matchedExamsSummary.includes('11:30 AM');
    }
  },
  {
    id: 4,
    name: 'Gases Arteriales (Requisitos: 1h postprandial/reposo, Horario: 7:00 AM a 11:30 AM, $68.00 USD)',
    query: 'Gases arteriales',
    assert: (res) => {
      return res.hasMatchedExams &&
        res.calculatedTotalUsd === 68.0 &&
        res.matchedExamsSummary.includes('Gases arteriales') &&
        res.matchedExamsSummary.includes('11:30 AM');
    }
  },
  {
    id: 5,
    name: 'Combo Testosterona: Total y Libre juntas ($24.00 USD total, Total $0.00 incluida)',
    query: 'Precio de testosterona total y libre',
    assert: (res) => {
      return res.hasMatchedExams &&
        res.calculatedTotalUsd === 24.0 &&
        res.matchedExamsSummary.includes('Testosterona Total') &&
        res.matchedExamsSummary.includes('Testosterona libre') &&
        res.matchedExamsSummary.includes('$0.00 USD (¡INCLUIDA / PROCESADA CONJUNTAMENTE');
    }
  },
  {
    id: 6,
    name: 'Combo Testosterona: Inversión de orden (Libre y Total juntas = $24.00 USD)',
    query: 'testosterona libre y testosterona total',
    assert: (res) => {
      return res.hasMatchedExams &&
        res.calculatedTotalUsd === 24.0 &&
        res.matchedExamsSummary.includes('$0.00 USD (¡INCLUIDA / PROCESADA CONJUNTAMENTE');
    }
  },
  {
    id: 7,
    name: 'Testosterona Total aislada ($12.00 USD)',
    query: 'testosterona total sola',
    assert: (res) => {
      return res.hasMatchedExams &&
        res.calculatedTotalUsd === 12.0 &&
        res.matchedExamsSummary.includes('Testosterona Total') &&
        !res.matchedExamsSummary.includes('Testosterona libre');
    }
  },
  {
    id: 8,
    name: 'Testosterona Libre aislada ($24.00 USD)',
    query: 'cuanto sale la testosterona libre',
    assert: (res) => {
      return res.hasMatchedExams &&
        res.calculatedTotalUsd === 24.0 &&
        res.matchedExamsSummary.includes('Testosterona libre');
    }
  },
  {
    id: 9,
    name: 'Calprotectina + Heces (Coproparasitológico incluido $0.00, Total $26.00 USD)',
    query: 'calprotectina y heces',
    assert: (res) => {
      return res.hasMatchedExams &&
        res.calculatedTotalUsd === 26.0 &&
        res.matchedExamsSummary.includes('Calprotectina semicuantitativa') &&
        res.matchedExamsSummary.includes('Coproparasitológico') &&
        res.matchedExamsSummary.includes('$0.00 USD (¡INCLUIDO SIN COSTO');
    }
  },
  {
    id: 10,
    name: 'Calprotectina + Examen de heces explícito (Total $26.00 USD)',
    query: 'calprotectina y examen de heces',
    assert: (res) => {
      return res.hasMatchedExams &&
        res.calculatedTotalUsd === 26.0 &&
        res.matchedExamsSummary.includes('$0.00 USD (¡INCLUIDO SIN COSTO');
    }
  },

  // ─── 2. CASOS CRÍTICOS PREVIOS BLINDADOS ───────────────────────────
  {
    id: 11,
    name: 'Coproantígenos Helicobacter + Examen de Heces (Total $13.50 USD)',
    query: 'antigeno de helicobacter en heces y examen de heces',
    assert: (res) => {
      return res.hasMatchedExams &&
        res.calculatedTotalUsd === 13.5 &&
        res.matchedExamsSummary.includes('$0.00 USD (¡INCLUIDO SIN COSTO');
    }
  },
  {
    id: 12,
    name: 'Cultivo de Esputo (Ya incluye Ziehl-Neelsen/BK, $50.00 USD sin cargo extra)',
    query: 'cultivo de esputo y baciloscopia',
    assert: (res) => {
      return res.hasMatchedExams &&
        res.calculatedTotalUsd === 50.0 &&
        res.matchedExamsSummary.includes('Cultivo microbiológico de esputo (incluye coloración de Ziehl-Neelsen');
    }
  },
  {
    id: 13,
    name: 'Plaquetas aisladas (No canibalizar con Hematología Completa, $4.00 USD)',
    query: 'cuanto salen las plaquetas',
    assert: (res) => {
      return res.hasMatchedExams &&
        res.calculatedTotalUsd === 4.0 &&
        res.matchedExamsSummary.includes('Plaquetas') &&
        !res.matchedExamsSummary.includes('Hematología completa');
    }
  },
  {
    id: 14,
    name: 'Hematología Completa explícita ($7.50 USD)',
    query: 'hematologia completa y hemograma',
    assert: (res) => {
      return res.hasMatchedExams &&
        res.calculatedTotalUsd === 7.5 &&
        res.matchedExamsSummary.includes('Hematología completa');
    }
  },
  {
    id: 15,
    name: 'Panel Respiratorio (Muestra: Hisopado nasal, $42.00 USD, NO sangre)',
    query: 'panel respiratorio viral',
    assert: (res) => {
      return res.hasMatchedExams &&
        res.calculatedTotalUsd === 42.0 &&
        res.matchedExamsSummary.includes('Hisopado nasal') &&
        !res.matchedExamsSummary.includes('Muestra de sangre');
    }
  },
  {
    id: 16,
    name: 'Uroanálisis simple ($6.00 USD, Muestra: Orina, NO sangre)',
    query: 'examen de orina o uroanalisis',
    assert: (res) => {
      return res.hasMatchedExams &&
        res.calculatedTotalUsd === 6.0 &&
        res.matchedExamsSummary.includes('Muestra de orina') &&
        !res.matchedExamsSummary.includes('Muestra de sangre');
    }
  },
  {
    id: 17,
    name: 'Perfil 20 Completo ($67.00 USD)',
    query: 'precio de perfil 20 completo',
    assert: (res) => {
      return res.hasMatchedExams &&
        res.calculatedTotalUsd === 67.0 &&
        res.matchedExamsSummary.includes('Perfil 20');
    }
  },
  {
    id: 18,
    name: 'Vitamina B12 ($23.00 USD oficial, no $20)',
    query: 'precio vitamina b12',
    assert: (res) => {
      return res.hasMatchedExams &&
        res.calculatedTotalUsd === 23.0;
    }
  },
  {
    id: 19,
    name: 'Insulina Postprandial ($14.00 USD oficial, no $25)',
    query: 'insulina postprandial pp',
    assert: (res) => {
      return res.hasMatchedExams &&
        res.calculatedTotalUsd === 14.0;
    }
  },
  {
    id: 20,
    name: 'Anti-Canibalización: Moco nasal vs Citología vaginal ($6.00 USD)',
    query: 'eosinofilos en moco nasal',
    assert: (res) => {
      return res.hasMatchedExams &&
        res.calculatedTotalUsd === 6.0 &&
        !res.matchedExamsSummary.includes('vaginal');
    }
  },

  // ─── 3. SINCRONIZACIÓN EN VIVO DESDE SUPABASE & RESILIENCIA ───────
  {
    id: 21,
    name: 'Sincronización en Vivo Supabase: Precio actualizado en Dashboard (ASLO actualizado a $18.50 USD)',
    query: 'Cuanto cuesta el examen de aslo?',
    mockHttp: async (opts) => {
      if (opts.url && opts.url.includes('/examenes')) {
        return [{ nombre_examen: 'ASLO cuantitativo o titulos de antiestreptolisina O cuantitativos o ASO cuantitativo', costo_usd: 18.5, activo: true }];
      }
      return [];
    },
    assert: (res) => {
      return res.hasMatchedExams &&
        res.calculatedTotalUsd === 18.5 &&
        res.matchedExamsSummary.includes('$18.50 USD') &&
        res.matchedExamsSummary.includes('ASLO cuantitativo');
    }
  },
  {
    id: 22,
    name: 'Tolerancia a Fallos: Supabase con error de red / timeout (Respaldo ininterrumpido en memoria a $15.00 USD)',
    query: 'Cuanto cuesta el examen de aslo?',
    mockHttp: async () => {
      throw new Error('Supabase network timeout 504 Gateway');
    },
    assert: (res) => {
      return res.hasMatchedExams &&
        res.calculatedTotalUsd === 15.0 &&
        res.matchedExamsSummary.includes('$15.00 USD') &&
        res.matchedExamsSummary.includes('ASLO cuantitativo');
    }
  }
];

async function runSuite() {
  console.log('═══════════════════════════════════════════════════════════════════════════');
  console.log('🛡️  SUITE DE GUARDARRAÍLES CLÍNICOS & CONTABLES (PRODUCCIÓN n8n)');
  console.log('    GONZALEZ-PRATO Laboratorio — Verificación de Pre-Retrieval Congelado');
  console.log('═══════════════════════════════════════════════════════════════════════════\n');

  let passed = 0;
  let failed = 0;

  for (const tc of TEST_CASES) {
    try {
      const res = await executeProductionParser(tc.query, tc.mockHttp);
      const ok = tc.assert(res);

      if (ok) {
        passed++;
        console.log(`✅ [PASS ${String(tc.id).padStart(2, '0')}/${TEST_CASES.length}] ${tc.name}`);
      } else {
        failed++;
        console.error(`❌ [FAIL ${String(tc.id).padStart(2, '0')}/${TEST_CASES.length}] ${tc.name}`);
        console.error(`   Consulta del paciente: "${tc.query}"`);
        console.error(`   Total calculado: $${res.calculatedTotalUsd} USD`);
        console.error(`   Resumen emitido:`);
        console.error(res.matchedExamsSummary.split('\n').map(l => '      ' + l).join('\n'));
      }
    } catch (err) {
      failed++;
      console.error(`💥 [ERROR ${String(tc.id).padStart(2, '0')}/${TEST_CASES.length}] ${tc.name}:`, err.message);
    }
  }

  console.log('\n═══════════════════════════════════════════════════════════════════════════');
  console.log('📊 RESULTADO DE LA CERTIFICACIÓN:');
  console.log(`   Total de pruebas críticas: ${TEST_CASES.length}`);
  console.log(`   Pruebas aprobadas:        ${passed} / ${TEST_CASES.length} (${Math.round((passed / TEST_CASES.length) * 100)}%)`);
  console.log(`   Pruebas fallidas:         ${failed} / ${TEST_CASES.length}`);
  console.log('═══════════════════════════════════════════════════════════════════════════\n');

  if (failed > 0) {
    console.error('⛔ ALERTA: Se detectaron fallas en las reglas clínicas de producción.');
    process.exit(1);
  } else {
    console.log('🎉 SISTEMA BLINDADO: El workflow de producción en n8n cumple al 100% las directrices.');
    process.exit(0);
  }
}

runSuite();
