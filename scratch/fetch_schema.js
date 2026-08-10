const { createClient } = require('@supabase/supabase-js');

const supabase = createClient('https://vfhsnzbduymoqtaekmav.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZmaHNuemJkdXltb3F0YWVrbWF2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM2ODcxMDQsImV4cCI6MjA4OTI2MzEwNH0.jCGzeAqx6TP_Hx-cDhZ1fqC9tk88e9LZWqL7ullpO3s');

async function run() {
  const { data, error } = await supabase.from('tbl_appointments').select('*').limit(1);
  if (data && data.length > 0) {
    console.log("Columns:", Object.keys(data[0]));
  } else {
    // If no data, try to cause a constraint error on a known column to get hint
    const { error } = await supabase.from('tbl_appointments').insert({ client_id: '123' });
    console.log("Empty data, try error:", error);
  }
}
run();
