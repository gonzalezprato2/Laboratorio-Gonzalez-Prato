async function setWebhook() {
  const url = 'http://86.48.20.190:8080/webhook/set/gonzalez-prato';
  const headers = {
    'Content-Type': 'application/json',
    'apikey': 'GonzalezPratoSecret2026'
  };

  const payload = {
    webhook: {
      enabled: true,
      url: 'https://bot.dazajulio.com/webhook/whatsapp-evolution-gonzalez-prato',
      byEvents: false,
      base64: true,
      events: [
        'MESSAGES_UPSERT'
      ]
    }
  };

  console.log('Setting webhook on Evolution API...');
  const res = await fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify(payload)
  });

  const data = await res.json();
  console.log('Webhook set response:', JSON.stringify(data, null, 2));

  // Check webhook
  const checkRes = await fetch('http://86.48.20.190:8080/webhook/find/gonzalez-prato', {
    headers: { 'apikey': 'GonzalezPratoSecret2026' }
  });
  const checkData = await checkRes.json();
  console.log('Current Webhook Config:', JSON.stringify(checkData, null, 2));
}

setWebhook().catch(console.error);
