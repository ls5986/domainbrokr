const { createClient } = require('@supabase/supabase-js')

// Use service role key for admin operations
const supabaseUrl = 'https://abfnhnuiofdrmergezeu.supabase.co'
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiZm5obnVpb2Zkcm1lcmdlemV1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MTE1NzM1NiwiZXhwIjoyMDc2NzMzMzU2fQ.ZqtVtBVLzV0-3MCWERWBBCPZTKp6sgs152EU9LEvUYk'

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function createTables() {
  console.log('🚀 Creating database tables...')
  
  try {
    // Test connection first
    const { data, error } = await supabase
      .from('domains')
      .select('id')
      .limit(1)
    
    if (error && error.code === 'PGRST205') {
      console.log('❌ Tables do not exist. Creating them now...')
      
      // Unfortunately, Supabase client doesn't support DDL operations
      // We need to use the dashboard or direct SQL
      console.log('📋 Supabase client cannot create tables directly.')
      console.log('🔗 Please go to: https://supabase.com/dashboard/project/abfnhnuiofdrmeorgezeu/sql/new')
      console.log('📝 Run this SQL:')
      console.log(`
-- Create domains table
CREATE TABLE domains (
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

-- Create offers table  
CREATE TABLE offers (
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

-- Enable Row Level Security (RLS)
ALTER TABLE domains ENABLE ROW LEVEL SECURITY;
ALTER TABLE offers ENABLE ROW LEVEL SECURITY;

-- Create policies for domains table
CREATE POLICY "Public domains are viewable by everyone." ON domains
  FOR SELECT USING (TRUE);

-- Create policies for offers table
CREATE POLICY "Offers can be created by anyone." ON offers
  FOR INSERT WITH CHECK (TRUE);
      `)
      
    } else if (error) {
      console.log('❌ Database error:', error.message)
    } else {
      console.log('✅ Tables already exist!')
      console.log('📊 Found', data?.length || 0, 'domains')
    }
    
  } catch (err) {
    console.log('❌ Connection failed:', err.message)
  }
}

createTables()

