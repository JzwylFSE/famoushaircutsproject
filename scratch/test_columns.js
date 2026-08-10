const { createClient } = require('@supabase/supabase-js');
const supabase = createClient('https://vfhsnzbduymoqtaekmav.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZmaHNuemJkdXltb3F0YWVrbWF2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM2ODcxMDQsImV4cCI6MjA4OTI2MzEwNH0.jCGzeAqx6TP_Hx-cDhZ1fqC9tk88e9LZWqL7ullpO3s');

async function checkCol(colName) {
  const { error } = await supabase.from('tbl_appointments').insert({ [colName]: 1 });
  if (error && error.message.includes("Could not find the")) {
    return false;
  }
  return true;
}

async function run() {
  const colsToTest = ['amount', 'price', 'total_amount', 'amount_paid', 'client_id', 'service_id', 'appointment_date', 'payment_reference', 'status', 'notes', 'message', 'payment_ref'];
  for (const col of colsToTest) {
    const exists = await checkCol(col);
    console.log(col, exists ? 'Exists' : 'Does not exist');
  }
}
run();
