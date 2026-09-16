async function recreate() {
  const headers = {
    'Content-Type': 'application/json',
    'apikey': 'GonzalezPratoSecret2026'
  };

  console.log('1. Creating fresh instance...');
  const createResp = await fetch('http://86.48.20.190:8080/instance/create', {
    method: 'POST',
    headers,
    body: JSON.stringify({
      instanceName: 'gonzalez-prato',
      token: 'token-gonzalez-prato',
      qrcode: true,
      integration: 'WHATSAPP-BAILEYS'
    })
  });
  const createData = await createResp.json();
  console.log('Create result:', JSON.stringify(createData, null, 2));

  console.log('\n2. Fetching fresh QR / Connect...');
  const connResp = await fetch('http://86.48.20.190:8080/instance/connect/gonzalez-prato', {
    headers: { 'apikey': 'GonzalezPratoSecret2026' }
  });
  const connData = await connResp.json();
  console.log('Pairing Code / QR count:', connData.count);
  if (connData.pairingCode) {
    console.log('Pairing code:', connData.pairingCode);
  }
}

recreate().catch(console.error);
