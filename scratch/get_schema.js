const https = require('https');

const options = {
  hostname: 'vfhsnzbduymoqtaekmav.supabase.co',
  path: '/rest/v1/?apikey=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZmaHNuemJkdXltb3F0YWVrbWF2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM2ODcxMDQsImV4cCI6MjA4OTI2MzEwNH0.jCGzeAqx6TP_Hx-cDhZ1fqC9tk88e9LZWqL7ullpO3s',
  method: 'GET',
};

const req = https.request(options, (res) => {
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  res.on('end', () => {
    try {
      const spec = JSON.parse(data);
      const tables = spec.definitions;
      for (const [tableName, definition] of Object.entries(tables)) {
        console.log(`\nTable: ${tableName}`);
        if (definition.properties) {
          console.log(Object.keys(definition.properties).join(', '));
        }
      }
    } catch(e) {
      console.log('Error parsing JSON:', e.message);
    }
  });
});

req.on('error', (e) => {
  console.error('Request Error:', e);
});

req.end();
