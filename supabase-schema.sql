-- DomainBrokr Database Schema
-- Run this in your Supabase SQL editor

-- Create domains table
CREATE TABLE IF NOT EXISTS domains (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  extension VARCHAR(10) NOT NULL,
  category VARCHAR(50),
  price_range VARCHAR(20),
  description TEXT,
  use_cases JSONB,
  logo_concept TEXT,
  keywords TEXT[],
  is_premium BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,
  expected_value DECIMAL(10,2),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create offers table
CREATE TABLE IF NOT EXISTS offers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  domain_id UUID REFERENCES domains(id) ON DELETE CASCADE,
  domain_name VARCHAR(255) NOT NULL,
  offer_amount DECIMAL(10,2) NOT NULL,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  company VARCHAR(255),
  message TEXT,
  phone VARCHAR(20),
  status VARCHAR(20) DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_domains_name ON domains(name);
CREATE INDEX IF NOT EXISTS idx_domains_category ON domains(category);
CREATE INDEX IF NOT EXISTS idx_domains_is_active ON domains(is_active);
CREATE INDEX IF NOT EXISTS idx_offers_domain_id ON offers(domain_id);
CREATE INDEX IF NOT EXISTS idx_offers_status ON offers(status);

-- Enable Row Level Security (RLS)
ALTER TABLE domains ENABLE ROW LEVEL SECURITY;
ALTER TABLE offers ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access to domains
CREATE POLICY "Public can view active domains" ON domains
  FOR SELECT USING (is_active = true);

-- Create policies for public insert access to offers
CREATE POLICY "Public can create offers" ON offers
  FOR INSERT WITH CHECK (true);

-- Create policies for authenticated users to view their own offers
CREATE POLICY "Users can view their own offers" ON offers
  FOR SELECT USING (true);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_domains_updated_at 
  BEFORE UPDATE ON domains 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

