# 🚀 Integración del Agente Clínico Multimodal WhatsApp (n8n + Gemini 2.0 Flash + Meta Cloud API)
## Laboratorio Clínico GONZALEZ-PRATO (Dirección Técnica: Luisa Carolina González Ramírez)

Este directorio contiene la arquitectura, esquemas de conexión y el workflow exportado para desplegar el **Agente de Inteligencia Artificial Multimodal** en la infraestructura n8n de la agencia, utilizando las cuentas y servicios oficiales del laboratorio (Google AI Studio y Meta WhatsApp Cloud API).

---

## 📁 Archivos en este Directorio
- [`gonzalez_prato_clinical_agent_workflow.json`](file:///C:/Proyectos/Laboratorio-Gonzalez-Prato/agents/n8n/gonzalez_prato_clinical_agent_workflow.json): Workflow completo de n8n listo para importar con 1 nodo de entrada, OCR multimodal, enrutador, memoria conversacional por número de teléfono, herramientas de catálogo y alarma a recepción.
- [`README.md`](file:///C:/Proyectos/Laboratorio-Gonzalez-Prato/agents/n8n/README.md): Manual de despliegue paso a paso y arquitectura para la agencia y el cliente.

---

## 🏗️ Esquema de Arquitectura y Separación de Cuentas

```mermaid
graph TD
    User([📱 Paciente por WhatsApp]) -->|Envía Texto, Foto de Récipe o Audio| MetaCloudAPI[🌐 Meta WhatsApp Cloud API\n(Cuenta de Meta del Laboratorio)]
    MetaCloudAPI -->|Webhook Inbound POST| VPSn8n[⚙️ n8n Agency VPS\n(Servidor Gestionado por la Agencia)]
    
    subgraph Agency VPS [Servidor n8n de la Agencia]
        VPSn8n --> ParsePayload[1. Parser de Mensajes & Tipos de Media]
        ParsePayload --> Router{2. Router Multimodal}
        
        Router -->|Imagen / Récipe| MetaMedia[3a. Descarga Binario de Meta API]
        MetaMedia --> GeminiVision[3b. Gemini 2.0 Flash OCR Récipe]
        GeminiVision --> AIAgent[4. Agente Clínico LangChain]
        
        Router -->|Texto Directo| AIAgent
        Router -->|Audio / Voz| TranscribeNode[3c. Transcripción de Audio]
        TranscribeNode --> AIAgent
        
        AIAgent --> Memory[Memoria por Teléfono Buffer]
        AIAgent --> KBTool[Tool: Catálogo & Preanalítica 80+ Exámenes]
        AIAgent --> ConvenioTool[Tool: Protocolo Torre Caracas]
        AIAgent --> HandoverTool[Tool: Alarma Handover Recepción]
    end

    subgraph Client Accounts [Cuentas y Herramientas del Cliente / Laboratorio]
        GoogleAI[🧠 Google AI Studio API Key\nGemini 2.0 Flash / Pro]
        MetaCloudAPI
        GoogleSheets[📊 Google Sheets CRM Leads & Cotizaciones]
    end

    AIAgent -.->|Inferencia LLM| GoogleAI
    HandoverTool -->|Webhook / Supabase Realtime| WebInbox[🖥️ Bandeja en Vivo Recepción (React App)]
    AIAgent --> SendWA[5. Meta Graph API: Enviar Respuesta]
    SendWA --> User
```

---

## 🔑 Credenciales Requeridas y Asignación de Responsabilidades

| Recurso / Herramienta | Propietario de la Cuenta | Configuración en n8n |
| :--- | :--- | :--- |
| **Servidor n8n** | **Agencia (Tu VPS)** | Instancia n8n con Webhooks públicos SSL (`https://n8n.tuagencia.com`). |
| **Google AI Studio (Gemini 2.0)** | **Cliente (Gonzalez-Prato)** | Crear API Key en Google AI Studio (créditos del cliente) y agregarla en n8n como credencial `Google Gemini API`. |
| **WhatsApp Cloud API** | **Cliente (Meta Business Suite)** | Número oficial del laboratorio, Phone Number ID y Permanent Access Token configurados en n8n. |
| **Google Sheets / CRM** | **Cliente (Google Workspace)** | OAuth2 con la cuenta de Google del laboratorio para registro automático de presupuestos (opcional). |

---

## 📋 Reglas Clínicas Integradas en el Prompt del Agente

1. **Protocolo Convenio Torre Caracas:**
   - Para exámenes de alta especialización (RAST de alimentos o inhalantes 20/60/90/120 alérgenos, Perfil Celíaco genético, Zonulina en heces, Borrelia/Lyme, Babesia, Rickettsia, PCR Ehrlichia, Homocisteína, IgA Salival, Subclases IgG1-4, Ácido Valproico, Leches de búfala/cabra/oveja, etc.), el agente emite textualmente:
   > *"Estos exámenes son remitidos a un laboratorio en Caracas, por lo tanto, Gonzalez Prato Laboratorio actúa como enlace para la recolección y envío de las muestras. En consecuencia, el resultado llega vía correo electrónico y se le remite al paciente usando esa misma modalidad."*
   - Activa el Tool `activar_human_handover_alarma` para notificar a recepción.

2. **Requisitos Preanalíticos Críticos:**
   - **Tiroides (TSH, T4L, T3L, Anti-TPO):** Ayuno 8h+, toma 7-9 AM antes de la Levotiroxina. Suspender Biotina (Vit B7/B8) 48-72h antes.
   - **Glicemia Basal:** 8-12h de ayuno estricto (prohibido chicle o café).
   - **Perfil Lipídico:** 10-12h estrictas, cenar antes de las 8:00 PM sin grasas ni alcohol.
   - **PSA:** 48h sin relaciones/eyaculación ni bicicleta; 72h post-tacto rectal; 4-6 semanas post-biopsia.
   - **Urocultivo:** Chorro medio, aseo sin antisépticos, frasco estéril, traslado refrigerado en hielo antes de 2h.
   - **Líquidos Biológicos (LCR, pleural, sinovial):** ¡NUNCA REFRIGERAR para microbiología!
   - **Disbiosis:** 15 días sin antibióticos, antimicóticos, probióticos ni yogurt.

---

## 🛠️ Guía de Despliegue en 4 Pasos

### Paso 1: Importar el Workflow en n8n
1. Ingresa a tu panel de n8n en el VPS (`https://n8n.tuagencia.com`).
2. Haz clic en **Workflows** > **Add Workflow** > Menú de 3 puntos en la esquina superior derecha > **Import from File**.
3. Selecciona el archivo [`gonzalez_prato_clinical_agent_workflow.json`](file:///C:/Proyectos/Laboratorio-Gonzalez-Prato/agents/n8n/gonzalez_prato_clinical_agent_workflow.json).

### Paso 2: Configurar las Credenciales del Cliente
1. **Google Gemini Chat Model**:
   - Crea una credencial de tipo **Google Gemini API**.
   - Pega el API Key generado en la cuenta de Google AI Studio del cliente.
   - Modelo seleccionado: `models/gemini-2.0-flash` (latencia ultra baja y alta capacidad multimodal para récipe médico manuscrito).
2. **Meta WhatsApp API**:
   - En el nodo **HTTP Request (Meta Media)** y **WhatsApp Send Message**, configura el Token de Acceso del cliente (`Bearer EAA...`) y el `Phone Number ID`.

### Paso 3: Configurar el Webhook en Meta Developers
1. En el portal de desarrolladores de Meta (WhatsApp > Configuration):
2. **Callback URL**: `https://n8n.tuagencia.com/webhook/whatsapp-gonzalez-prato`
3. **Verify Token**: Define una clave segura y configúrala en el nodo de validación.
4. **Webhook Fields**: Marca la casilla `messages`.

### Paso 4: Activación y Pruebas
1. Activa el interruptor **Active (Production)** en n8n.
2. Envía un mensaje de prueba al WhatsApp del laboratorio:
   - *Prueba 1 (Texto)*: *"Buenas tardes, ¿qué precio tiene el Perfil 20 y qué ayuno necesito?"*
   - *Prueba 2 (Foto)*: Envía una foto de un récipe médico manuscrito.
   - *Prueba 3 (Convenio Caracas)*: *"Deseo cotizar el RAST de 90 alimentos"*. (Verificar que devuelva la leyenda oficial de envío a Caracas y active la alerta de recepción).