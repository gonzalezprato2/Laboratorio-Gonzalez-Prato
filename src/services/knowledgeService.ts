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
    contentSnippet: 'HEPATITIS (VHA IgM, HBsAg, Anti-HBc, Anti-VHC): Ayuno de 4h+, informar días de síntomas, vacunas recientes o antivirales de acción directa / inmunomoduladores en VHC. PCR (Proteína C Reactiva Semicuantitativa / Cuantitativa): Ayuno 4h, informar traumatismos, procedimientos dentales, infecciones virales, patologías crónicas, embarazo o ejercicio intenso. ASLO Y RATES (Factor Reumatoideo): Ayuno 4-6h (no estricto), notificar antibióticos, corticoesteroides o procesos infecciosos recientes. VDRL: Ayuno 4-8h (evitar lipemia), evitar alcohol 24h, no suspender medicamentos pero informar antibióticos (penicilinas/macrólidos) y causas de falsos positivos (embarazo, autoinmunidad/lupus, vacunas). ANTI-TREPONEMA PALLIDUM (FTA-ABS, TPHA): Ayuno 2-4h (confirmatoria sífilis), informar tratamiento previo (penicilina benzatínica) y fecha de culminación (cicatriz serológica de por vida), autoinmunidad o Lyme. VIH 1/2 (3RA GEN) Y 4TA GENERACIÓN (Combo p24 + anticuerpos): Ayuno 4h+, informar antirretrovirales, PrEP, PEP, vacunas recientes (influenza, hepatitis B) o tiempo de ventana por exposición sospechosa. DENGUE: Días 1 a 5 con fiebre: Antígeno NS1 (fase de viremia aguda); A partir del día 6 con fiebre: Anticuerpos IgM e IgG (respuesta inmune); notificar vacuna de fiebre amarilla/dengue o infección previa por flavivirus. PRUEBA DE EMBARAZO EN SANGRE (hCG cualitativa / beta cuantitativa): Ayuno ligero 2-4h, indicar FUM, regularidad y 1-2 días de retraso menstrual, tratamientos de reproducción/hCG. PRUEBA DE EMBARAZO EN ORINA (hCG): Primera orina matutina o retención mínima 4h, evitar exceso de líquidos, indicar FUM y retraso. VEB (Epstein-Barr): Ayuno 4h+, días de fiebre/faringitis/adenopatías, transfusiones o hemoderivados en 3-6 meses. CMV (Citomegalovirus): Ayuno 4h+, en embarazadas semanas de gestación y si es rutina o hallazgo eco, informar inmunosupresión o VIH. TOXOPLASMA GONDII (IgM/IgG): Ayuno 4h+, edad gestacional en embarazadas, convivencia con gatos, contacto con tierra/jardinería o carnes crudas/poco cocidas. CHLAMYDIA Y MYCOPLASMA PNEUMONIAE (Sangre): Ayuno 4h+, uso reciente de antibióticos (macrólidos, quinolonas, tetraciclinas), suspender biotina 48h antes. HELICOBACTER PYLORI SEROLOGÍA EN SANGRE: Ayuno 4h+, advertir que IgG permanece positiva meses/años (no discrimina infección activa vs pasada; para control de erradicación solicitar Coproantígeno en Heces). IGE TOTAL: Ayuno 4h+, informar enfermedades atópicas (asma, rinitis, dermatitis), parasitosis o uso de corticoides/antihistamínicos/anti-IgE (omalizumab). ANTICUERPOS COVID (SARS-CoV-2): Ayuno 4h+, fecha de síntomas/contacto, vacunas y fecha de última dosis.',
    keyTopics: [
      'Hepatitis A B C y Anti-Core',
      'Proteína C Reactiva PCR cuantitativa',
      'ASLO y Factor Reumatoideo RATEST',
      'VDRL y Anti-Treponema FTA-ABS',
      'VIH 3ra y 4ta generacion combo p24',
      'Dengue ventana NS1 dias 1-5 e IgM IgG dia 6+',
      'Prueba de Embarazo Sangre y Orina',
      'Epstein Barr VEB y Citomegalovirus CMV',
      'Toxoplasma gondii embarazo y animales',
      'Chlamydia y Mycoplasma serologia',
      'Helicobacter pylori en sangre',
      'IgE Total y alergias',
      'Anticuerpos COVID SARS-CoV-2'
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
    contentSnippet: 'REGLAS GENERALES MICROBIOLOGÍA: 1. Muestra antes de iniciar terapia antibiótica o antifúngica, o 48 a 72 horas luego de finalizado el tratamiento (indicar antibiótico si no se suspende). 2. Correspondencia inequívoca entre muestra y solicitud médica. UROCULTIVO (CHORRO MEDIO): 1ra orina matutina o retención de 3 a 4 horas. Lavado genital riguroso con agua y jabón neutro, enjuagar con abundante agua (PROHIBIDO usar antisépticos ni desinfectantes). Secar con toalla limpia. Descartar primer chorro y recolectar chorro medio en frasco estéril de farmacia (no vidrio). Mantener en nevera y transportar en envase con hielo al laboratorio. BOLSA PEDIÁTRICA: Aseo neutro sin antisépticos. Colocar bolsa sin manipular genitales; cambiar cada 30 minutos si no hay micción hasta obtenerla. PACIENTES CON SONDA: Muestra ideal obtenida por recambio de sonda realizado por personal de salud. COPROCULTIVO: Sin antidiarreicos, bismuto, antiácidos ni aceites minerales. Recipiente limpio no absorbente sin orina. Porción tamaño nuez (o 5-10 mL si líquida) con moco/sangre. LACTANTES: Sin talcos, cremas antipañalitis ni aceites; colocar pañal al revés (cara plástica hacia adentro); recoger de inmediato con espátula; trasladar a temperatura ambiente. HERIDAS Y ÚLCERAS: Incluye cultivo bacteriológico y micológico. Sin cremas tópicas, ungüentos ni antibióticos 24h previas. Lavado previo con agua estéril; traslado a temperatura ambiente en medio de transporte. EXUDADO FARÍNGEO: En ayunas, sin cepillarse los dientes, sin enjuagues ni antisépticos bucales. ESPUTO (Expectoración Profunda): Incluye cultivo bacteriológico y micológico. Enjuague bucal solo con agua (sin pasta dental ni enjuagues), primera hora de la mañana con tos profunda bronquial en recolector estéril (evitar saliva/secreción nasofaríngea). SECRECIONES NASALES: Suspender gotas/sprays con corticoides o descongestionantes 12-24h antes. SECRECIONES ÓTICAS: Incluye cultivo bacteriológico y micológico. Sin gotas óticas 48h antes. SECRECIONES OCULARES (Conjuntival): Incluye bacteriológico y micológico. Sin gotas/pomadas 12-24h, retirar lentes de contacto 12h antes, sin maquillaje/cremas perioculares. ABSCESOS: Incluye bacteriológico y micológico. Ideal por aspirado con jeringa; traslado inmediato. LÍQUIDOS BIOLÓGICOS (LCR, Pleural, Ascítico, Peritoneal, Pericárdico): Incluyen cultivo bacteriológico y micológico. NUNCA REFRIGERAR para microbiología; trasladar de inmediato a temperatura ambiente. Obtenidas estrictamente por personal médico. HEMOCULTIVO: Sin ayuno. Antes de antibióticos (o justo antes de la siguiente dosis). Extracción al inicio de fiebre/escalofríos por venopunción periférica. Retrocultivo simultáneo periférico + catéter si aplica. Solo frascos comerciales (adquirir en el laboratorio) a temperatura ambiente. LAVADO BRONCOALVEOLAR (LBA) Y SECRECIÓN BRONQUIAL: Incluyen cultivo bacteriológico y micológico. Obtenidas por médico especialista. Secreción bronquial sellada herméticamente en trampa de Lukens enviada en <2 horas a temperatura ambiente.',
    keyTopics: [
      'Antibióticos suspender 48-72h antes de cultivo',
      'Urocultivo chorro medio traslado en hielo',
      'Aseo genital sin antisépticos',
      'Urocultivo pediátrico bolsa 30 min',
      'Coprocultivo y pañal al revés lactantes',
      'Exudado faríngeo en ayunas sin cepillarse',
      'Esputo profundo bacteriológico y micológico',
      'Secreciones heridas oticas oculares y micológico',
      'Líquidos biológicos LCR NUNCA refrigerar',
      'Hemocultivo al inicio de fiebre y frascos comerciales',
      'Trampa de Lukens secreción bronquial y LBA',
      'Espermocultivo prueba de 4 vasos Meares Stamey'
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
    contentSnippet: 'UROANÁLISIS GENERAL: Primera orina de la mañana con aseo neutro genital. Descartar primer chorro y recoger chorro medio en envase estéril con tapa de rosca. Entregar en <1h. Lactantes: bolsa pediátrica cambiada cada 20-30 min. DEPURACIÓN DE CREATININA EN ORINA DE 24 HORAS: Recolección estricta de 24h + muestra sanguínea matutina (medir talla y peso). Botella de agua mineral estéril. Cada micción debe ser refrigerada a ~8°C (no congelar). Día 1 a las 6:00 AM descartar 1ra orina y anotar hora. Recolectar todas las micciones diurnas y nocturnas. Día 2 a las 6:00 AM recoger la 1ra orina matutina y cerrar recolección. Llevar de inmediato. MICROALBUMINURIA Y PROTEINURIA 24H: Mismo protocolo de refrigeración; evitar ejercicio intenso 24h antes, posponer si hay fiebre o infección urinaria. RELACIONES URINARIAS (Ácido Úrico/Creat, Calcio/Creat, Fósforo/Creat): Segunda orina de la mañana en ayunas. Dieta habitual los 3 días previos (sin variar carnes/lácteos). Beber agua normal. Entregar en <1h. COPROANÁLISIS GENERAL (Heces, Leucograma, Sudan III, Kato Katz, Ziehl Neelsen): Sin antidiarreicos, bismuto ni aceites. Porción tamaño nuez en recolector estéril sin orina. RECEPCIÓN DE HECES: Hasta las 2:30 PM (Lunes a Viernes) y Sábados hasta las 12:30 PM. CONCENTRADO SERIADO / CONCENTRADO DE HECES (3 Muestras - $20 USD): 1. Acuda al laboratorio para adquirir el kit para la recolección de las muestras. En ese momento se le proporcionará la información necesaria para la recolección y traslado de la muestra. 2. Cuide no derramar ese líquido en el momento de trasladar el material entregado. ABSORCIÓN INTESTINAL: Entrega estricta en menos de 30 minutos (en lactantes tomar en laboratorio). TEST DE GRAHAM: Retirar kit de lámina y cinta; toma al despertar sin aseo ni talcos. COPROANTÍGENO H. PYLORI: Entrega en <3h. CALPROTECTINA FECAL: Muestra fresca trasladada de inmediato. COPROANTÍGENOS GIARDIA / ENTAMOEBA / CRYPTOSPORIDIUM: Entrega en <2h. ESTEATOCRITO ÁCIDO: Entrega en <2h sin supositorios ni enemas. SANGRE OCULTA EN HECES: Método inmunoquímico (no requiere dieta restrictiva), sin supositorios ni sangrado hemorroidal/menstrual. DISBIOSIS INTESTINAL: CRÍTICO: NO recibir antibióticos, antimicóticos, probióticos ni consumir yogurt durante al menos 15 días previos. Llenar 3/4 partes del envase estéril y trasladar de inmediato.',
    keyTopics: [
      'Uroanálisis chorro medio entrega 1h',
      'Depuración de creatinina 24 horas refrigerada 8C',
      'Descartar 1ra orina dia 1 y cerrar dia 2',
      'Microalbuminuria y Proteinuria 24h',
      'Relaciones Urinarias segunda orina ayunas',
      'Coproanálisis general y Leucograma fecal',
      'Recepción heces 2:30pm y sábados 12:30pm',
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

  // 9. DOMICILIOS, SEGUROS Y FAQ INSTITUCIONAL OFICIAL
  {
    id: 'kb-domicilios',
    title: 'Protocolo de Servicio de Toma de Muestras a Domicilio',
    category: 'DOMICILIOS',
    fileName: 'Protocolo_Toma_Muestras_Domicilio_2026.pdf',
    fileSize: '1.8 MB',
    uploadedAt: '08/09/2026',
    contentSnippet: 'SERVICIO A DOMICILIO OFICIAL: Disponible exclusivamente los días LUNES, MARTES Y JUEVES. Si el domicilio se encuentra dentro del Municipio Libertador, NO TIENE COSTO ADICIONAL (Servicio gratuito en Mcpio. Libertador). En caso de que la toma sea en un centro de salud / clínica / hospital, el familiar del paciente debe buscar a la asistente de laboratorio y acompañarla al mismo debido a las restricciones de ingreso a personal externo. Para coordinar fechas y agendar se contacta con la secretaría.',
    keyTopics: ['Lunes Martes y Jueves', 'Municipio Libertador gratis sin costo', 'Centros de salud acompañar a asistente', 'Coordinación con secretaría'],
    active: true
  },
  {
    id: 'kb-seguros-faq',
    title: 'Políticas de Seguros, Formas de Pago, Resultados y Preguntas Frecuentes',
    category: 'SEGUROS',
    fileName: 'Convenios_Seguros_FAQ_Institucional_2026.pdf',
    fileSize: '1.4 MB',
    uploadedAt: '08/09/2026',
    contentSnippet: '1. SEGUROS: No poseemos convenios directos con compañías aseguradoras. El paciente efectúa el pago en el laboratorio y solicita el reembolso correspondiente a su seguro. 2. FORMAS DE PAGO: Punto de venta (tarjetas de débito/crédito), transferencias bancarias y efectivo (Bolívares / Divisas USD). Todos los precios oficiales se expresan en Dólares ($ USD). 3. ORDEN DE LLEGADA VS CITA: La atención es estrictamente por orden de llegada. ÚNICAMENTE los estudios micológicos (hongos) y Demodex requieren PREVIA CITA con la especialista micóloga. 4. ENTREGA DE RESULTADOS: Los exámenes de rutina, química, hematología, hormonas y serología se entregan el MISMO DÍA (salvo eventualidad mayor). Los cultivos bacteriológicos demoran entre un mínimo de 3 días y un máximo de 8 días. 5. NOTIFICACIÓN DIGITAL Y FÍSICA: Los resultados se notifican vía WhatsApp con un enlace web seguro y el documento PDF adjunto. REGLA OBLIGATORIA: El paciente NO debe tener activados los "Mensajes Temporales" en WhatsApp, ya que impiden que el sistema envíe la notificación. También pueden retirarse impresos en físico en la sede sin costo adicional. 6. RESULTADOS EXTRAVIADOS O NO RECIBIDOS: El paciente o familiar debe enviar el número de cédula de identidad (o la del representante si es menor de edad) y secretaría le reenviará el reporte a la brevedad. 7. NO INTERPRETACIÓN CLÍNICA: El laboratorio no está autorizado para interpretar ni diagnosticar resultados; el paciente debe remitirlos a su médico tratante. 8. UBICACIÓN Y SEDE ÚNICA: Urbanización El Encanto, Clínica del Niño, Sótano 2. Detrás de la Contraloría del Estado Mérida. No disponemos de otras sedes ni realizamos citas médicas de la clínica, ecografías, biopsias, radiografías ni ultrasonidos (somos exclusivamente laboratorio de análisis clínicos).',
    keyTopics: [
      'Seguros reembolso sin convenio directo',
      'Formas de pago punto de venta transferencia efectivo',
      'Orden de llegada y previa cita solo micología',
      'Resultados mismo día y cultivos 3 a 8 días',
      'WhatsApp PDF desactivar mensajes temporales',
      'Resultados impresos en físico',
      'No interpretación de resultados',
      'Sede única Clínica del Niño Sótano 2 El Encanto Mérida',
      'No realizamos ecografías biopsias ni radiografías'
    ],
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