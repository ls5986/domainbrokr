const { createClient } = require('@supabase/supabase-js')
const fs = require('fs')
const csv = require('csv-parser')

const supabaseUrl = 'https://abfnhnuiofdrmergezeu.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiZm5obnVpb2Zkcm1lcmdlemV1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjExNTczNTYsImV4cCI6MjA3NjczMzM1Nn0.toON-W6yf49hNfHnwksZsyUr49hAm0xr7XtozdfVooA'

const supabase = createClient(supabaseUrl, supabaseKey)

// Function to generate AI descriptions and categories
function generateDomainInfo(domainName) {
  const name = domainName.toLowerCase()
  
  // Determine category based on domain name
  let category = 'Business'
  let description = 'Professional domain perfect for business use'
  let priceRange = '$1,000 - $5,000'
  let isPremium = false
  
  // Tech/AI domains
  if (name.includes('tech') || name.includes('ai') || name.includes('app') || name.includes('code') || name.includes('data')) {
    category = 'Technology'
    description = 'Perfect for tech startups, SaaS companies, and innovative technology ventures'
    priceRange = '$3,000 - $15,000'
    isPremium = true
  }
  // Creative/Design domains
  else if (name.includes('creative') || name.includes('design') || name.includes('art') || name.includes('studio')) {
    category = 'Creative'
    description = 'Ideal for creative agencies, design studios, and artistic ventures'
    priceRange = '$2,000 - $8,000'
    isPremium = true
  }
  // E-commerce domains
  else if (name.includes('shop') || name.includes('store') || name.includes('market') || name.includes('buy') || name.includes('sell')) {
    category = 'E-commerce'
    description = 'Perfect for online stores, marketplaces, and e-commerce platforms'
    priceRange = '$4,000 - $20,000'
    isPremium = true
  }
  // Health/Wellness domains
  else if (name.includes('health') || name.includes('wellness') || name.includes('care') || name.includes('medical')) {
    category = 'Healthcare'
    description = 'Ideal for health and wellness businesses, medical practices, and healthcare startups'
    priceRange = '$5,000 - $25,000'
    isPremium = true
  }
  // Education domains
  else if (name.includes('learn') || name.includes('edu') || name.includes('school') || name.includes('academy')) {
    category = 'Education'
    description = 'Perfect for educational platforms, online learning, and educational technology'
    priceRange = '$2,500 - $10,000'
    isPremium = true
  }
  // Finance domains
  else if (name.includes('money') || name.includes('finance') || name.includes('bank') || name.includes('pay') || name.includes('cash')) {
    category = 'Finance'
    description = 'Ideal for financial services, fintech startups, and payment platforms'
    priceRange = '$8,000 - $30,000'
    isPremium = true
  }
  // Short/rare domains get premium treatment
  else if (name.length <= 6) {
    category = 'Premium'
    description = 'Short, memorable domain perfect for branding and marketing'
    priceRange = '$5,000 - $50,000'
    isPremium = true
  }
  // Brandable domains
  else if (name.includes('hub') || name.includes('lab') || name.includes('pro') || name.includes('hq')) {
    category = 'Brandable'
    description = 'Brandable domain perfect for startups and modern businesses'
    priceRange = '$2,000 - $12,000'
    isPremium = true
  }
  
  return {
    category,
    description,
    price_range: priceRange,
    is_premium: isPremium
  }
}

async function importDomains() {
  console.log('🚀 Starting domain import...')
  
  const domains = []
  
  return new Promise((resolve, reject) => {
    fs.createReadStream('domains-export-10_22_2025T02_30_PM.csv')
      .pipe(csv({ separator: ';' }))
      .on('data', (row) => {
        if (row.DomainName && row.DomainName.trim()) {
          const domainInfo = generateDomainInfo(row.DomainName)
          const extension = row.TLD || '.com'
          
          domains.push({
            name: row.DomainName.replace(/\.(com|io|app|me|club)$/, ''), // Remove extension from name
            extension: extension,
            category: domainInfo.category,
            price_range: domainInfo.price_range,
            description: domainInfo.description,
            is_premium: domainInfo.is_premium,
            keywords: [domainInfo.category.toLowerCase(), 'domain', 'brandable'],
            logo_concept: `Modern, clean logo design for ${row.DomainName} featuring contemporary typography and minimalist aesthetic`,
            use_cases: [
              `Perfect for ${domainInfo.category.toLowerCase()} businesses`,
              'Great for startups and entrepreneurs',
              'Ideal for branding and marketing',
              'Professional online presence'
            ]
          })
        }
      })
      .on('end', async () => {
        console.log(`📊 Found ${domains.length} domains to import`)
        
        try {
          // First, let's check if tables exist
          const { data: existingDomains, error: checkError } = await supabase
            .from('domains')
            .select('id')
            .limit(1)
          
          if (checkError && checkError.code === 'PGRST205') {
            console.log('❌ Database tables do not exist yet.')
            console.log('📋 You need to create the tables first in Supabase Dashboard.')
            console.log('🔗 Go to: https://supabase.com/dashboard/project/abfnhnuiofdrmeorgezeu/sql/new')
            console.log('📝 Run the SQL from setup-database.sql file')
            resolve()
            return
          }
          
          // Insert domains in batches
          const batchSize = 10
          for (let i = 0; i < domains.length; i += batchSize) {
            const batch = domains.slice(i, i + batchSize)
            console.log(`📤 Inserting batch ${Math.floor(i/batchSize) + 1}/${Math.ceil(domains.length/batchSize)}...`)
            
            const { data, error } = await supabase
              .from('domains')
              .insert(batch)
            
            if (error) {
              console.error('❌ Error inserting batch:', error)
            } else {
              console.log(`✅ Inserted ${batch.length} domains`)
            }
          }
          
          console.log('🎉 Domain import completed!')
          console.log(`📊 Total domains imported: ${domains.length}`)
          
        } catch (err) {
          console.error('❌ Import failed:', err.message)
        }
        
        resolve()
      })
      .on('error', (error) => {
        console.error('❌ CSV parsing error:', error)
        reject(error)
      })
  })
}

// Check if csv-parser is installed
try {
  require('csv-parser')
  importDomains()
} catch (err) {
  console.log('📦 Installing csv-parser...')
  const { exec } = require('child_process')
  exec('npm install csv-parser', (error, stdout, stderr) => {
    if (error) {
      console.error('❌ Failed to install csv-parser:', error)
      return
    }
    console.log('✅ csv-parser installed, running import...')
    importDomains()
  })
}

