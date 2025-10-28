const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = 'https://abfnhnuiofdrmergezeu.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiZm5obnVpb2Zkcm1lcmdlemV1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjExNTczNTYsImV4cCI6MjA3NjczMzM1Nn0.toON-W6yf49hNfHnwksZsyUr49hAm0xr7XtozdfVooA'

const supabase = createClient(supabaseUrl, supabaseKey)

async function setupDatabase() {
  console.log('Setting up database...')
  
  try {
    // Test connection
    const { data, error } = await supabase
      .from('domains')
      .select('*')
      .limit(1)
    
    if (error && error.code === 'PGRST205') {
      console.log('❌ Database tables do not exist yet.')
      console.log('📋 You need to create the tables manually in Supabase Dashboard.')
      console.log('🔗 Go to: https://supabase.com/dashboard/project/abfnhnuiofdrmeorgezeu/sql/new')
      console.log('📝 Copy and paste the SQL from setup-database.sql file')
    } else if (error) {
      console.log('❌ Database error:', error.message)
    } else {
      console.log('✅ Database connection successful!')
      console.log('📊 Found', data?.length || 0, 'domains')
    }
  } catch (err) {
    console.log('❌ Connection failed:', err.message)
  }
}

setupDatabase()

