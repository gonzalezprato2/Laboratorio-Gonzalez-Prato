import { LabExam } from '../types/lab';

export const INITIAL_EXAMS: LabExam[] = [
  {
    "id": "hem-1",
    "category": "Hematología",
    "name": "Hematología Completa",
    "synonyms": [
      "hemograma",
      "recuento globular",
      "formula leucocitaria",
      "perfil hematologico",
      "cuadro hematico",
      "biometria hematica",
      "hematologia"
    ],
    "priceUsd": 7.5,
    "fastingHours": "Ayuno ideal (en emergencias en cualquier momento)",
    "sampleType": "Sangre total (Tubo EDTA Tapa Morada)",
    "turnaround": "4 horas",
    "active": true,
    "notes": "No realizar ejercicio físico intenso 24h antes. Evitar alcohol y tabaco. Notificar medicamentos anticoagulantes o hematológicos."
  },
  {
    "id": "hem-2",
    "category": "Hematología",
    "name": "Contaje de Plaquetas",
    "synonyms": [
      "plaquetas",
      "contaje de plaquetas",
      "recuento de plaquetas",
      "recuento plaquetario",
      "plaquetas aisladas",
      "trombocitos",
      "contaje manual de plaquetas"
    ],
    "priceUsd": 4,
    "fastingHours": "Ayuno ligero de 4 horas",
    "sampleType": "Sangre total (Tubo EDTA)",
    "turnaround": "4 horas",
    "active": true,
    "notes": "Contaje manual microscópico directo de plaquetas. Indicar antiagregantes plaquetarios (Aspirina, Clopidogrel)."
  },
  {
    "id": "hem-3",
    "category": "Hematología",
    "name": "Velocidad de Sedimentación Globular (VSG)",
    "synonyms": [
      "vsg",
      "sedimentacion",
      "velocidad de sedimentacion globular",
      "velocidad de sedimentacion"
    ],
    "priceUsd": 4,
    "fastingHours": "4 horas de ayuno",
    "sampleType": "Sangre total con citrato o EDTA",
    "turnaround": "4 horas",
    "active": true,
    "notes": "Informar procesos febriles, inflamatorios, infecciosos o embarazo."
  },
  {
    "id": "hem-4",
    "category": "Hematología",
    "name": "Frotis de Sangre Periférica",
    "synonyms": [
      "frotis",
      "morfologia sanguinea",
      "lamina periferica",
      "frotis de sangre periferica"
    ],
    "priceUsd": 6,
    "fastingHours": "Sin condiciones especiales",
    "sampleType": "Sangre capilar o EDTA",
    "turnaround": "24 horas",
    "active": true,
    "notes": "Evaluación citomorfológica directa en lámina."
  },
  {
    "id": "hem-5",
    "category": "Hematología",
    "name": "Grupo Sanguíneo y Factor Rh",
    "synonyms": [
      "tipiaje",
      "grupo sanguineo",
      "factor rh",
      "tipo de sangre",
      "rh",
      "grupo sanguineo / factor rh"
    ],
    "priceUsd": 6,
    "fastingHours": "Sin ayuno estricto",
    "sampleType": "Sangre total EDTA o tubo seco",
    "turnaround": "2 a 4 horas",
    "active": true,
    "notes": "Determinación de grupo sanguíneo ABO y antígeno Rho(D)."
  },
  {
    "id": "hem-6",
    "category": "Hematología",
    "name": "Tiempo de Protrombina (TP) e INR",
    "synonyms": [
      "tp",
      "inr",
      "tiempo de protrombina",
      "tiempo de protrombina (tp) e inr"
    ],
    "priceUsd": 7,
    "fastingHours": "4 horas de ayuno",
    "sampleType": "Plasma citratado (Tubo Tapa Azul)",
    "turnaround": "4 horas",
    "active": true,
    "notes": "Monitoreo de anticoagulación oral (Warfarina). Indicar hora exacta de última dosis tomada."
  },
  {
    "id": "hem-7",
    "category": "Hematología",
    "name": "Tiempo de Tromboplastina Parcial (TPT)",
    "synonyms": [
      "tpt",
      "tiempo de tromboplastina",
      "tiempo parcial de tromboplastina",
      "tiempo de tromboplastina (tpt)"
    ],
    "priceUsd": 7,
    "fastingHours": "4 horas de ayuno",
    "sampleType": "Plasma citratado (Tubo Tapa Azul)",
    "turnaround": "4 horas",
    "active": true,
    "notes": "Evaluación de coagulación por vía intrínseca y monitoreo de Heparina."
  },
  {
    "id": "hem-8",
    "category": "Hematología",
    "name": "Eosinófilos en Moco Nasal",
    "synonyms": [
      "eosinofilos moco nasal",
      "eosinofilos en moco nasal",
      "citologia nasal"
    ],
    "priceUsd": 6,
    "fastingHours": "Sin lavado nasal previo",
    "sampleType": "Hisopado / impronta de mucosa nasal",
    "turnaround": "24 horas",
    "active": true,
    "notes": "Suspender gotas nasales y descongestionantes 24h antes."
  },
  {
    "id": "qui-1",
    "category": "Química Sanguínea",
    "name": "Glicemia en Ayunas / Basal",
    "synonyms": [
      "glicemia",
      "glucosa",
      "glicemia en ayunas",
      "glucosa en ayunas",
      "glicemia basal"
    ],
    "priceUsd": 4.5,
    "fastingHours": "Ayuno de 8 a 12 horas",
    "sampleType": "Suero / Fluoruro",
    "turnaround": "4 horas",
    "active": true,
    "notes": "Cena ligera previa sin exceso de carbohidratos simples."
  },
  {
    "id": "qui-2",
    "category": "Química Sanguínea",
    "name": "Glicemia Postprandial (PP)",
    "synonyms": [
      "glicemia postprandial",
      "glicemia pp",
      "glucosa postprandial",
      "glucosa pp"
    ],
    "priceUsd": 4.5,
    "fastingHours": "Extracción exacta a las 2 horas de iniciar el desayuno/almuerzo",
    "sampleType": "Suero",
    "turnaround": "4 horas",
    "active": true,
    "notes": "Comida habitual indicada por médico. Reposo físico estricto durante las 2 horas."
  },
  {
    "id": "qui-3",
    "category": "Química Sanguínea",
    "name": "Glicemia Postcarga",
    "synonyms": [
      "glicemia postcarga",
      "glucosa postcarga"
    ],
    "priceUsd": 4.5,
    "fastingHours": "Ayuno previo + ingesta de solución glucosada controlada",
    "sampleType": "Suero",
    "turnaround": "4 horas",
    "active": true,
    "notes": "Permanecer en reposo en la sala de espera sin comer ni fumar."
  },
  {
    "id": "qui-4",
    "category": "Química Sanguínea",
    "name": "Carga Glucosada (Prueba de Tolerancia a la Glucosa)",
    "synonyms": [
      "carga glucosada",
      "tolerancia a la glucosa",
      "ptgo",
      "curva de tolerancia a la glucosa"
    ],
    "priceUsd": 11,
    "fastingHours": "Ayuno estricto de 10 a 12 horas",
    "sampleType": "Suero seriado",
    "turnaround": "6 horas",
    "active": true,
    "notes": "Incluye toma basal e ingesta de 75g de glucosa anhidra con tomas pautadas."
  },
  {
    "id": "qui-5",
    "category": "Química Sanguínea",
    "name": "Urea / BUN",
    "synonyms": [
      "urea",
      "bun",
      "nitrogeno ureico",
      "urea o bun"
    ],
    "priceUsd": 4.5,
    "fastingHours": "Ayuno de 8 horas",
    "sampleType": "Suero",
    "turnaround": "4 horas",
    "active": true,
    "notes": "Evaluación del metabolismo proteico y función renal."
  },
  {
    "id": "qui-6",
    "category": "Química Sanguínea",
    "name": "Creatinina Sérica",
    "synonyms": [
      "creatinina",
      "creatinina serica"
    ],
    "priceUsd": 4.5,
    "fastingHours": "Ayuno de 8 horas",
    "sampleType": "Suero",
    "turnaround": "4 horas",
    "active": true,
    "notes": "Evitar ingesta masiva de carnes rojas y suplementos de creatina 24h antes."
  },
  {
    "id": "qui-7",
    "category": "Química Sanguínea",
    "name": "Ácido Úrico",
    "synonyms": [
      "acido urico",
      "uratos"
    ],
    "priceUsd": 4.5,
    "fastingHours": "Ayuno de 8 horas",
    "sampleType": "Suero",
    "turnaround": "4 horas",
    "active": true,
    "notes": "Evitar alcohol, mariscos y vísceras el día previo."
  },
  {
    "id": "qui-8",
    "category": "Química Sanguínea",
    "name": "Lipidograma / Perfil Lipídico Completo",
    "synonyms": [
      "lipidograma",
      "perfil lipidico",
      "colesterol total y fraccionado",
      "perfil de lipidos"
    ],
    "priceUsd": 17,
    "fastingHours": "Ayuno estricto de 12 a 14 horas",
    "sampleType": "Suero",
    "turnaround": "4 horas",
    "active": true,
    "notes": "Incluye Colesterol Total, HDL, LDL, VLDL y Triglicéridos. Sin alcohol 48h antes."
  },
  {
    "id": "qui-9",
    "category": "Química Sanguínea",
    "name": "Colesterol Total",
    "synonyms": [
      "colesterol",
      "colesterol total"
    ],
    "priceUsd": 5,
    "fastingHours": "Ayuno de 12 horas",
    "sampleType": "Suero",
    "turnaround": "4 horas",
    "active": true,
    "notes": "Determinación cuantitativa de colesterol sérico total."
  },
  {
    "id": "qui-10",
    "category": "Química Sanguínea",
    "name": "HDL Colesterol",
    "synonyms": [
      "hdl",
      "hdl colesterol",
      "colesterol bueno",
      "colesterol hdl"
    ],
    "priceUsd": 7,
    "fastingHours": "Ayuno de 12 horas",
    "sampleType": "Suero",
    "turnaround": "4 horas",
    "active": true,
    "notes": "Lipoproteína de alta densidad con efecto protector cardiovascular."
  },
  {
    "id": "qui-11",
    "category": "Química Sanguínea",
    "name": "Triglicéridos",
    "synonyms": [
      "trigliceridos",
      "trigliceridos sericos"
    ],
    "priceUsd": 5.5,
    "fastingHours": "Ayuno estricto de 12 a 14 horas",
    "sampleType": "Suero",
    "turnaround": "4 horas",
    "active": true,
    "notes": "Evitar alcohol y comidas grasas la noche anterior."
  },
  {
    "id": "qui-12",
    "category": "Química Sanguínea",
    "name": "Transaminasas TGO (AST) y TGP (ALT)",
    "synonyms": [
      "transaminasas",
      "tgo y tgp",
      "tgo/ast y tgp/alt",
      "tgo",
      "tgp",
      "ast",
      "alt",
      "transaminasas glutamico oxalacetica y piruvica"
    ],
    "priceUsd": 11,
    "fastingHours": "Ayuno de 8 horas",
    "sampleType": "Suero",
    "turnaround": "4 horas",
    "active": true,
    "notes": "Evaluación enzimática de daño hepatocelular y muscular."
  },
  {
    "id": "qui-13",
    "category": "Química Sanguínea",
    "name": "Fósforo Sérico",
    "synonyms": [
      "fosforo",
      "fosforo serico",
      "fosfatemia"
    ],
    "priceUsd": 5.5,
    "fastingHours": "Ayuno de 8 horas",
    "sampleType": "Suero",
    "turnaround": "4 horas",
    "active": true,
    "notes": "Evaluación del metabolismo fosfocálcico y función renal."
  },
  {
    "id": "qui-14",
    "category": "Química Sanguínea",
    "name": "Calcio Sérico",
    "synonyms": [
      "calcio",
      "calcio serico",
      "calcemia"
    ],
    "priceUsd": 5.5,
    "fastingHours": "Ayuno de 8 horas",
    "sampleType": "Suero",
    "turnaround": "4 horas",
    "active": true,
    "notes": "Determinación de calcio total en sangre."
  },
  {
    "id": "qui-15",
    "category": "Química Sanguínea",
    "name": "Magnesio Sérico",
    "synonyms": [
      "magnesio",
      "magnesio serico",
      "magnesemia"
    ],
    "priceUsd": 6,
    "fastingHours": "Ayuno de 8 horas",
    "sampleType": "Suero",
    "turnaround": "4 horas",
    "active": true,
    "notes": "Electrolito intracelular clave en excitabilidad neuromuscular."
  },
  {
    "id": "qui-16",
    "category": "Química Sanguínea",
    "name": "Cloro Sérico (Cloruro)",
    "synonyms": [
      "cloro",
      "cloro serico",
      "cloruro"
    ],
    "priceUsd": 5.5,
    "fastingHours": "Ayuno de 8 horas",
    "sampleType": "Suero",
    "turnaround": "4 horas",
    "active": true,
    "notes": "Balance hidroelectrolítico y equilibrio ácido-base."
  },
  {
    "id": "qui-17",
    "category": "Química Sanguínea",
    "name": "Fosfatasa Alcalina",
    "synonyms": [
      "fosfatasa alcalina",
      "alkp",
      "fa"
    ],
    "priceUsd": 5,
    "fastingHours": "Ayuno de 8 horas",
    "sampleType": "Suero",
    "turnaround": "4 horas",
    "active": true,
    "notes": "Enzima diagnóstica hepatobiliar y del recambio óseo."
  },
  {
    "id": "qui-18",
    "category": "Química Sanguínea",
    "name": "Bilirrubina Total y Fraccionada",
    "synonyms": [
      "bilirrubina",
      "bilirrubinas",
      "bilirrubina total y fraccionada",
      "bilirrubina directa e indirecta"
    ],
    "priceUsd": 8.5,
    "fastingHours": "Ayuno de 8 horas",
    "sampleType": "Suero protegido de la luz",
    "turnaround": "4 horas",
    "active": true,
    "notes": "Incluye Bilirrubina Total, Directa (conjugada) e Indirecta (libre)."
  },
  {
    "id": "qui-19",
    "category": "Química Sanguínea",
    "name": "Proteínas Totales y Fraccionadas",
    "synonyms": [
      "proteinas totales y fraccionadas",
      "albumina y globulina",
      "proteinas totales",
      "proteinograma"
    ],
    "priceUsd": 8.5,
    "fastingHours": "Ayuno de 8 horas",
    "sampleType": "Suero",
    "turnaround": "4 horas",
    "active": true,
    "notes": "Incluye Proteínas Totales, Albúmina, Globulinas y Relación A/G."
  },
  {
    "id": "qui-20",
    "category": "Química Sanguínea",
    "name": "Amilasa Sérica",
    "synonyms": [
      "amilasa",
      "amilasa serica",
      "amilasemia"
    ],
    "priceUsd": 9,
    "fastingHours": "Ayuno de 8 horas",
    "sampleType": "Suero",
    "turnaround": "4 horas",
    "active": true,
    "notes": "Enzima pancreática y salival de urgencia médica."
  },
  {
    "id": "qui-21",
    "category": "Química Sanguínea",
    "name": "GGT (Gamma Glutamil Transferasa)",
    "synonyms": [
      "ggt",
      "gamma glutamil transferasa",
      "gamma gt"
    ],
    "priceUsd": 6,
    "fastingHours": "Ayuno de 8 horas",
    "sampleType": "Suero",
    "turnaround": "4 horas",
    "active": true,
    "notes": "Marcador sensible a colestasis, alcoholismo y fármacos inductores."
  },
  {
    "id": "qui-22",
    "category": "Química Sanguínea",
    "name": "LDH (Lactato Deshidrogenasa)",
    "synonyms": [
      "ldh",
      "lactato deshidrogenasa",
      "deshidrogenasa lactica"
    ],
    "priceUsd": 6,
    "fastingHours": "Ayuno de 8 horas",
    "sampleType": "Suero no hemolizado",
    "turnaround": "4 horas",
    "active": true,
    "notes": "Marcador general de recambio tisular celular y hemólisis."
  },
  {
    "id": "qui-23",
    "category": "Química Sanguínea",
    "name": "Calcio Iónico (Calcio Libre)",
    "synonyms": [
      "calcio ionico",
      "calcio libre",
      "calcio ionizado"
    ],
    "priceUsd": 12,
    "fastingHours": "Ayuno de 8 horas",
    "sampleType": "Suero o plasma con heparina de litio",
    "turnaround": "4 horas",
    "active": true,
    "notes": "Fracción ionizada biológicamente activa independiente de la albúmina."
  },
  {
    "id": "qui-24",
    "category": "Química Sanguínea",
    "name": "Lipasa Sérica",
    "synonyms": [
      "lipasa",
      "lipasa serica",
      "lipasemia"
    ],
    "priceUsd": 9,
    "fastingHours": "Ayuno de 8 horas",
    "sampleType": "Suero",
    "turnaround": "4 horas",
    "active": true,
    "notes": "Marcador altamente específico de pancreatitis aguda y patología pancreática."
  },
  {
    "id": "qui-25",
    "category": "Química Sanguínea",
    "name": "Electrolitos Séricos (Sodio y Potasio)",
    "synonyms": [
      "sodio y potasio",
      "electrolitos",
      "electrolitos sericos",
      "na y k",
      "ionograma"
    ],
    "priceUsd": 12,
    "fastingHours": "Ayuno de 8 horas",
    "sampleType": "Suero",
    "turnaround": "4 horas",
    "active": true,
    "notes": "Cuantificación de Sodio (Na+) y Potasio (K+) séricos."
  },
  {
    "id": "qui-26",
    "category": "Química Sanguínea",
    "name": "Perfil 20 Completo",
    "synonyms": [
      "perfil 20",
      "perfil 20 completo",
      "chequeo general perfil 20",
      "perfil metabolico amplio"
    ],
    "priceUsd": 67,
    "fastingHours": "Ayuno estricto de 12 a 14 horas",
    "sampleType": "Sangre total EDTA + Suero + Orina + Heces",
    "turnaround": "6 a 12 horas",
    "active": true,
    "notes": "Panel integral: Hematología, Glicemia, Urea, Creatinina, Ácido Úrico, Perfil Lipídico (Colesterol, HDL, LDL, VLDL, Triglicéridos), Transaminasas TGO/TGP, Bilirrubinas T/F, Fosfatasa Alcalina, Calcio, Fósforo, Proteínas T/F, Uroanálisis y Coproanálisis."
  },
  {
    "id": "otr-1",
    "category": "Otros",
    "name": "Dímero D",
    "synonyms": [
      "dimero d",
      "dimer d",
      "trombosis dimero d"
    ],
    "priceUsd": 18,
    "fastingHours": "Ayuno de 4 horas",
    "sampleType": "Plasma citratado (Tubo Tapa Azul)",
    "turnaround": "4 horas",
    "active": true,
    "notes": "Marcador de hipercoagulabilidad y trombosis venosa / TEP."
  },
  {
    "id": "otr-2",
    "category": "Otros",
    "name": "Procalcitonina (PCT)",
    "synonyms": [
      "procalcitonina",
      "pct",
      "sepsis procalcitonina"
    ],
    "priceUsd": 22,
    "fastingHours": "Ayuno de 4 horas",
    "sampleType": "Suero",
    "turnaround": "4 horas",
    "active": true,
    "notes": "Biomarcador específico de infecciones bacterianas graves y sepsis."
  },
  {
    "id": "otr-3",
    "category": "Otros",
    "name": "Anticuerpos SARS-CoV-2 IgM/IgG",
    "synonyms": [
      "covid anticuerpos",
      "anticuerpos covid",
      "sars cov 2 anticuerpos",
      "anticuerpos sars-cov-2 igm/igg"
    ],
    "priceUsd": 20,
    "fastingHours": "Sin ayuno estricto",
    "sampleType": "Suero",
    "turnaround": "4 horas",
    "active": true,
    "notes": "Detección serológica de respuesta inmunológica frente a COVID-19."
  },
  {
    "id": "otr-4",
    "category": "Otros",
    "name": "Calprotectina Fecal Semicuantitativa",
    "synonyms": [
      "calprotectina",
      "calprotectina fecal",
      "calprotectina semicuantitativa",
      "calprotectina fecal semicuantitativa"
    ],
    "priceUsd": 26,
    "fastingHours": "Sin ayuno",
    "sampleType": "Muestra fecal fresca en recolector estéril",
    "turnaround": "24 a 48 horas",
    "active": true,
    "notes": "Marcador no invasivo de inflamación de la mucosa intestinal."
  },
  {
    "id": "otr-5",
    "category": "Otros",
    "name": "Panel Respiratorio Rápido",
    "synonyms": [
      "panel respiratorio",
      "panel respiratorio rapido",
      "influenza y covid"
    ],
    "priceUsd": 42,
    "fastingHours": "Sin condiciones especiales",
    "sampleType": "Hisopado nasofaríngeo",
    "turnaround": "4 horas",
    "active": true,
    "notes": "Detección simultánea de múltiples patógenos virales respiratorios."
  },
  {
    "id": "otr-6",
    "category": "Otros",
    "name": "Mycoplasma y Ureaplasma",
    "synonyms": [
      "mycoplasma y ureaplasma",
      "mycoplasma hominis",
      "ureaplasma urealyticum",
      "ureaplasma"
    ],
    "priceUsd": 20,
    "fastingHours": "Abstinencia sexual 48h, retención urinaria 4h o exudado genital",
    "sampleType": "Exudado uretral/vaginal o primer chorro de orina",
    "turnaround": "48 a 72 horas",
    "active": true,
    "notes": "Cultivo e identificación con perfil de susceptibilidad antibiótica."
  },
  {
    "id": "otr-7",
    "category": "Otros",
    "name": "Anticuerpos Treponema pallidum (Sífilis Confirmatoria)",
    "synonyms": [
      "ac treponema pallidum",
      "sifilis confirmatoria",
      "ftahbs",
      "anticuerpos sifilis",
      "treponema pallidum"
    ],
    "priceUsd": 16,
    "fastingHours": "Ayuno de 4 horas",
    "sampleType": "Suero",
    "turnaround": "24 horas",
    "active": true,
    "notes": "Prueba treponémica específica confirmatoria de sífilis."
  },
  {
    "id": "hor-1",
    "category": "Hormonas",
    "name": "Insulina Basal (en Ayunas)",
    "synonyms": [
      "insulina",
      "insulina basal",
      "insulina en ayunas",
      "insulinemia"
    ],
    "priceUsd": 14,
    "fastingHours": "Ayuno estricto de 8 a 10 horas",
    "sampleType": "Suero",
    "turnaround": "24 a 48 horas",
    "active": true,
    "notes": "Evitar ejercicio intenso el día previo. No suspender medicación salvo orden médica."
  },
  {
    "id": "hor-2",
    "category": "Hormonas",
    "name": "Insulina Postprandial (PP)",
    "synonyms": [
      "insulina postprandial",
      "insulina pp"
    ],
    "priceUsd": 14,
    "fastingHours": "Toma a las 2 horas de iniciar el desayuno/comida",
    "sampleType": "Suero",
    "turnaround": "24 a 48 horas",
    "active": true,
    "notes": "Comida pautada por el médico tratante."
  },
  {
    "id": "hor-3",
    "category": "Hormonas",
    "name": "Insulina Postcarga",
    "synonyms": [
      "insulina postcarga",
      "curva de insulina postcarga"
    ],
    "priceUsd": 14,
    "fastingHours": "Ayuno previo + sobrecarga oral con 75g de glucosa",
    "sampleType": "Suero",
    "turnaround": "24 a 48 horas",
    "active": true,
    "notes": "Permanecer en reposo en sala de espera."
  },
  {
    "id": "hor-4",
    "category": "Hormonas",
    "name": "T3 Libre (Triyodotironina Libre)",
    "synonyms": [
      "t3 libre",
      "t3",
      "triyodotironina libre"
    ],
    "priceUsd": 13.5,
    "fastingHours": "Ayuno de 8 horas",
    "sampleType": "Suero",
    "turnaround": "24 horas",
    "active": true,
    "notes": "Si toma hormona tiroidea (Levotiroxina), tomar la muestra ANTES de la dosis diaria."
  },
  {
    "id": "hor-5",
    "category": "Hormonas",
    "name": "TSH Ultrasensible",
    "synonyms": [
      "tsh",
      "tsh ultrasensible",
      "tirotropina",
      "hormona tiroestimulante"
    ],
    "priceUsd": 13,
    "fastingHours": "Ayuno de 8 horas. Toma matutina (7:00 am - 9:00 am).",
    "sampleType": "Suero",
    "turnaround": "24 horas",
    "active": true,
    "notes": "Tomar la muestra antes de la medicación tiroidea de la mañana."
  },
  {
    "id": "hor-6",
    "category": "Hormonas",
    "name": "T4 Libre (Tiroxina Libre)",
    "synonyms": [
      "t4 libre",
      "t4",
      "tiroxina libre"
    ],
    "priceUsd": 13,
    "fastingHours": "Ayuno de 8 horas",
    "sampleType": "Suero",
    "turnaround": "24 horas",
    "active": true,
    "notes": "Tomar la muestra antes de ingerir la dosis de Levotiroxina."
  },
  {
    "id": "hor-7",
    "category": "Hormonas",
    "name": "Cortisol Sérico (8:00 AM)",
    "synonyms": [
      "cortisol 8 am",
      "cortisol matutino",
      "cortisol am",
      "cortisol"
    ],
    "priceUsd": 15,
    "fastingHours": "Ayuno de 8 horas. Reposo de 20 min en sala antes de punción.",
    "sampleType": "Suero",
    "turnaround": "24 horas",
    "active": true,
    "notes": "CRÍTICO: Extracción estricta a las 8:00 am (± 30 min). Evitar estrés físico y emocional."
  },
  {
    "id": "hor-8",
    "category": "Hormonas",
    "name": "Cortisol Sérico (4:00 PM)",
    "synonyms": [
      "cortisol 4 pm",
      "cortisol vespertino",
      "cortisol pm"
    ],
    "priceUsd": 15,
    "fastingHours": "Ayuno de 2 a 4 horas. Extracción a las 4:00 pm (± 30 min).",
    "sampleType": "Suero",
    "turnaround": "24 horas",
    "active": true,
    "notes": "Evaluación del ritmo circadiano adrenal. Reposo previo de 20 min."
  },
  {
    "id": "hor-9",
    "category": "Hormonas",
    "name": "Estradiol (E2)",
    "synonyms": [
      "estradiol",
      "e2",
      "17 beta estradiol",
      "estrogenos"
    ],
    "priceUsd": 13,
    "fastingHours": "Ayuno de 8 horas",
    "sampleType": "Suero",
    "turnaround": "24 horas",
    "active": true,
    "notes": "Indicar día del ciclo menstrual (fase folicular, ovulatoria, lútea o menopausia)."
  },
  {
    "id": "hor-10",
    "category": "Hormonas",
    "name": "FSH (Hormona Folículo Estimulante)",
    "synonyms": [
      "fsh",
      "foliculo estimulante",
      "hormona foliculocitoestimulante"
    ],
    "priceUsd": 12,
    "fastingHours": "Ayuno de 8 horas",
    "sampleType": "Suero",
    "turnaround": "24 horas",
    "active": true,
    "notes": "Indicar fase del ciclo menstrual o si toma terapia hormonal."
  },
  {
    "id": "hor-11",
    "category": "Hormonas",
    "name": "LH (Hormona Luteinizante)",
    "synonyms": [
      "lh",
      "hormona luteinizante",
      "luteinizante"
    ],
    "priceUsd": 12,
    "fastingHours": "Ayuno de 8 horas",
    "sampleType": "Suero",
    "turnaround": "24 horas",
    "active": true,
    "notes": "Indicar día del ciclo menstrual."
  },
  {
    "id": "hor-12",
    "category": "Hormonas",
    "name": "Progesterona",
    "synonyms": [
      "progesterona",
      "prg"
    ],
    "priceUsd": 14,
    "fastingHours": "Ayuno de 8 horas",
    "sampleType": "Suero",
    "turnaround": "24 horas",
    "active": true,
    "notes": "Habitualmente tomada el día 21 del ciclo menstrual o según indicación médica."
  },
  {
    "id": "hor-13",
    "category": "Hormonas",
    "name": "Prolactina",
    "synonyms": [
      "prolactina",
      "prl"
    ],
    "priceUsd": 12,
    "fastingHours": "Ayuno de 8 horas. 2 horas despierto. 20 min de reposo.",
    "sampleType": "Suero",
    "turnaround": "24 horas",
    "active": true,
    "notes": "CRÍTICO: Abstinencia sexual 48h antes. Evitar estímulo o roce de pezones/mamas. Reposo de 20 min en laboratorio antes de punción."
  },
  {
    "id": "hor-14",
    "category": "Hormonas",
    "name": "Beta HCG Cuantitativa",
    "synonyms": [
      "beta hcg",
      "subunidad beta",
      "hcg cuantitativa",
      "prueba de embarazo cuantitativa"
    ],
    "priceUsd": 12,
    "fastingHours": "Ayuno ligero de 4 horas",
    "sampleType": "Suero",
    "turnaround": "4 a 6 horas",
    "active": true,
    "notes": "Cuantificación exacta de niveles de Gonadotropina Coriónica Humana."
  },
  {
    "id": "hor-15",
    "category": "Hormonas",
    "name": "DHEA-S (Dehidroepiandrosterona Sulfato)",
    "synonyms": [
      "dhea-s",
      "dheas",
      "dehidroepiandrosterona",
      "sulfato de dhea"
    ],
    "priceUsd": 17,
    "fastingHours": "Ayuno de 8 horas",
    "sampleType": "Suero",
    "turnaround": "24 a 48 horas",
    "active": true,
    "notes": "Andrógeno suprarrenal. Indicar fase del ciclo menstrual."
  },
  {
    "id": "hor-16",
    "category": "Hormonas",
    "name": "Testosterona Total",
    "synonyms": [
      "testosterona",
      "testosterona total"
    ],
    "priceUsd": 12,
    "fastingHours": "Ayuno de 8 horas. Toma matutina recomendada.",
    "sampleType": "Suero",
    "turnaround": "24 horas",
    "active": true,
    "notes": "Nivel total de testosterona circulante."
  },
  {
    "id": "hor-17",
    "category": "Hormonas",
    "name": "Testosterona Libre",
    "synonyms": [
      "testosterona libre",
      "testo libre"
    ],
    "priceUsd": 24,
    "fastingHours": "Ayuno de 8 horas. Toma matutina.",
    "sampleType": "Suero",
    "turnaround": "48 horas",
    "active": true,
    "notes": "Fracción biológicamente no unida a proteínas."
  },
  {
    "id": "inm-1",
    "category": "Inmunología",
    "name": "Hepatitis A IgM (Anti-VHA IgM)",
    "synonyms": [
      "hepatitis a",
      "anti vha igm",
      "hepatitis a igm",
      "vha igm"
    ],
    "priceUsd": 9.5,
    "fastingHours": "Ayuno de 4 a 6 horas",
    "sampleType": "Suero",
    "turnaround": "24 horas",
    "active": true,
    "notes": "Diagnóstico de infección aguda por virus de Hepatitis A."
  },
  {
    "id": "inm-2",
    "category": "Inmunología",
    "name": "Antígeno de Superficie Hepatitis B (HBsAg / Australia)",
    "synonyms": [
      "hepatitis b",
      "hbsag",
      "antigeno de superficie hepatitis b",
      "antigeno australia"
    ],
    "priceUsd": 7.5,
    "fastingHours": "Ayuno de 4 a 6 horas",
    "sampleType": "Suero",
    "turnaround": "24 horas",
    "active": true,
    "notes": "Detección de infección activa (aguda o crónica) por Hepatitis B."
  },
  {
    "id": "inm-3",
    "category": "Inmunología",
    "name": "Anticuerpo Core Hepatitis B (Anti-HBc Total)",
    "synonyms": [
      "anti hbc",
      "core hepatitis b",
      "anti hbc total",
      "anticuerpo core hepatitis b"
    ],
    "priceUsd": 12,
    "fastingHours": "Ayuno de 4 a 6 horas",
    "sampleType": "Suero",
    "turnaround": "24 horas",
    "active": true,
    "notes": "Marcador de exposición o contacto previo con virus de Hepatitis B."
  },
  {
    "id": "inm-4",
    "category": "Inmunología",
    "name": "Anticuerpo Hepatitis C (Anti-VHC)",
    "synonyms": [
      "hepatitis c",
      "anti vhc",
      "anticuerpo hepatitis c",
      "vhc"
    ],
    "priceUsd": 8.5,
    "fastingHours": "Ayuno de 4 a 6 horas",
    "sampleType": "Suero",
    "turnaround": "24 horas",
    "active": true,
    "notes": "Tamizaje serológico de Hepatitis C."
  },
  {
    "id": "inm-5",
    "category": "Inmunología",
    "name": "Proteína C Reactiva (PCR) Semicuantitativa",
    "synonyms": [
      "pcr",
      "proteina c reactiva",
      "pcr semicuantitativa",
      "pcr latex"
    ],
    "priceUsd": 7.5,
    "fastingHours": "Ayuno de 4 horas",
    "sampleType": "Suero",
    "turnaround": "4 horas",
    "active": true,
    "notes": "Reactante de fase aguda por aglutinación."
  },
  {
    "id": "inm-6",
    "category": "Inmunología",
    "name": "Proteína C Reactiva (PCR) Cuantitativa Ultrasensible",
    "synonyms": [
      "pcr cuantitativa",
      "pcr ultrasensible",
      "proteina c reactiva cuantitativa"
    ],
    "priceUsd": 13,
    "fastingHours": "Ayuno de 4 a 8 horas",
    "sampleType": "Suero",
    "turnaround": "4 a 6 horas",
    "active": true,
    "notes": "Cuantificación turbidimétrica de alta precisión y evaluación de riesgo cardiovascular."
  },
  {
    "id": "inm-7",
    "category": "Inmunología",
    "name": "ASLO (Antiestreptolisina O) Semicuantitativo",
    "synonyms": [
      "aslo",
      "antiestreptolisinas",
      "aslo semicuantitativo",
      "aso"
    ],
    "priceUsd": 7.5,
    "fastingHours": "Ayuno de 4 horas",
    "sampleType": "Suero",
    "turnaround": "4 horas",
    "active": true,
    "notes": "Anticuerpos frente a Estreptococo betahemolítico del grupo A."
  },
  {
    "id": "inm-8",
    "category": "Inmunología",
    "name": "ASLO (Antiestreptolisina O) Cuantitativo",
    "synonyms": [
      "aslo cuantitativo",
      "antiestreptolisina o cuantitativo",
      "aso cuantitativo"
    ],
    "priceUsd": 15,
    "fastingHours": "Ayuno de 4 a 8 horas",
    "sampleType": "Suero",
    "turnaround": "6 a 12 horas",
    "active": true,
    "notes": "Cuantificación turbidimétrica de títulos de antiestreptolisina O."
  },
  {
    "id": "inm-9",
    "category": "Inmunología",
    "name": "VIH / HIV 3ra Generación (Anticuerpos)",
    "synonyms": [
      "vih",
      "hiv",
      "prueba de vih",
      "hiv 3ra generacion",
      "elisa vih"
    ],
    "priceUsd": 7,
    "fastingHours": "Sin ayuno estricto",
    "sampleType": "Suero",
    "turnaround": "4 horas",
    "active": true,
    "notes": "Detección de anticuerpos IgG e IgM anti-VIH 1 y 2."
  },
  {
    "id": "inm-10",
    "category": "Inmunología",
    "name": "VIH / HIV 4ta Generación (Dúo Ag p24 + Ac)",
    "synonyms": [
      "hiv 4ta generacion",
      "vih 4ta generacion",
      "hiv combo",
      "ag p24 vih"
    ],
    "priceUsd": 12,
    "fastingHours": "Sin ayuno estricto",
    "sampleType": "Suero",
    "turnaround": "4 a 6 horas",
    "active": true,
    "notes": "Detección simultánea del antígeno p24 y anticuerpos. Reduce período de ventana."
  },
  {
    "id": "inm-11",
    "category": "Inmunología",
    "name": "VDRL Semicuantitativo (Serología para Sífilis)",
    "synonyms": [
      "vdrl",
      "serologia sifilis",
      "reaginas plasmaticas",
      "vdrl semicuantitativo"
    ],
    "priceUsd": 6.5,
    "fastingHours": "Ayuno de 4 horas",
    "sampleType": "Suero",
    "turnaround": "4 horas",
    "active": true,
    "notes": "Prueba no treponémica con determinación de títulos por diluciones."
  },
  {
    "id": "inm-12",
    "category": "Inmunología",
    "name": "HCG Cualitativa (Prueba Rápida de Embarazo en Sangre)",
    "synonyms": [
      "prueba de embarazo",
      "hcg rapida",
      "embarazo en sangre",
      "hcg cualitativa"
    ],
    "priceUsd": 6,
    "fastingHours": "Sin ayuno",
    "sampleType": "Suero",
    "turnaround": "1 a 2 horas",
    "active": true,
    "notes": "Resultado cualitativo Positivo / Negativo."
  },
  {
    "id": "inm-13",
    "category": "Inmunología",
    "name": "Epstein-Barr (VEB) IgM",
    "synonyms": [
      "veb igm",
      "epstein barr igm",
      "mononucleosis igm"
    ],
    "priceUsd": 12,
    "fastingHours": "Ayuno de 6 horas",
    "sampleType": "Suero",
    "turnaround": "24 a 48 horas",
    "active": true,
    "notes": "Fase aguda de mononucleosis infecciosa."
  },
  {
    "id": "inm-14",
    "category": "Inmunología",
    "name": "Epstein-Barr (VEB) IgG",
    "synonyms": [
      "veb igg",
      "epstein barr igg",
      "mononucleosis igg"
    ],
    "priceUsd": 12,
    "fastingHours": "Ayuno de 6 horas",
    "sampleType": "Suero",
    "turnaround": "24 a 48 horas",
    "active": true,
    "notes": "Inmunidad o contacto pasado con virus de Epstein-Barr."
  },
  {
    "id": "inm-15",
    "category": "Inmunología",
    "name": "Serología Epstein-Barr Completa (IgM + IgG)",
    "synonyms": [
      "serologia veb",
      "serologia epstein barr completa",
      "panel veb"
    ],
    "priceUsd": 24,
    "fastingHours": "Ayuno de 6 horas",
    "sampleType": "Suero",
    "turnaround": "24 a 48 horas",
    "active": true,
    "notes": "Panel serológico completo para infección aguda vs memoria inmunológica."
  },
  {
    "id": "inm-16",
    "category": "Inmunología",
    "name": "Citomegalovirus (CMV) IgM",
    "synonyms": [
      "cmv igm",
      "citomegalovirus igm"
    ],
    "priceUsd": 11,
    "fastingHours": "Ayuno de 6 horas",
    "sampleType": "Suero",
    "turnaround": "24 a 48 horas",
    "active": true,
    "notes": "Infección activa o reactivación por Citomegalovirus."
  },
  {
    "id": "inm-17",
    "category": "Inmunología",
    "name": "Citomegalovirus (CMV) IgG",
    "synonyms": [
      "cmv igg",
      "citomegalovirus igg"
    ],
    "priceUsd": 11,
    "fastingHours": "Ayuno de 6 horas",
    "sampleType": "Suero",
    "turnaround": "24 a 48 horas",
    "active": true,
    "notes": "Inmunidad o contacto pasado con CMV."
  },
  {
    "id": "inm-18",
    "category": "Inmunología",
    "name": "Serología Citomegalovirus Completa (IgM + IgG)",
    "synonyms": [
      "serologia cmv",
      "serologia citomegalovirus completa",
      "panel cmv"
    ],
    "priceUsd": 22,
    "fastingHours": "Ayuno de 6 horas",
    "sampleType": "Suero",
    "turnaround": "24 a 48 horas",
    "active": true,
    "notes": "Panel serológico completo CMV (TORCH)."
  },
  {
    "id": "inm-19",
    "category": "Inmunología",
    "name": "Toxoplasmosis IgM",
    "synonyms": [
      "toxoplasma igm",
      "toxoplasmosis igm"
    ],
    "priceUsd": 11,
    "fastingHours": "Ayuno de 6 horas",
    "sampleType": "Suero",
    "turnaround": "24 a 48 horas",
    "active": true,
    "notes": "Infección aguda por Toxoplasma gondii. Vital en control prenatal."
  },
  {
    "id": "inm-20",
    "category": "Inmunología",
    "name": "Toxoplasmosis IgG",
    "synonyms": [
      "toxoplasma igg",
      "toxoplasmosis igg"
    ],
    "priceUsd": 11,
    "fastingHours": "Ayuno de 6 horas",
    "sampleType": "Suero",
    "turnaround": "24 a 48 horas",
    "active": true,
    "notes": "Inmunidad de memoria frente a Toxoplasma gondii."
  },
  {
    "id": "inm-21",
    "category": "Inmunología",
    "name": "Serología Toxoplasmosis Completa (IgM + IgG)",
    "synonyms": [
      "serologia toxoplasma",
      "serologia toxoplasmosis completa",
      "panel toxo"
    ],
    "priceUsd": 22,
    "fastingHours": "Ayuno de 6 horas",
    "sampleType": "Suero",
    "turnaround": "24 a 48 horas",
    "active": true,
    "notes": "Panel serológico completo de Toxoplasma (TORCH)."
  },
  {
    "id": "inm-22",
    "category": "Inmunología",
    "name": "Chlamydia pneumoniae IgM",
    "synonyms": [
      "chlamydia pneumoniae igm",
      "clamidia neumoniae igm"
    ],
    "priceUsd": 19,
    "fastingHours": "Ayuno de 6 horas",
    "sampleType": "Suero",
    "turnaround": "48 horas",
    "active": true,
    "notes": "Diagnóstico serológico de neumonía atípica aguda."
  },
  {
    "id": "inm-23",
    "category": "Inmunología",
    "name": "Chlamydia pneumoniae IgG",
    "synonyms": [
      "chlamydia pneumoniae igg",
      "clamidia neumoniae igg"
    ],
    "priceUsd": 19,
    "fastingHours": "Ayuno de 6 horas",
    "sampleType": "Suero",
    "turnaround": "48 horas",
    "active": true,
    "notes": "Memoria inmunológica frente a Chlamydia pneumoniae."
  },
  {
    "id": "inm-24",
    "category": "Inmunología",
    "name": "Serología Chlamydia Completa (IgM + IgG)",
    "synonyms": [
      "serologia chlamydia",
      "serologia chlamydia completa"
    ],
    "priceUsd": 38,
    "fastingHours": "Ayuno de 6 horas",
    "sampleType": "Suero",
    "turnaround": "48 horas",
    "active": true,
    "notes": "Panel integral de anticuerpos frente a Chlamydia."
  },
  {
    "id": "inm-25",
    "category": "Inmunología",
    "name": "Mycoplasma pneumoniae IgM",
    "synonyms": [
      "mycoplasma pneumoniae igm",
      "micoplasma neumoniae igm"
    ],
    "priceUsd": 13,
    "fastingHours": "Ayuno de 6 horas",
    "sampleType": "Suero",
    "turnaround": "48 horas",
    "active": true,
    "notes": "Marcador agudo de infección respiratoria por Mycoplasma."
  },
  {
    "id": "inm-26",
    "category": "Inmunología",
    "name": "Mycoplasma pneumoniae IgG",
    "synonyms": [
      "mycoplasma pneumoniae igg",
      "micoplasma neumoniae igg"
    ],
    "priceUsd": 13,
    "fastingHours": "Ayuno de 6 horas",
    "sampleType": "Suero",
    "turnaround": "48 horas",
    "active": true,
    "notes": "Memoria inmunológica por Mycoplasma pneumoniae."
  },
  {
    "id": "inm-27",
    "category": "Inmunología",
    "name": "Serología Mycoplasma Completa (IgM + IgG)",
    "synonyms": [
      "serologia mycoplasma",
      "serologia mycoplasma completa"
    ],
    "priceUsd": 36,
    "fastingHours": "Ayuno de 6 horas",
    "sampleType": "Suero",
    "turnaround": "48 horas",
    "active": true,
    "notes": "Panel serológico completo para Mycoplasma respiratorio."
  },
  {
    "id": "inm-28",
    "category": "Inmunología",
    "name": "Helicobacter pylori IgM",
    "synonyms": [
      "h pylori igm",
      "helicobacter pylori igm",
      "anticuerpos h pylori igm"
    ],
    "priceUsd": 11,
    "fastingHours": "Ayuno de 6 horas",
    "sampleType": "Suero",
    "turnaround": "24 horas",
    "active": true,
    "notes": "Respuesta inmune reciente frente a Helicobacter pylori."
  },
  {
    "id": "inm-29",
    "category": "Inmunología",
    "name": "Helicobacter pylori IgG",
    "synonyms": [
      "h pylori igg",
      "helicobacter pylori igg",
      "anticuerpos h pylori igg"
    ],
    "priceUsd": 11,
    "fastingHours": "Ayuno de 6 horas",
    "sampleType": "Suero",
    "turnaround": "24 horas",
    "active": true,
    "notes": "Exposición crónica o memoria frente a Helicobacter pylori."
  },
  {
    "id": "inm-30",
    "category": "Inmunología",
    "name": "Serología Helicobacter pylori Completa (IgM + IgG)",
    "synonyms": [
      "serologia h pylori",
      "serologia helicobacter pylori completa"
    ],
    "priceUsd": 22,
    "fastingHours": "Ayuno de 6 horas",
    "sampleType": "Suero",
    "turnaround": "24 horas",
    "active": true,
    "notes": "Evaluación serológica integral frente a H. pylori."
  },
  {
    "id": "inm-31",
    "category": "Inmunología",
    "name": "Dengue IgM / IgG",
    "synonyms": [
      "dengue igm igg",
      "serologia dengue",
      "anticuerpos dengue"
    ],
    "priceUsd": 16,
    "fastingHours": "Sin ayuno estricto",
    "sampleType": "Suero",
    "turnaround": "4 a 6 horas",
    "active": true,
    "notes": "Detección de anticuerpos primarios y secundarios frente al virus del Dengue."
  },
  {
    "id": "inm-32",
    "category": "Inmunología",
    "name": "Dengue Combo (NS1 + IgM + IgG)",
    "synonyms": [
      "dengue combo",
      "dengue ns1",
      "dengue ns1 igm igg",
      "antigeno ns1 dengue"
    ],
    "priceUsd": 20,
    "fastingHours": "Sin ayuno estricto",
    "sampleType": "Suero",
    "turnaround": "2 a 4 horas",
    "active": true,
    "notes": "Panel completo para Dengue desde el día 1 de fiebre (NS1) hasta fases posteriores (IgM/IgG)."
  },
  {
    "id": "inm-33",
    "category": "Inmunología",
    "name": "Factor Reumatoideo (FR / RA Test) Semicuantitativo",
    "synonyms": [
      "factor reumatoideo",
      "fr",
      "ra test",
      "factor reumatoideo semicuantitativo"
    ],
    "priceUsd": 7,
    "fastingHours": "Ayuno de 4 a 6 horas",
    "sampleType": "Suero",
    "turnaround": "4 horas",
    "active": true,
    "notes": "Determinación de autoanticuerpos por aglutinación de látex."
  },
  {
    "id": "inm-34",
    "category": "Inmunología",
    "name": "Factor Reumatoideo (FR / RA Test) Cuantitativo",
    "synonyms": [
      "factor reumatoideo cuantitativo",
      "fr cuantitativo",
      "ra test cuantitativo"
    ],
    "priceUsd": 15,
    "fastingHours": "Ayuno de 6 horas",
    "sampleType": "Suero",
    "turnaround": "6 a 12 horas",
    "active": true,
    "notes": "Cuantificación turbidimétrica de alta precisión de Factor Reumatoideo."
  },
  {
    "id": "ing-1",
    "category": "Inmunoglobulinas",
    "name": "Inmunoglobulina E Total (IgE)",
    "synonyms": [
      "ige",
      "ige total",
      "inmunoglobulina e",
      "inmunoglobulina e total (ige)"
    ],
    "priceUsd": 12,
    "fastingHours": "Ayuno de 8 horas",
    "sampleType": "Suero",
    "turnaround": "24 horas",
    "active": true,
    "notes": "Evaluación de atopia, alergias y parasitosis tisulares."
  },
  {
    "id": "fer-1",
    "category": "Perfil Ferrocinética",
    "name": "Ferritina Sérica",
    "synonyms": [
      "ferritina",
      "ferritina serica"
    ],
    "priceUsd": 13,
    "fastingHours": "Ayuno de 8 a 12 horas",
    "sampleType": "Suero no hemolizado",
    "turnaround": "24 horas",
    "active": true,
    "notes": "Principal reserva férrica del organismo y reactante de fase aguda."
  },
  {
    "id": "fer-2",
    "category": "Perfil Ferrocinética",
    "name": "Hierro Sérico",
    "synonyms": [
      "hierro",
      "hierro serico",
      "sideremia"
    ],
    "priceUsd": 9,
    "fastingHours": "Ayuno de 8 a 12 horas. Toma matutina estricta.",
    "sampleType": "Suero",
    "turnaround": "24 horas",
    "active": true,
    "notes": "No tomar suplementos de hierro por vía oral 48h antes de la extracción."
  },
  {
    "id": "fer-3",
    "category": "Perfil Ferrocinética",
    "name": "Capacidad Total de Fijación del Hierro (TIBC / Transferrina)",
    "synonyms": [
      "tibc",
      "transferrina",
      "capacidad de fijacion de hierro",
      "capacidad total de fijacion del hierro"
    ],
    "priceUsd": 20,
    "fastingHours": "Ayuno de 8 a 12 horas",
    "sampleType": "Suero",
    "turnaround": "24 horas",
    "active": true,
    "notes": "Evaluación del transporte férrico e índice de saturación de transferrina."
  },
  {
    "id": "mic-1",
    "category": "Microbiología",
    "name": "Urocultivo con Antibiograma Automatizado",
    "synonyms": [
      "urocultivo",
      "cultivo de orina",
      "infeccion urinaria cultivo",
      "antibiograma orina",
      "urocultivo con antibiograma"
    ],
    "priceUsd": 35,
    "fastingHours": "Sin ayuno. Primera orina de la mañana o retención de 3-4 horas.",
    "sampleType": "Orina de chorro medio en frasco estéril (traslado en hielo)",
    "turnaround": "48 a 72 horas",
    "active": true,
    "notes": "CRÍTICO: Muestra previa al inicio de antibióticos. Aseo riguroso de genitales con agua y jabón neutro sin antisépticos. Descartar primer chorro y recoger chorro medio. Refrigerar y trasladar en hielo."
  },
  {
    "id": "mic-2",
    "category": "Microbiología",
    "name": "Coprocultivo (Cultivo Bacteriológico Fecal)",
    "synonyms": [
      "coprocultivo",
      "cultivo de heces",
      "cultivo fecal",
      "coprocultivo automatizado"
    ],
    "priceUsd": 42,
    "fastingHours": "Sin ayuno",
    "sampleType": "Muestra fecal en frasco estéril a temperatura ambiente",
    "turnaround": "72 horas",
    "active": true,
    "notes": "Sin antibióticos 48-72h antes. Porción tamaño nuez. Lactantes: recoger con pañal al revés (plástico hacia adentro) sin cremas antipañalitis ni talcos."
  },
  {
    "id": "mic-3",
    "category": "Microbiología",
    "name": "Exudado Faríngeo con Antibiograma",
    "synonyms": [
      "exudado faringeo",
      "cultivo de garganta",
      "hisopado faringeo",
      "exudado faringeo con antibiograma"
    ],
    "priceUsd": 35,
    "fastingHours": "En ayunas, sin cepillarse los dientes, sin enjuagues ni antisépticos bucales",
    "sampleType": "Hisopado faríngeo amigdalar tomado en laboratorio",
    "turnaround": "48 a 72 horas",
    "active": true,
    "notes": "Toma realizada directamente en el laboratorio por personal especializado."
  },
  {
    "id": "mic-4",
    "category": "Microbiología",
    "name": "Secreción Nasal con Antibiograma",
    "synonyms": [
      "secrecion nasal",
      "cultivo nasal",
      "cultivo secrecion nasal",
      "hisopado nasal cultivo"
    ],
    "priceUsd": 35,
    "fastingHours": "Suspender gotas y sprays nasales 24h antes",
    "sampleType": "Hisopado de fosas nasales",
    "turnaround": "48 a 72 horas",
    "active": true,
    "notes": "Incluye aislamiento bacteriano y antibiograma automatizado."
  },
  {
    "id": "mic-5",
    "category": "Microbiología",
    "name": "Cultivo de Secreción Ocular / Conjuntival",
    "synonyms": [
      "secrecion ocular",
      "cultivo ocular",
      "cultivo conjuntival",
      "secrecion conjuntival",
      "cultivo secrecion ocular"
    ],
    "priceUsd": 45,
    "fastingHours": "Sin colirios ni ungüentos oftálmicos 24h antes",
    "sampleType": "Hisopado conjuntival en medio de transporte",
    "turnaround": "48 a 72 horas",
    "active": true,
    "notes": "Retirar lentes de contacto 12h antes. Sin maquillaje de ojos."
  },
  {
    "id": "mic-6",
    "category": "Microbiología",
    "name": "Cultivo de Secreción Ótica",
    "synonyms": [
      "secrecion otica",
      "cultivo otico",
      "cultivo de oido",
      "secrecion de oido"
    ],
    "priceUsd": 45,
    "fastingHours": "Sin gotas óticas 48h antes",
    "sampleType": "Hisopado de conducto auditivo externo",
    "turnaround": "48 a 72 horas",
    "active": true,
    "notes": "No realizar lavados de oído previos a la toma."
  },
  {
    "id": "mic-7",
    "category": "Microbiología",
    "name": "Cultivo de Secreción de Heridas y Úlceras",
    "synonyms": [
      "cultivo de herida",
      "cultivo de herida y ulceras",
      "cultivo de ulceras",
      "secrecion de herida",
      "secrecion de herida/ulcera",
      "secrecion de herida / ulcera"
    ],
    "priceUsd": 50,
    "fastingHours": "Sin apósitos con medicamentos, cremas ni antibióticos tópicos 24h antes",
    "sampleType": "Exudado de lecho ulceroso / hisopado profundo",
    "turnaround": "48 a 72 horas",
    "active": true,
    "notes": "Lavado previo del área con solución fisiológica estéril antes de recolectar la muestra de la base limpia."
  },
  {
    "id": "mic-8",
    "category": "Microbiología",
    "name": "Cultivo de Secreción Uretral",
    "synonyms": [
      "secrecion uretral",
      "cultivo uretral",
      "exudado uretral"
    ],
    "priceUsd": 50,
    "fastingHours": "Retención urinaria de al menos 4 horas. Abstinencia sexual 48h.",
    "sampleType": "Hisopado intrauretral fino",
    "turnaround": "48 a 72 horas",
    "active": true,
    "notes": "Toma realizada por especialista en el laboratorio."
  },
  {
    "id": "mic-9",
    "category": "Microbiología",
    "name": "Cultivo de Secreción Vaginal / Exudado Vaginal",
    "synonyms": [
      "secrecion vaginal",
      "cultivo vaginal",
      "exudado vaginal",
      "flujo vaginal cultivo"
    ],
    "priceUsd": 45,
    "fastingHours": "Abstinencia sexual 48h. Sin duchas vaginales, óvulos ni cremas por 3 días.",
    "sampleType": "Hisopado de fondo de saco vaginal",
    "turnaround": "48 a 72 horas",
    "active": true,
    "notes": "No estar menstruando. Aseo genital externo solo con agua."
  },
  {
    "id": "mic-10",
    "category": "Microbiología",
    "name": "Cultivo de Lavado Broncoalveolar (LBA)",
    "synonyms": [
      "lavado broncoalveolar",
      "lba",
      "cultivo lavado broncoalveolar",
      "lavado broncoalveolar lba"
    ],
    "priceUsd": 51,
    "fastingHours": "Procedimiento broncoscópico intrahospitalario",
    "sampleType": "Líquido en trampa estéril de Lukens",
    "turnaround": "48 a 72 horas",
    "active": true,
    "notes": "Traslado inmediato en < 2 horas al laboratorio."
  },
  {
    "id": "mic-11",
    "category": "Microbiología",
    "name": "Cultivo de Secreción Bronquial",
    "synonyms": [
      "secrecion bronquial",
      "aspirado bronquial",
      "cultivo secrecion bronquial"
    ],
    "priceUsd": 50,
    "fastingHours": "Procedimiento médico",
    "sampleType": "Aspirado traqueobronquial en frasco estéril sellado",
    "turnaround": "48 a 72 horas",
    "active": true,
    "notes": "Mantener a temperatura ambiente y trasladar de inmediato."
  },
  {
    "id": "mic-12",
    "category": "Microbiología",
    "name": "Cultivo de Esputo (Expectoración Profunda)",
    "synonyms": [
      "cultivo de esputo",
      "esputo",
      "expectoracion profunda",
      "esputo cultivo"
    ],
    "priceUsd": 50,
    "fastingHours": "En ayunas matutina",
    "sampleType": "Desgarro bronquial profundo matutino en frasco estéril (no saliva)",
    "turnaround": "72 horas",
    "active": true,
    "notes": "Enjuague bucal únicamente con agua simple. Tos profunda desde los pulmones. Evitar saliva."
  },
  {
    "id": "mic-13",
    "category": "Microbiología",
    "name": "Cultivo de Líquido Cefalorraquídeo (LCR)",
    "synonyms": [
      "cultivo lcr",
      "cultivo de liquido cefalorraquideo",
      "cultivo liquido lcr"
    ],
    "priceUsd": 43,
    "fastingHours": "Punción lumbar por médico",
    "sampleType": "LCR en tubo estéril",
    "turnaround": "48 a 72 horas",
    "active": true,
    "notes": "¡NUNCA REFRIGERAR! Traslado urgente e inmediato a temperatura ambiente (20-25°C)."
  },
  {
    "id": "mic-14",
    "category": "Microbiología",
    "name": "Cultivo de Líquido Pleural",
    "synonyms": [
      "cultivo liquido pleural",
      "cultivo de liquido pleural",
      "cultivo pleural"
    ],
    "priceUsd": 43,
    "fastingHours": "Toracocentesis médica",
    "sampleType": "Líquido pleural en frasco estéril",
    "turnaround": "48 a 72 horas",
    "active": true,
    "notes": "¡NUNCA REFRIGERAR! Traslado inmediato a temperatura ambiente."
  },
  {
    "id": "mic-15",
    "category": "Microbiología",
    "name": "Cultivo de Líquido Sinovial (Articular)",
    "synonyms": [
      "cultivo liquido sinovial",
      "cultivo sinovial",
      "cultivo de liquido articular"
    ],
    "priceUsd": 43,
    "fastingHours": "Artrocentesis médica",
    "sampleType": "Líquido sinovial estéril",
    "turnaround": "48 a 72 horas",
    "active": true,
    "notes": "¡NUNCA REFRIGERAR! Traslado inmediato a temperatura ambiente."
  },
  {
    "id": "mic-16",
    "category": "Microbiología",
    "name": "Cultivo de Líquido Pericárdico",
    "synonyms": [
      "cultivo liquido pericardico",
      "cultivo pericardico"
    ],
    "priceUsd": 43,
    "fastingHours": "Pericardiocentesis médica",
    "sampleType": "Líquido pericárdico estéril",
    "turnaround": "48 a 72 horas",
    "active": true,
    "notes": "¡NUNCA REFRIGERAR! Traslado urgente a temperatura ambiente."
  },
  {
    "id": "mic-17",
    "category": "Microbiología",
    "name": "Cultivo de Líquido Peritoneal / Ascítico",
    "synonyms": [
      "cultivo liquido peritoneal",
      "cultivo liquido ascitico",
      "cultivo peritoneal",
      "cultivo ascitico"
    ],
    "priceUsd": 43,
    "fastingHours": "Paracentesis médica",
    "sampleType": "Líquido peritoneal/ascítico estéril",
    "turnaround": "48 a 72 horas",
    "active": true,
    "notes": "¡NUNCA REFRIGERAR! Traslado inmediato a temperatura ambiente."
  },
  {
    "id": "mic-18",
    "category": "Microbiología",
    "name": "Hemocultivo Automatizado",
    "synonyms": [
      "hemocultivo",
      "cultivo de sangre",
      "hemocultivos",
      "hemocultivo automatizado"
    ],
    "priceUsd": 49,
    "fastingHours": "Sin ayuno ni restricciones dietéticas",
    "sampleType": "Sangre inoculada en frasco comercial automatizado",
    "turnaround": "5 a 7 días",
    "active": true,
    "notes": "Toma venosa periférica rigurosamente aséptica al inicio de picos febriles o escalofríos. Mantener botellas a temperatura ambiente."
  },
  {
    "id": "mic-19",
    "category": "Microbiología",
    "name": "Estudio de Disbiosis Intestinal",
    "synonyms": [
      "disbiosis",
      "disbiosis intestinal",
      "microbiota disbiosis",
      "estudio de disbiosis intestinal"
    ],
    "priceUsd": 53,
    "fastingHours": "Sin ayuno",
    "sampleType": "Muestra fecal en frasco estéril (llenar 3/4 partes)",
    "turnaround": "48 a 72 horas",
    "active": true,
    "notes": "CRÍTICO: NO tomar antibióticos, antimicóticos, probióticos ni consumir yogurt durante al menos 15 días antes de recolectar la muestra."
  },
  {
    "id": "mic-20",
    "category": "Microbiología",
    "name": "Coloración de Gram",
    "synonyms": [
      "coloracion de gram",
      "tincion de gram",
      "gram"
    ],
    "priceUsd": 6,
    "fastingHours": "Sin condiciones especiales",
    "sampleType": "Frotis directo del espécimen en lámina portaobjetos",
    "turnaround": "2 a 4 horas",
    "active": true,
    "notes": "Diferenciación bacteriana Gram positiva vs Gram negativa y respuesta leucocitaria."
  },
  {
    "id": "mic-21",
    "category": "Microbiología",
    "name": "Coloración de Ziehl-Neelsen / Baciloscopia (BK)",
    "synonyms": [
      "ziehl neelsen",
      "bk",
      "baciloscopia",
      "baciloscopia bk",
      "coloracion de ziehl-neelsen / baciloscopia (bk)"
    ],
    "priceUsd": 6,
    "fastingHours": "En ayunas para esputo matutino",
    "sampleType": "Esputo / orina / biopsia líquida",
    "turnaround": "24 horas",
    "active": true,
    "notes": "Búsqueda directa de Bacilos Ácido-Alcohol Resistentes (BAAR / Tuberculosis)."
  },
  {
    "id": "mic-22",
    "category": "Microbiología",
    "name": "Examen Directo KOH (Hongos)",
    "synonyms": [
      "koh",
      "examen directo koh",
      "directo koh",
      "hidroxido de potasio"
    ],
    "priceUsd": 12,
    "fastingHours": "Sin cremas ni antimicóticos tópicos 7 días antes",
    "sampleType": "Raspado de escamas, uñas, pelos o secreciones",
    "turnaround": "2 a 4 horas",
    "active": true,
    "notes": "Disolución de queratina para visualización microscópica inmediata de hifas y esporas."
  },
  {
    "id": "mic-23",
    "category": "Microbiología",
    "name": "Examen de Demodex folliculorum",
    "synonyms": [
      "demodex",
      "demodex folliculorum",
      "examen de demodex folliculorum",
      "acaros pestañas demodex"
    ],
    "priceUsd": 12,
    "fastingHours": "Sin maquillaje ni cremas faciales 24h antes",
    "sampleType": "Depilación de pestañas / raspado de piel facial",
    "turnaround": "2 a 4 horas",
    "active": true,
    "notes": "Búsqueda microscópica de ácaros en folículos pilosos y pestañas."
  },
  {
    "id": "mic-24",
    "category": "Microbiología",
    "name": "Cultivo Micológico (Hongos en Piel, Uñas, Cabello)",
    "synonyms": [
      "cultivo micologico",
      "cultivo de hongos",
      "cultivo para hongos",
      "micologico"
    ],
    "priceUsd": 24,
    "fastingHours": "Sin antimicóticos tópicos u orales por 7 a 15 días previos",
    "sampleType": "Raspado de uñas, escamas de piel o cabellos afectados",
    "turnaround": "15 a 21 días (Examen directo KOH en 24h)",
    "active": true,
    "notes": "NO aplicar cosméticos, cremas, talcos ni esmaltes. No cortarse las uñas la semana previa."
  },
  {
    "id": "mic-25",
    "category": "Microbiología",
    "name": "Espermocultivo (Prueba de los 4 Vasos)",
    "synonyms": [
      "espermocultivo",
      "prueba de los 4 vasos",
      "cultivo de semen",
      "cultivo de liquido seminal",
      "espermocultivo 4 vasos"
    ],
    "priceUsd": 50,
    "fastingHours": "Abstinencia sexual de 2 a 3 días. Sin antibióticos 7-14 días.",
    "sampleType": "4 frascos estériles numerados (orinas fraccionadas + semen)",
    "turnaround": "48 a 72 horas",
    "active": true,
    "notes": "Técnica de Meares y Stamey para localización de infecciones urogenitales y prostatitis."
  },
  {
    "id": "mic-26",
    "category": "Microbiología",
    "name": "Cultivo Bacteriológico General",
    "synonyms": [
      "cultivo bacteriologico",
      "cultivo general",
      "cultivo bacteriologico general"
    ],
    "priceUsd": 40,
    "fastingHours": "Sin antibióticos 48-72h antes",
    "sampleType": "Muestra biológica según localización clínica",
    "turnaround": "48 a 72 horas",
    "active": true,
    "notes": "Cultivo estándar para identificación bacteriana."
  },
  {
    "id": "mic-27",
    "category": "Microbiología",
    "name": "Antifungigrama 6 Antifúngicos",
    "synonyms": [
      "antifungigrama 6",
      "antifungigrama de 6 antifungicos",
      "sensibilidad antifungica 6"
    ],
    "priceUsd": 37,
    "fastingHours": "Aislamiento de levaduras/hongos en cultivo previo",
    "sampleType": "Cepa fúngica aislada",
    "turnaround": "48 a 72 horas adicionales",
    "active": true,
    "notes": "Prueba de susceptibilidad antifúngica amplia con 6 fármacos."
  },
  {
    "id": "mic-28",
    "category": "Microbiología",
    "name": "Antifungigrama 3 Antifúngicos",
    "synonyms": [
      "antifungigrama 3",
      "antifungigrama de 3 antifungicos",
      "sensibilidad antifungica 3"
    ],
    "priceUsd": 17,
    "fastingHours": "Aislamiento de levaduras/hongos en cultivo previo",
    "sampleType": "Cepa fúngica aislada",
    "turnaround": "48 a 72 horas adicionales",
    "active": true,
    "notes": "Prueba de susceptibilidad antifúngica estándar con 3 fármacos."
  },
  {
    "id": "mic-29",
    "category": "Microbiología",
    "name": "Antifungigrama 2 Antifúngicos",
    "synonyms": [
      "antifungigrama 2",
      "antifungigrama de 2 antifungicos",
      "sensibilidad antifungica 2"
    ],
    "priceUsd": 10,
    "fastingHours": "Aislamiento de levaduras/hongos en cultivo previo",
    "sampleType": "Cepa fúngica aislada",
    "turnaround": "48 a 72 horas adicionales",
    "active": true,
    "notes": "Prueba de susceptibilidad antifúngica reducida con 2 fármacos."
  },
  {
    "id": "uri-1",
    "category": "Uroanálisis",
    "name": "Uroanálisis / Examen General de Orina",
    "synonyms": [
      "uroanalisis",
      "examen de orina",
      "examen general de orina",
      "orina completa",
      "ego"
    ],
    "priceUsd": 6,
    "fastingHours": "Primera orina de la mañana o retención mínima de 3-4 horas",
    "sampleType": "Orina de chorro medio en frasco estéril de farmacia",
    "turnaround": "2 a 4 horas",
    "active": true,
    "notes": "Aseo genital previo con agua y jabón neutro. Descartar el primer chorro y recolectar el chorro medio. Trasladar en menos de 2 horas."
  },
  {
    "id": "uri-2",
    "category": "Uroanálisis",
    "name": "Depuración de Creatinina en Orina de 24 Horas",
    "synonyms": [
      "depuracion de creatinina",
      "clearance de creatinina",
      "depuracion de creatinina 24h",
      "aclaramiento de creatinina"
    ],
    "priceUsd": 12,
    "fastingHours": "Requiere recolección de 24h + muestra de sangre en ayunas al entregar",
    "sampleType": "Volumen completo de orina de 24 horas + Suero",
    "turnaround": "6 a 12 horas",
    "active": true,
    "notes": "Día 1 a las 7:00 am orinar y descartar en inodoro. A partir de allí recolectar TODA la orina durante el día y la noche en un botellón limpio hasta las 7:00 am del día 2 inclusive. Mantener en refrigeración."
  },
  {
    "id": "uri-3",
    "category": "Uroanálisis",
    "name": "Microalbuminuria en Muestra Parcial",
    "synonyms": [
      "microalbuminuria",
      "microalbumina en orina",
      "microalbuminuria parcial"
    ],
    "priceUsd": 12,
    "fastingHours": "Primera orina de la mañana",
    "sampleType": "Orina de chorro medio",
    "turnaround": "4 horas",
    "active": true,
    "notes": "Detección precoz de daño glomerular renal en pacientes diabéticos e hipertensos."
  },
  {
    "id": "uri-4",
    "category": "Uroanálisis",
    "name": "Proteinuria en Muestra Parcial",
    "synonyms": [
      "proteinuria parcial",
      "proteinas en orina parcial",
      "proteinuria al azar"
    ],
    "priceUsd": 13,
    "fastingHours": "Primera orina de la mañana",
    "sampleType": "Orina en recolector estéril",
    "turnaround": "4 horas",
    "active": true,
    "notes": "Cuantificación puntual de proteínas urinarias."
  },
  {
    "id": "uri-5",
    "category": "Uroanálisis",
    "name": "Proteinuria en Orina de 24 Horas",
    "synonyms": [
      "proteinuria 24 horas",
      "proteinuria 24h",
      "proteinas en orina 24 horas"
    ],
    "priceUsd": 13,
    "fastingHours": "Recolección completa de 24 horas",
    "sampleType": "Orina de 24 horas refrigerada",
    "turnaround": "6 a 12 horas",
    "active": true,
    "notes": "Cuantificación de excreción total de proteínas en 24 horas."
  },
  {
    "id": "uri-6",
    "category": "Uroanálisis",
    "name": "Relaciones Urinarias (Calcio / Creatinina / Ácido Úrico)",
    "synonyms": [
      "relaciones urinarias",
      "relacion calcio creatinina",
      "indices urinarios"
    ],
    "priceUsd": 20,
    "fastingHours": "Primera orina de la mañana o recolección según orden médica",
    "sampleType": "Orina parcial o de 24h",
    "turnaround": "24 horas",
    "active": true,
    "notes": "Evaluación de litiasis renal y desórdenes tubulares."
  },
  {
    "id": "uri-7",
    "category": "Uroanálisis",
    "name": "Osmolaridad Urinaria",
    "synonyms": [
      "osmolaridad urinaria",
      "osmolaridad en orina"
    ],
    "priceUsd": 6,
    "fastingHours": "Sin ingesta hídrica forzada previa",
    "sampleType": "Orina fresca",
    "turnaround": "4 horas",
    "active": true,
    "notes": "Evaluación de la capacidad de concentración y dilución renal."
  },
  {
    "id": "uri-8",
    "category": "Uroanálisis",
    "name": "Concentraciones Urinarias en Orina de 24 Horas",
    "synonyms": [
      "concentraciones urinarias 24h",
      "panel metabolico urinario 24h",
      "electrolitos en orina 24h"
    ],
    "priceUsd": 20,
    "fastingHours": "Recolección estricta de 24 horas",
    "sampleType": "Orina de 24 horas refrigerada",
    "turnaround": "24 horas",
    "active": true,
    "notes": "Cuantificación de analitos y electrolitos excretados en 24 horas."
  },
  {
    "id": "uri-9",
    "category": "Uroanálisis",
    "name": "Relación Albúmina / Creatinina Urinaria (RAC)",
    "synonyms": [
      "relacion albumina creatinina",
      "rac",
      "indice albumina creatinina",
      "relacion albumina / cr"
    ],
    "priceUsd": 17,
    "fastingHours": "Primera orina de la mañana",
    "sampleType": "Orina de chorro medio",
    "turnaround": "4 a 6 horas",
    "active": true,
    "notes": "Cálculo estandarizado que corrige la excreción de albúmina por concentración urinaria."
  },
  {
    "id": "cop-1",
    "category": "Coproanálisis",
    "name": "Examen Coproparasitológico Simple",
    "synonyms": [
      "coproanalisis",
      "examen de heces",
      "heces simple",
      "parasitologico en heces",
      "coproparasitologico"
    ],
    "priceUsd": 6,
    "fastingHours": "Sin ayuno",
    "sampleType": "Muestra fecal fresca del tamaño de una nuez en frasco estéril",
    "turnaround": "2 a 4 horas",
    "active": true,
    "notes": "Evitar purgantes, supositorios o antiácidos. Trasladar al laboratorio en menos de 2 horas tras la evacuación."
  },
  {
    "id": "cop-2",
    "category": "Coproanálisis",
    "name": "Leucograma Fecal (Citología Fecal / Polimorfonucleares)",
    "synonyms": [
      "leucograma fecal",
      "citologia fecal",
      "polimorfonucleares en heces",
      "leucocitos en heces"
    ],
    "priceUsd": 11,
    "fastingHours": "Sin ayuno",
    "sampleType": "Muestra fecal fresca trasladada en < 1 hora",
    "turnaround": "2 a 4 horas",
    "active": true,
    "notes": "Diferenciación de diarrea inflamatoria / invasiva vs no inflamatoria."
  },
  {
    "id": "cop-3",
    "category": "Coproanálisis",
    "name": "Tinción de Sudán III (Grasas Neutras en Heces)",
    "synonyms": [
      "sudan iii",
      "tincion sudan iii",
      "grasas en heces sudan"
    ],
    "priceUsd": 11,
    "fastingHours": "Dieta con consumo habitual de grasas los 3 días previos",
    "sampleType": "Muestra fecal fresca",
    "turnaround": "4 horas",
    "active": true,
    "notes": "Detección microscópica de esteatorrea y malabsorción lipídica."
  },
  {
    "id": "cop-4",
    "category": "Coproanálisis",
    "name": "Concentrado de Heces (Método de Ritchie / Formol-Éter)",
    "synonyms": [
      "concentrado de heces",
      "metodo de ritchie",
      "concentracion fecal"
    ],
    "priceUsd": 20,
    "fastingHours": "Sin ayuno",
    "sampleType": "Muestra fecal en recolector adecuado",
    "turnaround": "6 a 12 horas",
    "active": true,
    "notes": "Técnica de enriquecimiento para aumentar la sensibilidad en la detección de quistes y huevos de parásitos."
  },
  {
    "id": "cop-5",
    "category": "Coproanálisis",
    "name": "Prueba de Absorción Intestinal (D-Xilosa / Azúcares Reductores)",
    "synonyms": [
      "absorcion intestinal",
      "prueba de absorcion intestinal",
      "azucares reductores en heces"
    ],
    "priceUsd": 11,
    "fastingHours": "Sin ayuno para muestra fecal",
    "sampleType": "Muestra fecal recién emitida",
    "turnaround": "4 a 6 horas",
    "active": true,
    "notes": "Evaluación de intolerancia a carbohidratos y síndrome de malabsorción."
  },
  {
    "id": "cop-6",
    "category": "Coproanálisis",
    "name": "Test de Graham Masculino (Búsqueda de Oxiuros / Enterobius)",
    "synonyms": [
      "test de graham",
      "graham masculino",
      "enterobius vermicularis",
      "cinta engomada oxiuros"
    ],
    "priceUsd": 11,
    "fastingHours": "Al despertar, sin baño ni aseo perianal y antes de evacuar",
    "sampleType": "Cinta adhesiva transparente aplicada en márgenes perianales adherida a lámina portaobjetos",
    "turnaround": "4 horas",
    "active": true,
    "notes": "Toma matutina rigurosa antes de levantarse o asearse."
  },
  {
    "id": "cop-7",
    "category": "Coproanálisis",
    "name": "Test de Graham Femenino",
    "synonyms": [
      "graham femenino",
      "test de graham femenino"
    ],
    "priceUsd": 13,
    "fastingHours": "Al despertar, sin aseo perianal ni vulvar previo",
    "sampleType": "Cinta engomada perianal sobre lámina",
    "turnaround": "4 horas",
    "active": true,
    "notes": "Incluye evaluación de márgenes perianales y orificio vulvar."
  },
  {
    "id": "cop-8",
    "category": "Coproanálisis",
    "name": "Coproantígenos de Helicobacter pylori en Heces",
    "synonyms": [
      "coproantigenos h pylori",
      "antigeno h pylori en heces",
      "h pylori en heces"
    ],
    "priceUsd": 13.5,
    "fastingHours": "Sin ayuno. Suspender antibióticos y bismuto 4 semanas antes, y protectores gástricos (IBP) 2 semanas antes.",
    "sampleType": "Muestra fecal en recolector estéril",
    "turnaround": "4 a 6 horas",
    "active": true,
    "notes": "Prueba de elección no invasiva para diagnóstico y confirmación de erradicación de H. pylori."
  },
  {
    "id": "cop-9",
    "category": "Coproanálisis",
    "name": "Esteatocrito Ácido (Cuantificación de Grasa Fecal)",
    "synonyms": [
      "esteatocrito acido",
      "esteatocrito",
      "grasa fecal acida"
    ],
    "priceUsd": 10,
    "fastingHours": "Sin ayuno. Dieta normal con grasas.",
    "sampleType": "Muestra fecal fresca trasladada en < 2 horas",
    "turnaround": "6 horas",
    "active": true,
    "notes": "Evitar supositorios, laxantes oleosos y cremas lubricantes."
  },
  {
    "id": "cop-10",
    "category": "Coproanálisis",
    "name": "Técnica de Kato-Katz (Recuento de Huevos de Helmintos)",
    "synonyms": [
      "kato katz",
      "tecnica de kato katz",
      "kato-katz",
      "recuento de huevos helmintos"
    ],
    "priceUsd": 10,
    "fastingHours": "Sin ayuno",
    "sampleType": "Muestra fecal fresca",
    "turnaround": "6 a 12 horas",
    "active": true,
    "notes": "Cuantificación de intensidad de carga parasitaria helmíntica (Ascaris, Trichuris, Schistosoma)."
  },
  {
    "id": "cop-11",
    "category": "Coproanálisis",
    "name": "Tinción de Quensel (Trofozoítos de Protozoarios)",
    "synonyms": [
      "tincion de quensel",
      "quensel",
      "protozoarios quensel"
    ],
    "priceUsd": 10,
    "fastingHours": "Sin ayuno",
    "sampleType": "Muestra fecal fresca líquida / pastosa trasladada de inmediato",
    "turnaround": "2 a 4 horas",
    "active": true,
    "notes": "Tinción supravital rápida para identificación de trofozoítos de amebas móviles."
  },
  {
    "id": "cop-12",
    "category": "Coproanálisis",
    "name": "Tinción de Nair (Amebas y Flagelados)",
    "synonyms": [
      "tincion de nair",
      "nair",
      "coloracion nair"
    ],
    "priceUsd": 10,
    "fastingHours": "Sin ayuno",
    "sampleType": "Muestra fecal fresca inmediata",
    "turnaround": "2 a 4 horas",
    "active": true,
    "notes": "Tinción con azul de metileno tamponado para citomorfología protozoaria."
  },
  {
    "id": "cop-13",
    "category": "Coproanálisis",
    "name": "Ziehl-Neelsen Modificado / Tinción de Kinyoun (Coccidios)",
    "synonyms": [
      "kinyoun",
      "ziehl neelsen modificado",
      "coccidios heces",
      "cryptosporidium tincion"
    ],
    "priceUsd": 7,
    "fastingHours": "Sin ayuno",
    "sampleType": "Frotis de heces en lámina",
    "turnaround": "4 a 6 horas",
    "active": true,
    "notes": "Búsqueda específica de ooquistes de Cryptosporidium, Cyclospora e Isospora / Cystoisospora."
  },
  {
    "id": "cop-14",
    "category": "Coproanálisis",
    "name": "Sangre Oculta en Heces (FIT Inmunoquímica Específica)",
    "synonyms": [
      "sangre oculta en heces",
      "sangre oculta",
      "sangre oculta fit",
      "thevenon",
      "hemoglobina humana heces"
    ],
    "priceUsd": 25,
    "fastingHours": "Sin ayuno. No requiere dieta restrictiva de carnes rojas (anticuerpo monoclonal anti-Hb humana).",
    "sampleType": "Muestra fecal en frasco estéril",
    "turnaround": "4 horas",
    "active": true,
    "notes": "Tamizaje colorrectal de alta especificidad. Evitar contaminación con sangrado menstrual o hemorroidal activo."
  },
  {
    "id": "cop-15",
    "category": "Coproanálisis",
    "name": "Sangre Oculta + Transferrina en Heces",
    "synonyms": [
      "sangre oculta y transferrina",
      "sangre oculta + transferrina",
      "transferrina en heces"
    ],
    "priceUsd": 15,
    "fastingHours": "Sin ayuno",
    "sampleType": "Muestra fecal fresca",
    "turnaround": "4 horas",
    "active": true,
    "notes": "Doble marcador para hemorragias tanto del tracto digestivo superior (Transferrina) como inferior (Hemoglobina)."
  },
  {
    "id": "cop-16",
    "category": "Coproanálisis",
    "name": "Coproantígeno Entamoeba histolytica",
    "synonyms": [
      "antigeno entamoeba histolytica",
      "coproantigeno entamoeba histolytica",
      "ag entamoeba histolytica"
    ],
    "priceUsd": 26,
    "fastingHours": "Sin ayuno",
    "sampleType": "Muestra fecal en frasco estéril entregada en < 2 horas",
    "turnaround": "4 a 6 horas",
    "active": true,
    "notes": "Diferenciación antigénica específica de Entamoeba histolytica patógena vs Entamoeba dispar no patógena."
  },
  {
    "id": "cop-17",
    "category": "Coproanálisis",
    "name": "Panel Triple Coproantígenos (E. histolytica + Giardia + Cryptosporidium)",
    "synonyms": [
      "panel triple coproantigenos",
      "coproantigenos triple",
      "antigenos giardia entamoeba crypto",
      "panel ag triple"
    ],
    "priceUsd": 40,
    "fastingHours": "Sin ayuno",
    "sampleType": "Muestra fecal fresca",
    "turnaround": "6 horas",
    "active": true,
    "notes": "Detección inmunocromatográfica rápida simultánea de los 3 principales parásitos entéricos."
  },
  {
    "id": "mar-1",
    "category": "Marcadores",
    "name": "PSA Total (Antígeno Prostático Específico)",
    "synonyms": [
      "psa",
      "psa total",
      "antigeno prostatico total",
      "antigeno prostatico especifico"
    ],
    "priceUsd": 14,
    "fastingHours": "Ayuno de 8 horas. Abstinencia sexual estricta de 48h.",
    "sampleType": "Suero no hemolizado",
    "turnaround": "24 horas",
    "active": true,
    "notes": "CRÍTICO: No haber tenido relaciones sexuales, eyaculación, tacto rectal ni montar bicicleta/moto en las 48 horas previas."
  },
  {
    "id": "mar-2",
    "category": "Marcadores",
    "name": "PSA Libre",
    "synonyms": [
      "psa libre",
      "antigeno prostatico libre"
    ],
    "priceUsd": 14,
    "fastingHours": "Ayuno de 8 horas. Abstinencia sexual de 48h.",
    "sampleType": "Suero",
    "turnaround": "24 horas",
    "active": true,
    "notes": "Utilizado para calcular la relación PSA Libre / PSA Total en sospecha de patología prostática."
  },
  {
    "id": "mar-3",
    "category": "Marcadores",
    "name": "AFP (Alfa-fetoproteína)",
    "synonyms": [
      "afp",
      "alfafetoproteina",
      "alfa fetoproteina"
    ],
    "priceUsd": 12,
    "fastingHours": "Ayuno de 8 horas",
    "sampleType": "Suero",
    "turnaround": "24 horas",
    "active": true,
    "notes": "Marcador tumoral hepático y gonadal germinal."
  },
  {
    "id": "mar-4",
    "category": "Marcadores",
    "name": "CEA (Antígeno Carcinoembrionario)",
    "synonyms": [
      "cea",
      "antigeno carcinoembrionario"
    ],
    "priceUsd": 12,
    "fastingHours": "Ayuno de 8 horas",
    "sampleType": "Suero",
    "turnaround": "24 horas",
    "active": true,
    "notes": "Marcador tumoral gastrointestinal y colorrectal. Indicar hábito tabáquico."
  },
  {
    "id": "mar-5",
    "category": "Marcadores",
    "name": "CA 125 (Marcador de Ovario)",
    "synonyms": [
      "ca 125",
      "ca125",
      "marcador ovario"
    ],
    "priceUsd": 12,
    "fastingHours": "Ayuno de 8 horas",
    "sampleType": "Suero",
    "turnaround": "24 horas",
    "active": true,
    "notes": "Marcador tumoral ovárico. No tomar la muestra durante el período menstrual activo."
  },
  {
    "id": "mar-6",
    "category": "Marcadores",
    "name": "CA 15-3 (Marcador de Mama)",
    "synonyms": [
      "ca 15-3",
      "ca15-3",
      "ca 15 3",
      "marcador mama"
    ],
    "priceUsd": 12,
    "fastingHours": "Ayuno de 8 horas",
    "sampleType": "Suero",
    "turnaround": "24 horas",
    "active": true,
    "notes": "Monitoreo de cáncer de mama."
  },
  {
    "id": "mar-7",
    "category": "Marcadores",
    "name": "CA 19-9 (Marcador Gastrointestinal / Pancreático)",
    "synonyms": [
      "ca 19-9",
      "ca19-9",
      "ca 19 9",
      "marcador pancreas"
    ],
    "priceUsd": 12,
    "fastingHours": "Ayuno de 8 horas",
    "sampleType": "Suero",
    "turnaround": "24 horas",
    "active": true,
    "notes": "Monitoreo de neoplasias pancreáticas y de vía biliar."
  },
  {
    "id": "mar-8",
    "category": "Marcadores",
    "name": "Anti-CCP (Anticuerpos Antipéptido Cíclico Citrulinado)",
    "synonyms": [
      "anti ccp",
      "anti-ccp",
      "peptido ciclico citrulinado",
      "anticuerpos anti ccp"
    ],
    "priceUsd": 22,
    "fastingHours": "Ayuno de 8 horas",
    "sampleType": "Suero",
    "turnaround": "24 a 48 horas",
    "active": true,
    "notes": "Marcador altamente específico para diagnóstico temprano de Artritis Reumatoide."
  },
  {
    "id": "mar-9",
    "category": "Marcadores",
    "name": "Anti-Tiroglobulina (Anti-TG)",
    "synonyms": [
      "anti tiroglobulina",
      "anti-tg",
      "anticuerpos anti tiroglobulina"
    ],
    "priceUsd": 15,
    "fastingHours": "Ayuno de 8 horas",
    "sampleType": "Suero",
    "turnaround": "24 horas",
    "active": true,
    "notes": "Autoanticuerpos tiroideos en tiroiditis de Hashimoto."
  },
  {
    "id": "mar-10",
    "category": "Marcadores",
    "name": "Anti-TPO (Antiperoxidasa Tiroidea / Microsomales)",
    "synonyms": [
      "anti tpo",
      "anti-tpo",
      "antiperoxidasa tiroidea",
      "anticuerpos microsomales"
    ],
    "priceUsd": 15,
    "fastingHours": "Ayuno de 8 horas",
    "sampleType": "Suero",
    "turnaround": "24 horas",
    "active": true,
    "notes": "Marcador de autoinmunidad tiroidea."
  },
  {
    "id": "esp-1",
    "category": "Pruebas Especiales",
    "name": "Gases Venosos",
    "synonyms": [
      "gases venosos",
      "gasometria venosa"
    ],
    "priceUsd": 68,
    "fastingHours": "Sin ayuno estricto",
    "sampleType": "Sangre venosa en jeringa heparinizada anaeróbica (traslado en hielo)",
    "turnaround": "1 a 2 horas",
    "active": true,
    "notes": "Toma anaeróbica estricta. Traslado inmediato con sellado hermético."
  },
  {
    "id": "esp-2",
    "category": "Pruebas Especiales",
    "name": "Gases Arteriales",
    "synonyms": [
      "gases arteriales",
      "gasometria arterial"
    ],
    "priceUsd": 68,
    "fastingHours": "Sin ayuno estricto",
    "sampleType": "Sangre arterial en jeringa heparinizada (traslado en hielo)",
    "turnaround": "1 a 2 horas",
    "active": true,
    "notes": "Punción de arteria radial / humeral / femoral con prueba de Allen previa."
  },
  {
    "id": "esp-3",
    "category": "Pruebas Especiales",
    "name": "Hemoglobina Glicosilada (HbA1c)",
    "synonyms": [
      "hba1c",
      "hemoglobina glicosilada",
      "glicosilada",
      "a1c"
    ],
    "priceUsd": 18,
    "fastingHours": "Ayuno ligero de 4 a 8 horas",
    "sampleType": "Sangre total (Tubo EDTA)",
    "turnaround": "4 horas",
    "active": true,
    "notes": "Control metabólico glucémico promedio de los últimos 3 meses."
  },
  {
    "id": "esp-4",
    "category": "Pruebas Especiales",
    "name": "Estudio de Ehrlichia en Capa Blanca",
    "synonyms": [
      "ehrlichia",
      "erlichia",
      "capa blanca ehrlichia",
      "estudio de ehrlichia en capa blanca"
    ],
    "priceUsd": 13,
    "fastingHours": "Ayuno de 4 horas",
    "sampleType": "Sangre total EDTA centrifugada (Capa leucocitaria / Buffy coat)",
    "turnaround": "24 horas",
    "active": true,
    "notes": "Búsqueda microscópica de mórulas intracitoplasmáticas de Ehrlichia en leucocitos."
  },
  {
    "id": "esp-5",
    "category": "Pruebas Especiales",
    "name": "Reacciones Febriles / Antígenos Febriles (Test de Widal)",
    "synonyms": [
      "reacciones febriles",
      "antigenos febriles",
      "widal",
      "test de widal",
      "febriles"
    ],
    "priceUsd": 15,
    "fastingHours": "Ayuno de 4 a 6 horas",
    "sampleType": "Suero",
    "turnaround": "4 a 6 horas",
    "active": true,
    "notes": "Aglutininas febriles para Tifoidea (Tífico O y H), Paratífico A y B, Brucella y Proteus OX19."
  },
  {
    "id": "esp-6",
    "category": "Pruebas Especiales",
    "name": "Citología Ginecológica (Papanicolaou / Citología Cervical)",
    "synonyms": [
      "citologia",
      "papanicolaou",
      "citologia ginecologica",
      "citologia cervical",
      "pap"
    ],
    "priceUsd": 9,
    "fastingHours": "Sin relaciones sexuales 48h. Sin duchas, óvulos ni menstruación 5 días antes.",
    "sampleType": "Frotis endocervical y ectocervical fijado en alcohol al 95%",
    "turnaround": "3 a 5 días hábiles",
    "active": true,
    "notes": "Toma realizada por especialista en ginecología o citólogo."
  },
  {
    "id": "esp-7",
    "category": "Pruebas Especiales",
    "name": "Citología de Líquido Cefalorraquídeo (LCR)",
    "synonyms": [
      "citologia lcr",
      "citologia de lcr",
      "citologia liquido cefalorraquideo"
    ],
    "priceUsd": 21,
    "fastingHours": "Punción médica",
    "sampleType": "LCR fresco en tubo EDTA",
    "turnaround": "24 horas",
    "active": true,
    "notes": "Estudio de celularidad microscópica en líquido cefalorraquídeo."
  },
  {
    "id": "esp-8",
    "category": "Pruebas Especiales",
    "name": "Citología Urinaria en 3 Muestras Seriadas",
    "synonyms": [
      "citologia urinaria",
      "citologia de orina",
      "citologia urinaria 3 muestras",
      "citologia urinaria en 3 muestras seriadas"
    ],
    "priceUsd": 63,
    "fastingHours": "Segunda orina matutina recolectada durante 3 días consecutivos",
    "sampleType": "3 frascos de orina con fijador alcohólico 50%",
    "turnaround": "3 a 5 días hábiles",
    "active": true,
    "notes": "Descartar la 1era orina, beber 2 vasos de agua y recoger la orina siguiente. Repetir 3 días consecutivos."
  },
  {
    "id": "esp-9",
    "category": "Pruebas Especiales",
    "name": "Citología de Líquido Sinovial (Articular)",
    "synonyms": [
      "citologia sinovial",
      "citologia de liquido sinovial"
    ],
    "priceUsd": 21,
    "fastingHours": "Artrocentesis médica",
    "sampleType": "Líquido sinovial fresco en tubo con EDTA",
    "turnaround": "24 horas",
    "active": true,
    "notes": "Evaluación citomorfológica y de cristales."
  },
  {
    "id": "esp-10",
    "category": "Pruebas Especiales",
    "name": "Citología de Líquido Pleural",
    "synonyms": [
      "citologia pleural",
      "citologia de liquido pleural"
    ],
    "priceUsd": 21,
    "fastingHours": "Toracocentesis médica",
    "sampleType": "Líquido pleural en tubo con EDTA",
    "turnaround": "24 horas",
    "active": true,
    "notes": "Búsqueda de células neoplásicas o mesoteliales."
  },
  {
    "id": "esp-11",
    "category": "Pruebas Especiales",
    "name": "Citología de Líquido Pericárdico",
    "synonyms": [
      "citologia pericardica",
      "citologia de liquido pericardico"
    ],
    "priceUsd": 21,
    "fastingHours": "Pericardiocentesis médica",
    "sampleType": "Líquido pericárdico en tubo con EDTA",
    "turnaround": "24 horas",
    "active": true,
    "notes": "Estudio de derrames pericárdicos."
  },
  {
    "id": "esp-12",
    "category": "Pruebas Especiales",
    "name": "Citología de Líquido Peritoneal / Ascítico",
    "synonyms": [
      "citologia peritoneal",
      "citologia ascitica",
      "citologia de liquido peritoneal"
    ],
    "priceUsd": 21,
    "fastingHours": "Paracentesis médica",
    "sampleType": "Líquido ascítico/peritoneal en tubo con EDTA",
    "turnaround": "24 horas",
    "active": true,
    "notes": "Evaluación de ascitis maligna vs reactiva."
  },
  {
    "id": "esp-13",
    "category": "Pruebas Especiales",
    "name": "Gota Gruesa para Paludismo / Malaria",
    "synonyms": [
      "gota gruesa",
      "malaria",
      "paludismo",
      "plasmodium",
      "gota gruesa paludismo"
    ],
    "priceUsd": 13,
    "fastingHours": "Sin ayuno",
    "sampleType": "Sangre capilar o venosa al momento de los accesos febriles",
    "turnaround": "2 a 4 horas",
    "active": true,
    "notes": "Búsqueda microscópica directa de trofozoítos y esquizontes de Plasmodium vivax / falciparum."
  },
  {
    "id": "esp-14",
    "category": "Pruebas Especiales",
    "name": "Vitamina B12 (Cobalamina)",
    "synonyms": [
      "vitamina b12",
      "b12",
      "cobalamina",
      "cianocobalamina"
    ],
    "priceUsd": 23,
    "fastingHours": "Ayuno estricto de 8 a 10 horas",
    "sampleType": "Suero protegido de la luz",
    "turnaround": "24 a 48 horas",
    "active": true,
    "notes": "Suspender suplementos vitamínicos del complejo B 48h antes."
  },
  {
    "id": "esp-15",
    "category": "Pruebas Especiales",
    "name": "Vitamina D (25-OH Vitamina D)",
    "synonyms": [
      "vitamina d",
      "25-oh vitamina d",
      "25 hidroxi vitamina d",
      "vitamina d total"
    ],
    "priceUsd": 20,
    "fastingHours": "Ayuno de 8 horas",
    "sampleType": "Suero",
    "turnaround": "24 horas",
    "active": true,
    "notes": "Evaluación del estado corporal de Vitamina D y metabolismo óseo."
  },
  {
    "id": "esp-16",
    "category": "Pruebas Especiales",
    "name": "Ácido Fólico Sérico (Folatos)",
    "synonyms": [
      "acido folico",
      "folatos",
      "vitamina b9",
      "folato serico"
    ],
    "priceUsd": 23,
    "fastingHours": "Ayuno de 8 horas",
    "sampleType": "Suero protegido de la luz",
    "turnaround": "24 a 48 horas",
    "active": true,
    "notes": "No ingerir suplementos de ácido fólico 24h antes."
  },
  {
    "id": "cit-1",
    "category": "Citoquímicos y Perfiles",
    "name": "Citoquímico de Líquido Cefalorraquídeo (LCR)",
    "synonyms": [
      "citoquimico lcr",
      "citoquimico de lcr",
      "citoquimico liquido cefalorraquideo"
    ],
    "priceUsd": 25,
    "fastingHours": "No requiere ayuno estricto",
    "sampleType": "LCR en 3 tubos + Sangre paralela",
    "turnaround": "4 a 6 horas",
    "active": true,
    "notes": "Incluye proteínas, glucosa, recuento celular total y diferencial, y aspecto físico."
  },
  {
    "id": "cit-2",
    "category": "Citoquímicos y Perfiles",
    "name": "Citoquímico de LCR + Coloración de Gram",
    "synonyms": [
      "citoquimico lcr mas gram",
      "citoquimico lcr gram",
      "citoquimico de lcr + coloracion de gram"
    ],
    "priceUsd": 31,
    "fastingHours": "No requiere ayuno",
    "sampleType": "LCR en tubos estériles",
    "turnaround": "4 horas",
    "active": true,
    "notes": "Análisis citoquímico completo más tinción rápida de Gram para detección bacteriana urgente."
  },
  {
    "id": "cit-3",
    "category": "Citoquímicos y Perfiles",
    "name": "Citoquímico de Líquido Sinovial (Articular)",
    "synonyms": [
      "citoquimico sinovial",
      "citoquimico liquido sinovial"
    ],
    "priceUsd": 35,
    "fastingHours": "No requiere ayuno",
    "sampleType": "Líquido sinovial en tubo con heparina y tubo seco",
    "turnaround": "12 a 24 horas",
    "active": true,
    "notes": "Evaluación de viscosidad, test de mucina, glucosa, proteínas y recuento leucocitario."
  },
  {
    "id": "cit-4",
    "category": "Citoquímicos y Perfiles",
    "name": "Citoquímico de Líquido Sinovial + Coloración de Gram",
    "synonyms": [
      "citoquimico sinovial gram",
      "citoquimico sinovial mas gram"
    ],
    "priceUsd": 41,
    "fastingHours": "No requiere ayuno",
    "sampleType": "Líquido articular en tubos estériles",
    "turnaround": "12 a 24 horas",
    "active": true,
    "notes": "Citoquímico articular completo con tinción de Gram para artritis séptica."
  },
  {
    "id": "cit-5",
    "category": "Citoquímicos y Perfiles",
    "name": "Citoquímico de Líquido Pleural",
    "synonyms": [
      "citoquimico pleural",
      "citoquimico liquido pleural",
      "citoquimico de liquido pleural"
    ],
    "priceUsd": 27,
    "fastingHours": "No requiere ayuno estricto",
    "sampleType": "Líquido pleural + Muestra de sangre en suero",
    "turnaround": "12 a 24 horas",
    "active": true,
    "notes": "Criterios de Light para diferenciación de trasudado vs exudado (Proteínas y LDH pleural/sérica)."
  },
  {
    "id": "cit-6",
    "category": "Citoquímicos y Perfiles",
    "name": "Citoquímico de Líquido Pleural + Coloración de Gram",
    "synonyms": [
      "citoquimico pleural gram",
      "citoquimico pleural mas gram",
      "citoquimico de liquido pleural + coloracion de gram"
    ],
    "priceUsd": 32,
    "fastingHours": "No requiere ayuno estricto",
    "sampleType": "Líquido pleural en 3 tubos + Sangre",
    "turnaround": "12 a 24 horas",
    "active": true,
    "notes": "Incluye tinción de Gram para investigación inmediata de empiema o bacterias."
  },
  {
    "id": "cit-7",
    "category": "Citoquímicos y Perfiles",
    "name": "Citoquímico de Líquido Pericárdico",
    "synonyms": [
      "citoquimico pericardico",
      "citoquimico liquido pericardico"
    ],
    "priceUsd": 36,
    "fastingHours": "No requiere ayuno estricto",
    "sampleType": "Líquido pericárdico en tubos estériles + Suero",
    "turnaround": "12 a 24 horas",
    "active": true,
    "notes": "Evaluación bioquímica y celular del derrame pericárdico."
  },
  {
    "id": "cit-8",
    "category": "Citoquímicos y Perfiles",
    "name": "Citoquímico de Líquido Pericárdico + Coloración de Gram",
    "synonyms": [
      "citoquimico pericardico gram",
      "citoquimico pericardico mas gram"
    ],
    "priceUsd": 42,
    "fastingHours": "No requiere ayuno",
    "sampleType": "Líquido pericárdico estéril + Suero",
    "turnaround": "12 a 24 horas",
    "active": true,
    "notes": "Citoquímico pericárdico completo con tinción de Gram para pericarditis purulenta."
  },
  {
    "id": "cit-9",
    "category": "Citoquímicos y Perfiles",
    "name": "Citoquímico de Líquido Peritoneal / Ascítico",
    "synonyms": [
      "citoquimico peritoneal",
      "citoquimico liquido peritoneal",
      "citoquimico ascitico"
    ],
    "priceUsd": 32,
    "fastingHours": "No requiere ayuno estricto",
    "sampleType": "Líquido ascítico en tubos estériles + Suero",
    "turnaround": "12 a 24 horas",
    "active": true,
    "notes": "Gradiente de Albúmina Suero-Ascitis (GASA), recuento leucocitario y proteínas totales."
  },
  {
    "id": "cit-10",
    "category": "Citoquímicos y Perfiles",
    "name": "Citoquímico de Líquido Peritoneal + Coloración de Gram",
    "synonyms": [
      "citoquimico peritoneal gram",
      "citoquimico peritoneal mas gram"
    ],
    "priceUsd": 41,
    "fastingHours": "No requiere ayuno",
    "sampleType": "Líquido ascítico estéril + Suero",
    "turnaround": "12 a 24 horas",
    "active": true,
    "notes": "Citoquímico ascítico completo con tinción de Gram para descartar peritonitis bacteriana espontánea."
  },
  {
    "id": "caracas-1",
    "category": "Convenio Torre Caracas",
    "name": "Panel RAST Alimentos (20 / 60 / 90 / 120 Alimentos IgE)",
    "synonyms": [
      "rast 120 alimentos",
      "rast 20 alimentos",
      "rast 60 alimentos",
      "rast 90 alimentos",
      "rast alimentos",
      "panel rast alimentos"
    ],
    "priceUsd": 0,
    "fastingHours": "Ayuno de 8 horas. Coordinación especial con secretaría.",
    "sampleType": "Suero / Muestra para envío a Caracas",
    "turnaround": "7 a 10 días hábiles",
    "active": true,
    "isCaracasConvenio": true,
    "notes": "CONVENIO TORRE CARACAS: Gonzalez Prato Laboratorio actúa como enlace de recolección y envío. Requiere cotización por secretaría."
  },
  {
    "id": "caracas-2",
    "category": "Convenio Torre Caracas",
    "name": "Panel RAST Inhalantes & Alimentos Completo (58 Alérgenos IgE)",
    "synonyms": [
      "rast alim e inhal completo",
      "rast 58 alergenos",
      "rast inhalantes",
      "panel de alergias inhalantes"
    ],
    "priceUsd": 0,
    "fastingHours": "Ayuno de 8 horas. Remisión a Caracas.",
    "sampleType": "Suero",
    "turnaround": "7 a 10 días hábiles",
    "active": true,
    "isCaracasConvenio": true,
    "notes": "CONVENIO TORRE CARACAS: Enlace de recolección y envío a Caracas."
  },
  {
    "id": "caracas-3",
    "category": "Convenio Torre Caracas",
    "name": "Perfil Celíaco (Pauta Mundial / Con Genética)",
    "synonyms": [
      "perfil celiaco",
      "perfil celiaco pauta mundial",
      "perfil celiaco con genetica",
      "test genetico para gluten",
      "celiaquia"
    ],
    "priceUsd": 0,
    "fastingHours": "Ayuno de 8 horas. Remisión a Caracas.",
    "sampleType": "Suero / Sangre total EDTA para genética",
    "turnaround": "10 a 15 días hábiles",
    "active": true,
    "isCaracasConvenio": true,
    "notes": "CONVENIO TORRE CARACAS: Incluye anti-transglutaminasa IgA, anti-gliadina e HLA-DQ2/DQ8."
  },
  {
    "id": "caracas-4",
    "category": "Convenio Torre Caracas",
    "name": "Anticuerpos Anti-Gliadina / Anti-Transglutaminasa (IgA / IgG)",
    "synonyms": [
      "anti gliadina",
      "anti-gliadina",
      "anti transglutaminasa",
      "anti-transglutaminasa",
      "gluten ige",
      "gluten igg"
    ],
    "priceUsd": 0,
    "fastingHours": "Ayuno de 8 horas",
    "sampleType": "Suero",
    "turnaround": "7 a 10 días hábiles",
    "active": true,
    "isCaracasConvenio": true,
    "notes": "CONVENIO TORRE CARACAS: Remisión a Caracas. Contactar a secretaría."
  },
  {
    "id": "caracas-5",
    "category": "Convenio Torre Caracas",
    "name": "Zonulina Fecal / Sérica",
    "synonyms": [
      "zonulina",
      "zonulina fecal",
      "zonulina serica",
      "hiperpermeabilidad intestinal"
    ],
    "priceUsd": 0,
    "fastingHours": "Ayuno de 8 horas para suero / muestra fecal para heces",
    "sampleType": "Suero o heces",
    "turnaround": "10 a 15 días hábiles",
    "active": true,
    "isCaracasConvenio": true,
    "notes": "CONVENIO TORRE CARACAS: Marcador de hiperpermeabilidad intestinal. Remisión a Caracas."
  },
  {
    "id": "caracas-6",
    "category": "Convenio Torre Caracas",
    "name": "Serología de Infecciones Vectoriales (Borrelia / Lyme, Babesia, Rickettsia, Anaplasma, PCR Ehrlichia)",
    "synonyms": [
      "borrelia",
      "lyme",
      "borrelia burgdorferi",
      "babesia",
      "rickettsia",
      "anaplasma",
      "pcr erlichia"
    ],
    "priceUsd": 0,
    "fastingHours": "Ayuno de 8 horas",
    "sampleType": "Suero / Sangre total",
    "turnaround": "10 a 15 días hábiles",
    "active": true,
    "isCaracasConvenio": true,
    "notes": "CONVENIO TORRE CARACAS: Panel especializado de coinfecciones por garrapatas y vectores. Remisión a Caracas."
  },
  {
    "id": "caracas-7",
    "category": "Convenio Torre Caracas",
    "name": "Subclases de Inmunoglobulinas (IgG1, IgG2, IgG3, IgG4, IgA, IgM, IgG)",
    "synonyms": [
      "subclases igg",
      "subclase ig g1",
      "subclase ig g2",
      "subclase ig g3",
      "subclase ig g4",
      "subclases de inmunoglobulinas"
    ],
    "priceUsd": 0,
    "fastingHours": "Ayuno de 8 horas",
    "sampleType": "Suero",
    "turnaround": "7 a 10 días hábiles",
    "active": true,
    "isCaracasConvenio": true,
    "notes": "CONVENIO TORRE CARACAS: Estudio de inmunodeficiencias y enfermedades relacionadas con IgG4. Remisión a Caracas."
  },
  {
    "id": "caracas-8",
    "category": "Convenio Torre Caracas",
    "name": "Ácido Valproico (Drogas Terapéuticas / IgE)",
    "synonyms": [
      "acido valproico",
      "valproato",
      "drog terap acido valproico",
      "acido valproico ige"
    ],
    "priceUsd": 0,
    "fastingHours": "Toma previa a la siguiente dosis del medicamento (nivel valle)",
    "sampleType": "Suero",
    "turnaround": "5 a 7 días hábiles",
    "active": true,
    "isCaracasConvenio": true,
    "notes": "CONVENIO TORRE CARACAS: Monitoreo de niveles terapéuticos. Remisión a Caracas."
  },
  {
    "id": "caracas-9",
    "category": "Convenio Torre Caracas",
    "name": "Homocisteína en Sangre",
    "synonyms": [
      "homocisteina",
      "homocisteina en sangre",
      "riesgo cardiovascular homocisteina"
    ],
    "priceUsd": 0,
    "fastingHours": "Ayuno estricto de 10 a 12 horas",
    "sampleType": "Plasma desproteinizado / centrifugado de inmediato",
    "turnaround": "7 a 10 días hábiles",
    "active": true,
    "notes": "CONVENIO TORRE CARACAS: Evaluación de trombofilia y riesgo cardiovascular."
  },
  {
    "id": "caracas-10",
    "category": "Convenio Torre Caracas",
    "name": "IgA Secretora en Saliva",
    "synonyms": [
      "iga secretora",
      "iga secretora en saliva",
      "iga saliva"
    ],
    "priceUsd": 0,
    "fastingHours": "En ayunas, sin comer ni cepillarse los dientes 1h antes",
    "sampleType": "Saliva estéril",
    "turnaround": "10 a 15 días hábiles",
    "active": true,
    "notes": "CONVENIO TORRE CARACAS: Evaluación de inmunidad de mucosas. Remisión a Caracas."
  },
  {
    "id": "caracas-11",
    "category": "Convenio Torre Caracas",
    "name": "Paneles de Alérgenos Específicos (Caseína, Leches, Huevo, Ácaros, Venenos)",
    "synonyms": [
      "caseina ige",
      "leche de vaca ige",
      "leche de bufala ige",
      "leche de cabra ige",
      "huevo y componentes ige",
      "mezcla de acaros ige"
    ],
    "priceUsd": 0,
    "fastingHours": "Ayuno de 8 horas",
    "sampleType": "Suero",
    "turnaround": "7 a 10 días hábiles",
    "active": true,
    "isCaracasConvenio": true,
    "notes": "CONVENIO TORRE CARACAS: Determinación de anticuerpos específicos IgE/IgG/IgG4. Remisión a Caracas."
  }
];
