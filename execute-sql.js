const https = require('https')

async function executeSQL() {
  console.log('🚀 Attempting to create tables via Supabase API...')
  
  const sql = `
    CREATE TABLE IF NOT EXISTS domains (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      extension VARCHAR(20) DEFAULT '.com',
      category VARCHAR(100),
      price_range VARCHAR(50),
      description TEXT,
      use_cases TEXT[],
      logo_concept TEXT,
      keywords TEXT[],
      is_premium BOOLEAN DEFAULT false,
      created_at TIMESTAMPTZ DEFAULT NOW()
    );
    
    CREATE TABLE IF NOT EXISTS offers (
      id SERIAL PRIMARY KEY,
      domain_id INTEGER,
      domain_name VARCHAR(255) NOT NULL,
      offer_amount DECIMAL(10, 2) NOT NULL,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      company VARCHAR(255),
      message TEXT,
      phone VARCHAR(50),
      created_at TIMESTAMPTZ DEFAULT NOW()
    );
  `
  
  const data = JSON.stringify({ sql })
  
  const options = {
    hostname: 'abfnhnuiofdrmergezeu.supabase.co',
    port: 443,
    path: '/rest/v1/rpc/exec',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiZm5obnVpb2Zkcm1lcmdlemV1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjExNTczNTYsImV4cCI6MjA3NjczMzM1Nn0.toON-W6yf49hNfHnwksZsyUr49hAm0xr7XtozdfVooA',
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiZm5obnVpb2Zkcm1lcmdlemV1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjExNTczNTYsImV4cCI6MjA3NjczMzM1Nn0.toON-W6yf49hNfHnwksZsyUr49hAm0xr7XtozdfVooA',
      'Content-Length': data.length
    }
  }
  
  const req = https.request(options, (res) => {
    let responseData = ''
    
    res.on('data', (chunk) => {
      responseData += chunk
    })
    
    res.on('end', () => {
      console.log('📊 Response:', responseData)
      
      if (res.statusCode === 200) {
        console.log('✅ Tables created successfully!')
      } else {
        console.log('❌ Failed to create tables')
        console.log('📋 You need to create tables manually in Supabase Dashboard')
        console.log('🔗 Go to: https://supabase.com/dashboard/project/abfnhnuiofdrmeorgezeu/sql/new')
      }
    })
  })
  
  req.on('error', (error) => {
    console.error('❌ Request failed:', error.message)
  })
  
  req.write(data)
  req.end()
}

executeSQL()

