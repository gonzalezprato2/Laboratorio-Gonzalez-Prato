const http = require('http');

const PORT = 8082;

async function getQR() {
  try {
    const response = await fetch('http://86.48.20.190:8080/instance/connect/gonzalez-prato', {
      headers: { 'apikey': 'GonzalezPratoSecret2026' }
    });
    return await response.json();
  } catch (err) {
    return { error: err.message };
  }
}

const server = http.createServer(async (req, res) => {
  if (req.url === '/api/status') {
    try {
      const resp = await fetch('http://86.48.20.190:8080/instance/connectionState/gonzalez-prato', {
        headers: { 'apikey': 'GonzalezPratoSecret2026' }
      });
      const st = await resp.json();
      res.writeHead(200, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify(st));
    } catch (e) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ error: e.message }));
    }
  }

  const data = await getQR();
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
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
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
      display: inline-block;
      text-transform: uppercase;
    }
    h2 { color: #f8fafc; margin: 18px 0 8px; font-size: 22px; }
    p.desc { color: #94a3b8; font-size: 14px; margin-bottom: 20px; }
    .qr-container {
      background: white;
      padding: 14px;
      border-radius: 12px;
      display: inline-block;
      box-shadow: 0 4px 12px rgba(0,0,0,0.2);
    }
    img { width: 260px; height: 260px; display: block; }
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
    .steps ol { margin: 0; padding-left: 18px; }
    .steps li { margin-bottom: 4px; }
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
    }
    .status-box {
      margin-top: 15px;
      font-size: 13px;
      color: #38bdf8;
    }
  </style>
</head>
<body>
  <div class="card">
    <span class="badge">GONZALEZ-PRATO</span>
    <h2>Vincular WhatsApp Oficial</h2>
    <p class="desc">Escanea el código con el WhatsApp del laboratorio.</p>
    
    <div class="qr-container">
      ${base64 ? `<img src="${base64}" alt="Código QR WhatsApp" />` : `<div style="color:#333;padding:40px;">No se pudo cargar el QR. Recarga la página.</div>`}
    </div>

    <div class="steps">
      <ol>
        <li>Abre WhatsApp en el celular del laboratorio.</li>
        <li>Toca <b>Menú / Ajustes (⚙️)</b> &gt; <b>Dispositivos vinculados</b>.</li>
        <li>Selecciona <b>Vincular un dispositivo</b> y apunta la cámara.</li>
      </ol>
    </div>

    <button class="btn" onclick="location.reload()">🔄 Actualizar Código QR</button>
    <div class="status-box" id="status">Esperando escaneo...</div>
  </div>

  <script>
    async function checkStatus() {
      try {
        const res = await fetch('/api/status');
        const d = await res.json();
        const state = d?.instance?.state;
        if (state === 'open') {
          document.getElementById('status').innerHTML = '<b style="color:#10b981">✅ ¡WhatsApp Vinculado Exitosamente!</b>';
        } else if (state === 'connecting') {
          document.getElementById('status').innerText = '⏳ Esperando que escanees el código QR...';
        }
      } catch (e) {}
    }
    setInterval(checkStatus, 3000);
    checkStatus();
  </script>
</body>
</html>`;

  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end(html);
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`QR Server running at http://localhost:${PORT}`);
});
