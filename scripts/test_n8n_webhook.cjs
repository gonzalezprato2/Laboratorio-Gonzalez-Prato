async function testWebhook() {
  const url = 'https://bot.dazajulio.com/webhook/whatsapp-evolution-gonzalez-prato';
  const payload = {
    event: 'messages.upsert',
    instance: 'gonzalez-prato',
    data: {
      key: {
        remoteJid: '584121234567@s.whatsapp.net',
        fromMe: false,
        id: 'TEST123456'
      },
      pushName: 'Paciente de Prueba',
      messageType: 'conversation',
      message: {
        conversation: 'Hola, buenas tardes. ¿Qué precio tiene el Perfil 20 y qué ayuno necesito?'
      }
    }
  };

  console.log('Sending test message to n8n webhook...');
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  console.log('HTTP Status:', res.status);
  const text = await res.text();
  console.log('Response body:', text);
}

testWebhook().catch(console.error);
