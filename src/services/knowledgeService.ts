import { KnowledgeDocument } from '../types/lab';

export const INITIAL_KNOWLEDGE_DOCS: KnowledgeDocument[] = [
  // 1. CONVENIO TORRE CARACAS
  {
    id: 'kb-convenio-caracas',
    title: 'Protocolo de Convenio Torre Caracas - Exámenes de Remisión Externa a Caracas',
    category: 'CONVENIO_CARACAS',
    fileName: 'Convenio_Torre_Caracas_Gonzalez_Prato.pdf',
    fileSize: '1.5 MB',
    uploadedAt: '08/09/2026',
    contentSnippet: 'INSTRUCCIÓN CLÍNICA OBLIGATORIA: Todos los exámenes pertenecientes al Convenio Torre Caracas cuando se solicite información o cotización DEBEN remitirse a la secretaría con la siguiente explicación formal: "Estos exámenes son remitidos a un laboratorio en Caracas, por lo tanto, Gonzalez Prato Laboratorio actúa como enlace para la recolección y envío de las muestras. En consecuencia, el resultado llega vía correo electrónico y se le remite al paciente usando esa misma modalidad." LISTA DE EXÁMENES INCLUIDOS: RAST 20, 60, 90 y 120 alimentos (IgE); RAST Alim. e Inhal. completo (IgE); RAST Alim-Inh 58 alerg. (IgE); Perfil Celíaco (Pauta Mundial y con Genética HLA-DQ2/DQ8); Harina de Trigo IgE/IgG; Gluten IgE/IgG/IgG4; Anticuerpos Anti-Gliadina (IgA/IgG); Anti-Gliadina Deaminada (IgA/IgG); Test Genético para Gluten; Anti-Transglutaminasa (IgA); Ácido Láctico; Ac. Anti-Babesia (IgM/IgG); Zonulina en Heces; Panel Alimentos Básicos; Serología de Hongos; Ac. Anti-Rickettsia suero (IgM/IgG) y Anaplasma; Ac. Borrelia burgdorferi (Lyme); PCR Ehrlichia; Homocisteína; IgA Secretora en saliva; Trigo IgE; Caseína IgE/IgG/IgG4; Leches de Vaca, Búfala, Cabra, Oveja y Soya (IgE/IgG/IgG4); Huevo y componentes (IgE/IgG/IgG4), Yema de huevo; RAST insectos y venenos IgE; Panel de agentes químicos; RAST inhalantes completos IgE; Subclases de IgG (IgG1, IgG2, IgG3, IgG4, IgA, IgG, IgM); Ácido Valproico IgE y Drog. Terap.; Ac. Anti-Ehrlichia IgM/IgG; Ac. Anti-Entamoeba histolytica suero (IgM/IgG); Mezcla de Ácaros IgE/IgG; Panel Inhalantes básicos IgG.',
    keyTopics: [
      'Convenio Torre Caracas',
      'Remisión a Caracas y envío de muestras',
      'Resultado por correo electrónico',
      'RAST Alimentos y RAST Inhalantes',
      'Perfil Celíaco y Genética Gluten',
      'Anti-gliadina y Anti-transglutaminasa',
      'Zonulina en heces permeabilidad',
      'Borrelia Lyme Babesia Rickettsia Anaplasma',
      'PCR Ehrlichia y Homocisteína',
      'Caseína y leches búfala cabra oveja',
      'Subclases de IgG1 IgG2 IgG3 IgG4',
      'Ácido Valproico terapéutico',
      'IgA Secretora en saliva'
    ],
    active: true
  },

  // 2. HEMATOLOGÍA, COAGULACIÓN Y PRUEBAS RÁPIDAS
  {
    id: 'kb-hematologia-coagulacion',
    title: 'Guía Preanalítica: Hematología Completa, Hemostasia y Pruebas Rápidas',
    category: 'PREANALITICA',
    fileName: 'Condiciones_Hematologia_Hemostasia.pdf',
    fileSize: '2.4 MB',
    uploadedAt: '08/09/2026',
    contentSnippet: 'HEMATOLOGÍA COMPLETA: Muestra ideal en ayunas (emergencias en cualquier momento). Evitar ejercicio intenso, alcohol y tabaco 24h previas. Notificar medicamentos (anticoagulantes, antiagregantes, AINEs, antibióticos, hierro), transfusiones en últimos 3 meses o patologías crónicas/agudas. Puede tomar agua simple libremente. VSG: Informar procesos febriles, infecciones o embarazo y tratamientos. FROTIS SANGUÍNEO: Sin condiciones especiales. COAGULACIÓN (TP/PT e INR, TPT/PTT, Fibrinógeno): Ayuno de 3 a 4 horas sin ingerir alimentos (emergencias sin ayuno). Tubo tapa celeste con citrato de sodio. Notificar anticoagulantes (Warfarina, Acenocumarol, Rivaroxabán, Apixabán, Heparina), aspirina u otros AINEs y hepatopatías. GRUPO Y RH: Ayuno ligero de 4 a 6 horas. Informar transfusiones o inmunoglobulinas en 3 meses; en embarazadas notificar RhoGAM. PLAQUETAS: Notificar antiagregantes (Aspirina, Clopidogrel) o AINEs. DÍMERO D: Ayuno de 4h en plasma citratado. GASES ARTERIALES: Reposo 15 min previo a punción arterial en jeringa heparinizada sobre hielo (procesar en <1h). GASES VENOSOS POSTPRANDIAL: 1 hora post-desayuno (llegar 20 min antes). HBA1C: Sin ayuno, notificar anemia hemolítica, transfusiones o megadosis de vitamina C/E. GOTA GRUESA: Sin ayuno, tomar en pico febril antes de antimaláricos. CAPA BLANCA EHRLICHIA: En fase febril aguda. FEBRILES (WIDAL): Ayuno 8-12h, antes de antibióticos.',
    keyTopics: [
      'Hematología completa y ayuno',
      'Tiempos de coagulación TP TPT Fibrinógeno',
      'Anticoagulantes Warfarina Heparina Aspirina',
      'Grupo Sanguíneo y Factor Rh RhoGAM',
      'Dímero D y Trombosis',
      'Gases Arteriales reposo 15 min hielo',
      'Gases Venosos Postprandial 1 hora',
      'Hemoglobina Glicada HbA1c',
      'Gota Gruesa Malaria pico febril',
      'Capa Blanca Ehrlichia',
      'Antígenos Febriles Widal'
    ],
    active: true
  },

  // 3. QUÍMICA SANGUÍNEA, METABOLISMO, FERROCINÉTICA Y VITAMINAS
  {
    id: 'kb-quimica-metabolismo-vitaminas',
    title: 'Guía Preanalítica: Química Sanguínea, Perfil 20, Ferrocinética y Vitaminas',
    category: 'QUIMICA_HORMONAS',
    fileName: 'Condiciones_Quimica_Sanguinea_Vitaminas.pdf',
    fileSize: '3.1 MB',
    uploadedAt: '08/09/2026',
    contentSnippet: 'GLICEMIA BASAL: Ayuno estricto de 8 a 12 horas exactas. Prohibido consumir chicles o café (incluso sin azúcar). Hipoglucemiantes según orden médica. GLICEMIA POSTPRANDIAL: Desayunar inmediatamente tras la basal; contar 2 horas exactas en reposo y llegar 20 min antes al laboratorio. GLICEMIA POSTCARGA (PTOG / 75g): 8-12h ayuno, reposo 2h tras tomar solución glucosada. LIPIDOGRAMA / PERFIL LIPÍDICO: Ayuno estricto de 10 a 12 horas. Cenar liviano antes de las 8:00 pm sin grasas excesivas; posponer 2-3 semanas tras infecciones agudas o cirugías. ÁCIDO ÚRICO: Ayuno de 8h+, sin carnes rojas excesivas, cerveza ni mariscos 48h antes. UREA Y CREATININA: Ayuno 8-12h, sin exceso de proteínas ni carne roja/ejercicio extenuante 24h antes. PERFIL HEPÁTICO (Transaminasas TGO/TGP, GGT, Bilirrubinas, Fosfatasa Alcalina): Ayuno 8-12h, suspender ejercicio y alcohol 48h antes. Proteger bilirrubinas de la luz solar. MINERALES Y ELECTROLITOS (Calcio, Fósforo, Magnesio, Cloro, Calcio Iónico, Sodio, Potasio): Ayuno de 8h+. ENZIMAS (Amilasa, Lipasa, LDH): Ayuno 8h+, sin ejercicio extenuante. PERFIL 20: 10-12h ayuno estricto. FERROCINÉTICA (Hierro, Ferritina, TIBC): Ayuno 8-12h matutino. VITAMINA B12: 8-12h ayuno, proteger de la luz, suspender complejo B/B12 48-72h antes, notificar omeprazol/metformina. VITAMINA D (25-OH): 8h+ ayuno, tomar antes de dosis diaria del suplemento. ÁCIDO FÓLICO: 8-12h ayuno, PROHIBICIÓN ABSOLUTA DE ALCOHOL 24h previas, suspender multivitamínicos 24h antes.',
    keyTopics: [
      'Glicemia basal 8-12h sin cafe ni chicle',
      'Glicemia postprandial 2h reposo',
      'Curva de tolerancia sobrecarga glucosa 75g',
      'Perfil Lipídico 10-12h cenar antes 8pm',
      'Ácido Úrico alcohol cerveza mariscos',
      'Urea y Creatinina carne roja',
      'Transaminasas TGO TGP GGT 48h sin alcohol',
      'Bilirrubinas proteger de luz solar',
      'Electrolitos Sodio Potasio Cloro Calcio',
      'Perfil 20 Completo',
      'Ferrocinética Hierro Ferritina TIBC',
      'Vitamina B12 y Vitamina D',
      'Ácido Fólico prohibición de alcohol 24h'
    ],
    active: true
  },

  // 4. ENDOCRINOLOGÍA, HORMONAS Y MARCADORES TUMORALES
  {
    id: 'kb-hormonas-marcadores',
    title: 'Protocolo Preanalítico: Endocrinología, Hormonas y Marcadores Tumorales',
    category: 'QUIMICA_HORMONAS',
    fileName: 'Condiciones_Hormonas_Marcadores_Tumorales.pdf',
    fileSize: '2.9 MB',
    uploadedAt: '08/09/2026',
    contentSnippet: 'TIROIDES (TSH, T4 Libre, T3 Libre, Anti-TPO, Anti-Tiroglobulina): Ayuno de 8h+, toma matutina de 7:00 AM a 9:00 AM. Tomar ANTES de ingerir la dosis de Levotiroxina. CRÍTICO: Suspender suplementos con Biotina (Vitamina B7/B8) 48 a 72 horas antes por interferencia técnica de inmunoensayo. CORTISOL AM: Extracción exacta a las 8:00 AM (reposo estricto 20-30 min antes). CORTISOL PM: Extracción exacta a las 4:00 PM (reposo 20-30 min antes, evitar estrés). PROLACTINA: Ayuno 8h+, toma antes de las 9:00 AM, abstinencia sexual y estimulación mamaria 24-48h antes, sin ejercicio ni estrés agudo; notificar metoclopramida/psicofármacos/anticonceptivos. HORMONAS SEXUALES (LH, FSH, Estradiol E2, Testosterona Total/Libre): Fase folicular temprana días 2 a 5 del ciclo menstrual para reserva ovárica basal o días 12-14 para ovulación; indicar FUM. PROGESTERONA: Día 21 del ciclo menstrual (o 7 días antes de regla esperada / fase lútea). DHEA-SO4: Ayuno 8h+. INSULINA BASAL: Ayuno estricto 8-12h, sin ejercicio el día anterior. BETA HCG CUANTITATIVA: Ayuno ligero 4h+, indicar FUM. PSA TOTAL Y LIBRE: Ayuno 4-8h, abstinencia sexual/eyaculación 48h, evitar bicicleta/moto/ejercicio intenso 48h; esperar 48-72h post tacto rectal, 1-2 semanas post cistoscopia/sonda, 4-6 semanas post biopsia prostática o RTUP. CA-125: Ayuno 8-12h, tomar al menos 5 días después de finalizar menstruación, indicar embarazo o endometriosis. CEA: Ayuno 4h+, registrar tabaquismo. AFP: Ayuno 4h+, registrar edad gestacional ecográfica y peso. CA 15-3 y CA 19-9: Ayuno 8-12h. ANTI-CCP: Ayuno 4-8h, suspender biotina 48h antes.',
    keyTopics: [
      'Tiroides TSH T4L T3L y Levotiroxina',
      'Suspensión obligatoria de Biotina 48-72h',
      'Cortisol AM 8am y Cortisol PM 4pm',
      'Prolactina antes 9am y abstinencia 48h',
      'FSH LH Estradiol días 2-5 ciclo',
      'Progesterona día 21 del ciclo',
      'Insulina basal 8-12h sin ejercicio',
      'PSA Total y Libre abstinencia bicicleta biopsia',
      'CA-125 cinco días post regla',
      'CEA fumadores y AFP semanas de gestación',
      'Anti-CCP artritis reumatoide'
    ],
    active: true
  },

  // 5. INMUNOLOGÍA, SEROLOGÍA Y DIAGNÓSTICO INFECCIOSO
  {
    id: 'kb-inmunologia-serologia',
    title: 'Guía Clínica: Inmunología, Serología y Diagnóstico Infeccioso',
    category: 'PREANALITICA',
    fileName: 'Condiciones_Inmunologia_Serologia.pdf',
    fileSize: '2.5 MB',
    uploadedAt: '08/09/2026',
    contentSnippet: 'HEPATITIS (VHA IgM, HBsAg, Anti-HBc, Anti-VHC): Ayuno de 4h+, informar días de síntomas, vacunas recientes o antivirales. PCR (Proteína C Reactiva Semicuantitativa / Cuantitativa): Ayuno 4h, informar traumatismos, cirugías dentales, infecciones virales o ejercicio. ASLO Y RATES (Factor Reumatoideo): Ayuno 4-6h, notificar antibióticos o corticoides. VDRL: Ayuno 4-8h, evitar alcohol 24h, no suspender medicamentos pero informar antibióticos (penicilinas/macrólidos) y causas de falsos positivos (embarazo, autoinmunidad, vacunas). ANTI-TREPONEMA PALLIDUM: Ayuno 2h+ (confirmatoria sífilis). VIH 3RA Y 4TA GENERACIÓN (Combo p24): Ayuno 4h+. DENGUE: Días 1 a 5 con fiebre se realiza Antígeno NS1; a partir del día 6 se realizan anticuerpos IgM e IgG; notificar vacuna de fiebre amarilla. VEB (Epstein-Barr) Y CMV (Citomegalovirus): Ayuno 4h+, indicar días con fiebre/faringitis. TOXOPLASMA GONDII (IgM/IgG): Ayuno 4h+, indicar embarazo/semanas y convivencia con felinos/animales. CHLAMYDIA Y MYCOPLASMA PNEUMONIAE: Ayuno 4h+, suspender biotina. HELICOBACTER PYLORI SEROLOGÍA: Ayuno 4h+. IGE TOTAL: Ayuno 4h+, informar corticosteroides. PANEL RESPIRATORIO RÁPIDO (VSR, Influenza, Adenovirus, Mycoplasma): Hisopado nasofaríngeo en primeros 3-5 días de síntomas, sin lavados ni sprays nasales 4h antes. COVID-19: Ayuno 4h+.',
    keyTopics: [
      'Hepatitis A B C y Anti-Core',
      'Proteína C Reactiva PCR cuantitativa',
      'ASLO y Factor Reumatoideo RATEST',
      'VDRL y Anti-Treponema FTA-ABS',
      'VIH 3ra y 4ta generacion combo p24',
      'Dengue ventana NS1 dias 1-5 e IgM IgG dia 6+',
      'Epstein Barr VEB y Citomegalovirus CMV',
      'Toxoplasma gondii embarazo y animales',
      'Chlamydia y Mycoplasma serologia',
      'Helicobacter pylori en sangre',
      'Panel Respiratorio hisopado nasal',
      'IgE Total y alergias'
    ],
    active: true
  },

  // 6. MICROBIOLOGÍA AUTOMATIZADA E INVASIVA
  {
    id: 'kb-microbiologia-cultivos',
    title: 'Instructivo Oficial de Recolección de Muestras Microbiológicas e Invasivas',
    category: 'MICROBIOLOGIA',
    fileName: 'Condiciones_Microbiologia_Cultivos.pdf',
    fileSize: '2.8 MB',
    uploadedAt: '08/09/2026',
    contentSnippet: 'REGLA GENERAL MICROBIOLOGÍA: Muestra antes de iniciar antibióticos o 48 a 72 horas luego de finalizados (indicar antibiótico si no se suspende). UROCULTIVO: Primera orina de la mañana o retención de 3 a 4 horas. Aseo genital con agua y jabón neutro (PROHIBIDO usar antisépticos, geles o desinfectantes). Descartar primer chorro y recolectar chorro medio en frasco estéril de farmacia (no vidrio). Mantener en nevera y transportar con hielo al laboratorio. Bolsa pediátrica: cambio cada 30 min hasta obtener muestra. Sonda vesical: toma por recambio de sonda por personal de salud. COPROCULTIVO: Sin antibióticos 48-72h, sin antidiarreicos, bismuto ni aceites. Recipiente limpio no absorbente sin orina. Porción tamaño nuez con moco/sangre. Lactantes: sin talcos ni cremas antipañalitis, colocar pañal al revés (plástico adentro), recoger inmediatamente con espátula, transportar a temperatura ambiente. EXUDADO FARÍNGEO: En ayunas, sin cepillarse los dientes, sin enjuagues ni colutorios bucales. ESPUTO: Enjuague bucal solo con agua (sin pasta dental), primera hora de la mañana con esfuerzo de tos profunda del árbol bronquial (no saliva). SECRECIONES: Heridas/úlceras (sin cremas 24h, lavado con agua estéril); Óticas (sin gotas 48h); Oculares (sin colirios 12-24h, retirar lentes de contacto 12h, sin maquillaje); Nasales (sin sprays 12-24h); Abscesos (aspirado con jeringa). LÍQUIDOS BIOLÓGICOS (LCR, Pleural, Sinovial, Ascítico, Pericárdico): NUNCA REFRIGERAR para microbiología, trasladar en 30-60 min a 20-25°C. HEMOCULTIVO: Sin ayuno, al inicio de fiebre/escalofríos, venopunción periférica, frascos comerciales a temperatura ambiente. LAVADO BRONCOALVEOLAR / SECRECIÓN BRONQUIAL: Trampa de Lukens hermética enviada en <2 horas. ESPERMOCULTIVO (PRUEBA DE LOS 4 VASOS): 7-14 días sin antibióticos, abstinencia sexual 2-3 días, retención urinaria de toda la noche (o 4h). Higiene rigurosa con agua y jabón neutro sin antisépticos. 4 frascos estériles numerados: Frasco 1 (primeros mL orina), Frasco 2 (chorro medio orina), Frasco 3 (eyaculado completo por masturbación, sin coito ni preservativo), Frasco 4 (primeros mL orina post-eyaculación). Orinas en hielo y semen a temperatura ambiente (20-25°C).',
    keyTopics: [
      'Antibióticos suspender 48-72h antes de cultivo',
      'Urocultivo chorro medio y traslado en hielo',
      'Aseo genital sin antisépticos',
      'Urocultivo pediátrico bolsa 30 min',
      'Coprocultivo y técnica de pañal al revés',
      'Exudado faríngeo sin lavarse los dientes',
      'Esputo profundo no saliva',
      'Secreciones heridas oticas oculares nasales',
      'Líquidos biológicos LCR NUNCA refrigerar',
      'Hemocultivo al inicio de pico febril',
      'Lavado broncoalveolar trampa de Lukens',
      'Espermocultivo prueba de los 4 vasos Meares Stamey'
    ],
    active: true
  },

  // 7. MICOLOGÍA (ESTUDIOS DE HONGOS)
  {
    id: 'kb-micologia-hongos',
    title: 'Protocolo Clínico de Recolección para Estudios Micológicos (Cultivo de Hongos)',
    category: 'MICOLOGIA',
    fileName: 'Condiciones_Estudios_Micologicos_Hongos.pdf',
    fileSize: '1.9 MB',
    uploadedAt: '08/09/2026',
    contentSnippet: 'REGLA GENERAL MICOLOGÍA: NO usar tratamiento antimicótico tópico (cremas, pomadas, laca de uñas, lociones) ni oral durante un mínimo de 7 a 15 días antes de la toma. 3 días previos no aplicar sobre la zona a muestrear ningún cosmético, crema hidratante, polvo de talco, perfume, esmalte ni antiséptico (yodo, clorhexidina, alcohol). A. CULTIVO MICOLÓGICO DE UÑAS (ONICOMICOSIS): No cortarse ni limpiarse las uñas durante la semana previa a la recolección. Limpiar las uñas con agua y jabón neutro utilizando un cepillo suave durante los 3 días previos. El día del examen, acudir con calzado cerrado y medias limpias (sin restos de talco ni telas sintéticas desprendibles). Acudir sin esmalte ni endurecedor de uñas por lo menos 3 a 7 días antes. B. CULTIVO MICOLÓGICO DE CABELLO Y CUERO CABELLUDO (Tinea capitis / tiña de cabeza, dermatitis seborreica): No lavar el cabello 24 horas antes de la toma. No aplicar fijadores, lacas, gomina, tintes, aceites capilares ni acondicionadores el día previo ni el día de la toma. Evitar el peinado agresivo o cepillado previo que desprenda mecánicamente los pelos afectados antes de la evaluación microscópica. C. CULTIVO MICOLÓGICO DE ESCAMAS DE PIEL (Pitiriasis versicolor, Tiña de cuerpo, ingle, cara, pies o mano / Tinea corporis, cruris, faciei, pedis, manuum): Realizar un baño general con agua y jabón neutro 24 horas antes. EVITAR LA DUCHA justo antes de la toma para no retirar mecánicamente las escamas córneas superficiales ni deshidratar la zona. La zona afectada debe estar completamente limpia y seca, libre de maquillaje, desodorantes (si es en axila), talcos o cremas corporales durante al menos 3 días.',
    keyTopics: [
      'Antimicóticos suspender 7 a 15 días',
      'Cultivo micológico de uñas onicomicosis',
      'Uñas sin cortar 1 semana y cepillado 3 días',
      'Sin esmalte ni endurecedor 3 a 7 días',
      'Cultivo de cuero cabelludo tinea capitis',
      'Cabello sin lavar 24h y sin gomina tintes',
      'Cultivo de piel pitiriasis versicolor y tiñas',
      'Piel evitar ducha inmediata y sin cremas',
      'Sin talco perfumes ni antisépticos 3 días'
    ],
    active: true
  },

  // 8. UROANÁLISIS, ORINAS DE 24 HORAS, COPROANÁLISIS Y ESTUDIOS GASTROINTESTINALES
  {
    id: 'kb-uro-copro-gastro',
    title: 'Protocolos de Uroanálisis, Orinas de 24h, Coproanálisis y Función Gastrointestinal',
    category: 'URO_COPRO',
    fileName: 'Protocolos_Uroanalisis_Coproanalisis_Especiales.pdf',
    fileSize: '3.0 MB',
    uploadedAt: '08/09/2026',
    contentSnippet: 'UROANÁLISIS GENERAL: Primera orina de la mañana con aseo neutro genital. Descartar primer chorro y recoger chorro medio en envase estéril con tapa de rosca. Entregar en <1h. Lactantes: bolsa pediátrica cambiada cada 20-30 min. DEPURACIÓN DE CREATININA EN ORINA DE 24 HORAS: Recolección estricta de 24h + muestra sanguínea matutina (medir talla y peso). Botella de agua mineral estéril. Cada micción debe ser refrigerada a ~8°C (no congelar). Día 1 a las 6:00 AM descartar 1ra orina y anotar hora. Recolectar todas las micciones diurnas y nocturnas. Día 2 a las 6:00 AM recoger la 1ra orina matutina y cerrar recolección. Llevar de inmediato. MICROALBUMINURIA Y PROTEINURIA 24H: Mismo protocolo de refrigeración; evitar ejercicio intenso 24h antes, posponer si hay fiebre o infección urinaria. RELACIONES URINARIAS (Ácido Úrico/Creat, Calcio/Creat, Fósforo/Creat): Segunda orina de la mañana en ayunas. Dieta habitual los 3 días previos (sin variar carnes/lácteos). Beber agua normal. Entregar en <1h. COPROANÁLISIS GENERAL (Heces, Leucograma, Sudan III, Kato Katz, Ziehl Neelsen): Sin antidiarreicos, bismuto ni aceites. Porción tamaño nuez en recolector estéril sin orina. CONCENTRADO SERIADO / CONCENTRADO DE HECES (3 Muestras - $20 USD): 1. Acuda al laboratorio para adquirir el kit para la recolección de las muestras. En ese momento se le proporcionará la información necesaria para la recolección y traslado de la muestra. 2. Cuide no derramar ese líquido en el momento de trasladar el material entregado. ABSORCIÓN INTESTINAL: Entrega estricta en menos de 30 minutos (en lactantes tomar en laboratorio). TEST DE GRAHAM: Retirar kit de lámina y cinta; toma al despertar sin aseo ni talcos. COPROANTÍGENO H. PYLORI: Entrega en <3h. CALPROTECTINA FECAL: Muestra fresca trasladada de inmediato. COPROANTÍGENOS GIARDIA / ENTAMOEBA / CRYPTOSPORIDIUM: Entrega en <2h. ESTEATOCRITO ÁCIDO: Entrega en <2h sin supositorios ni enemas. SANGRE OCULTA EN HECES: Método inmunoquímico (no requiere dieta restrictiva), sin supositorios ni sangrado hemorroidal/menstrual. DISBIOSIS INTESTINAL: CRÍTICO: NO recibir antibióticos, antimicóticos, probióticos ni consumir yogurt durante al menos 15 días previos. Llenar 3/4 partes del envase estéril y trasladar de inmediato.',
    keyTopics: [
      'Uroanálisis chorro medio entrega 1h',
      'Depuración de creatinina 24 horas refrigerada 8C',
      'Descartar 1ra orina dia 1 y cerrar dia 2',
      'Microalbuminuria y Proteinuria 24h',
      'Relaciones Urinarias segunda orina ayunas',
      'Coproanálisis general y Leucograma fecal',
      'Concentrado seriado 3 muestras kit',
      'Absorción intestinal entrega 30 min',
      'Test de Graham cinta adhesiva oxiuros',
      'Coproantígeno Helicobacter pylori 3 horas',
      'Calprotectina fecal inflamacion intestinal',
      'Coproantígenos Giardia Entamoeba',
      'Esteatocrito ácido grasa fecal',
      'Sangre oculta en heces inmunoquímica',
      'Disbiosis 15 días sin antibióticos ni yogurt'
    ],
    active: true
  },

  // 9. DOMICILIOS & SEGUROS
  {
    id: 'kb-domicilios',
    title: 'Protocolo de Servicio de Toma de Muestras a Domicilio',
    category: 'DOMICILIOS',
    fileName: 'Protocolo_Toma_Muestras_Domicilio_2026.pdf',
    fileSize: '1.8 MB',
    uploadedAt: '08/09/2026',
    contentSnippet: 'El servicio de toma a domicilio está disponible de Lunes a Sábado a partir de las 6:30 AM. Requiere coordinación previa de al menos 24 horas con secretaría para pacientes encamados, tercera edad, postoperados o dificultad de traslado. Recargo de traslado varía según la zona geográfica ($5-$10 USD Zona Metropolitana). Se genera alerta inmediata para llamada de coordinación.',
    keyTopics: ['Pacientes encamados', 'Coordinación 24h', 'Toma matutina 6:30 AM', 'Zonas de cobertura', 'Alerta recepcion'],
    active: true
  },
  {
    id: 'kb-seguros',
    title: 'Convenios, Seguros Médicos y Formas de Pago Aceptadas',
    category: 'SEGUROS',
    fileName: 'Convenios_Seguros_y_Metodos_Pago_2026.pdf',
    fileSize: '1.2 MB',
    uploadedAt: '08/09/2026',
    contentSnippet: 'Aceptamos pagos en Divisas en efectivo (USD / Euros en buen estado), Zelle, Pago Móvil, Binance Pay (USDT) y tarjetas de débito/crédito internacionales. Todos nuestros precios y cotizaciones se manejan en Dólares ($ USD). Aceptamos cartas de garantía de aseguradoras nacionales con clave de validación previa coordinada por secretaría.',
    keyTopics: ['Pago Móvil', 'Precios en USD', 'Zelle', 'Efectivo USD Euros', 'Binance Pay USDT', 'Cartas de garantía seguros'],
    active: true
  }
];

