# 📋 Checklist Final de Despliegue en Sede — Laboratorio GONZALEZ-PRATO

**Estado del Servidor VPS (`vmi3009406.contaboserver.net` / `86.48.20.190`):**
- PostgreSQL (`evolution_postgres`), Redis (`evolution_redis`) y Evolution API (`evolution_api`) están corriendo con éxito en el puerto `8080`.
- Workflow de n8n listo en `https://bot.dazajulio.com/webhook/whatsapp-evolution-gonzalez-prato`.

---

## 🚀 3 Pasos a Ejecutar con el Celular del Laboratorio en Mano:

### 1️⃣ Paso 1: Vincular WhatsApp
Abrir en el navegador (computadora o celular):
👉 `http://86.48.20.190:8081/qr.html`
- En WhatsApp del laboratorio: **Ajustes > Dispositivos vinculados > Vincular un dispositivo** y escanear el QR.
*(Si se desea por código numérico, ejecutar en SSH: `python3 /root/generar_qr_vivo.py` o solicitar código al endpoint de Evolution).*

---

### 2️⃣ Paso 2: Activar Webhook hacia n8n
Ejecutar en la terminal SSH del servidor:
```bash
curl -X POST http://localhost:8080/webhook/set/gonzalez-prato \
  -H "Content-Type: application/json" \
  -H "apikey: GonzalezPratoSecret2026" \
  -d '{
    "webhook": {
      "enabled": true,
      "url": "https://bot.dazajulio.com/webhook/whatsapp-evolution-gonzalez-prato",
      "byEvents": false,
      "base64": true,
      "events": [
        "MESSAGES_UPSERT"
      ]
    }
  }'
```

---

### 3️⃣ Paso 3: Validación y Prueba de Fuego
1. Confirmar que el workflow en **n8n (`bot.dazajulio.com`)** esté en **Active (ON)**.
2. Escribir desde un teléfono personal al WhatsApp del laboratorio:
   > *"Buenas tardes, ¿qué precio tiene el Perfil 20 y la Glicemia, y qué ayuno necesito?"*
3. Validar:
   - ✅ Respuesta automática inmediata con precios en **$ USD** y requisitos clínicos de ayuno.
   - ✅ El software de envío de resultados del laboratorio sigue funcionando sin ninguna interferencia (gracias al filtro anticolisión `fromMe`).
