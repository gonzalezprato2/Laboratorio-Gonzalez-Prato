const fs = require('fs');
const http = require('http');

async function getQR() {
  const response = await fetch('http://86.48.20.190:8080/instance/connect/gonzalez-prato', {
    headers: { 'apikey': 'GonzalezPratoSecret2026' }
  });
  const data = await response.json();
  return data;
}

async function main() {
  try {
    const data = await getQR();
    console.log('Connect response:', data);

    const base64 = data.base64 || '';
    const html = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Vincular WhatsApp - Laboratorio González-Prato</title>
  <style>
    * { box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      margin: 0;
      background: #0f172a;
      color: #f8fafc;
    }
    .card {
      background: #1e293b;
      padding: 36px 30px;
      border-radius: 16px;
      box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.5);
      text-align: center;
      max-width: 440px;
      width: 92%;
      border: 1px solid #334155;
    }
    .badge {
      background: #065f46;
      color: #34d399;
      padding: 6px 14px;
      border-radius: 20px;
      font-size: 13px;
      font-weight: 700;
      letter-spacing: 0.05em;
      display: inline-block;
      text-transform: uppercase;
    }
    h2 {
      color: #f8fafc;
      margin: 18px 0 8px;
      font-size: 22px;
    }
    p.desc {
      color: #94a3b8;
      font-size: 14px;
      line-height: 1.5;
      margin-bottom: 20px;
    }
    .qr-container {
      background: white;
      padding: 14px;
      border-radius: 12px;
      display: inline-block;
      box-shadow: 0 4px 12px rgba(0,0,0,0.2);
    }
    img {
      width: 260px;
      height: 260px;
      display: block;
    }
    .steps {
      text-align: left;
      background: #0f172a;
      padding: 14px 18px;
      border-radius: 8px;
      margin: 20px 0;
      font-size: 13px;
      color: #cbd5e1;
      border-left: 3px solid #10b981;
      line-height: 1.6;
    }
    .steps ol {
      margin: 0;
      padding-left: 18px;
    }
    .steps li {
      margin-bottom: 4px;
    }
    .btn {
      background: #2563eb;
      color: white;
      border: none;
      padding: 12px 24px;
      border-radius: 8px;
      cursor: pointer;
      font-weight: 600;
      font-size: 14px;
      width: 100%;
      transition: background 0.2s;
    }
    .btn:hover {
      background: #1d4ed8;
    }
  </style>
</head>
<body>
  <div class="card">
    <span class="badge">GONZALEZ-PRATO</span>
    <h2>Vincular WhatsApp Oficial</h2>
    <p class="desc">Escanea el código con el teléfono del laboratorio para conectar el bot clínico.</p>
    
    <div class="qr-container">
      <img id="qrImg" src="${base64}" alt="Código QR WhatsApp" />
    </div>

    <div class="steps">
      <ol>
        <li>Abre WhatsApp en el celular del laboratorio.</li>
        <li>Toca <b>Menú / Ajustes (⚙️)</b> &gt; <b>Dispositivos vinculados</b>.</li>
        <li>Selecciona <b>Vincular un dispositivo</b> y apunta la cámara a este código.</li>
      </ol>
    </div>

    <button class="btn" onclick="location.reload()">🔄 Actualizar Código QR</button>
  </div>
</body>
</html>`;

    fs.writeFileSync('C:/Proyectos/Laboratorio-Gonzalez-Prato/vincular_whatsapp.html', html, 'utf8');
    console.log('HTML saved to C:/Proyectos/Laboratorio-Gonzalez-Prato/vincular_whatsapp.html');
  } catch (err) {
    console.error('Error generating QR:', err);
  }
}

main();