const KB_STORAGE_KEY = 'gp_lab_knowledge_base_v3';

export const knowledgeService = {
  getDocs(): KnowledgeDocument[] {
    const saved = localStorage.getItem(KB_STORAGE_KEY);
    if (saved) {
      try { 
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      } catch (e) {}
    }
    localStorage.setItem(KB_STORAGE_KEY, JSON.stringify(INITIAL_KNOWLEDGE_DOCS));
    return INITIAL_KNOWLEDGE_DOCS;
  },

  saveDocs(docs: KnowledgeDocument[]) {
    localStorage.setItem(KB_STORAGE_KEY, JSON.stringify(docs));
  },

  addDocument(doc: Omit<KnowledgeDocument, 'id' | 'uploadedAt'>): KnowledgeDocument {
    const docs = this.getDocs();
    const newDoc: KnowledgeDocument = {
      ...doc,
      id: 'kb-' + Date.now(),
      uploadedAt: new Date().toLocaleDateString('es-VE')
    };
    const updated = [newDoc, ...docs];
    this.saveDocs(updated);
    return newDoc;
  },

  toggleDoc(id: string): KnowledgeDocument[] {
    const docs = this.getDocs().map(d => d.id === id ? { ...d, active: !d.active } : d);
    this.saveDocs(docs);
    return docs;
  },

  deleteDoc(id: string): KnowledgeDocument[] {
    const docs = this.getDocs().filter(d => d.id !== id);
    this.saveDocs(docs);
    return docs;
  }
};