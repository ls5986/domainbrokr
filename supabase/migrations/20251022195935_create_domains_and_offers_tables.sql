-- Drop existing tables if they exist
DROP TABLE IF EXISTS offers;
DROP TABLE IF EXISTS domains;

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

-- Insert sample domains
INSERT INTO domains (name, category, price_range, description, is_premium) VALUES
('techflow', 'Technology', '$5,000 - $15,000', 'Perfect for tech startups and SaaS companies', true),
('marketpulse', 'Analytics', '$3,000 - $10,000', 'Ideal for market research and analytics platforms', true),
('cloudnest', 'Cloud Services', '$4,000 - $12,000', 'Great for cloud infrastructure and hosting services', false),
('datadrop', 'AI/Data', '$8,000 - $20,000', 'Premium domain for AI and data science ventures', true),
('growthlab', 'Marketing', '$2,500 - $8,000', 'Excellent for marketing agencies and growth tools', false),
('paystream', 'Fintech', '$10,000 - $25,000', 'Prime choice for payment processing and fintech', true),
('healthhub', 'Healthcare', '$6,000 - $18,000', 'Perfect for health and wellness platforms', true),
('learnwise', 'Education', '$3,500 - $9,000', 'Ideal for e-learning and educational technology', false),
('shopverse', 'E-commerce', '$7,000 - $20,000', 'Premium domain for online retail and marketplaces', true),
('foodcraft', 'Food & Beverage', '$2,000 - $7,000', 'Great for food delivery and culinary services', false);

-- Enable Row Level Security (RLS)
ALTER TABLE domains ENABLE ROW LEVEL SECURITY;
ALTER TABLE offers ENABLE ROW LEVEL SECURITY;

-- Create policies for domains table
CREATE POLICY "Public domains are viewable by everyone." ON domains
  FOR SELECT USING (TRUE);

-- Create policies for offers table
CREATE POLICY "Offers can be created by anyone." ON offers
  FOR INSERT WITH CHECK (TRUE);

