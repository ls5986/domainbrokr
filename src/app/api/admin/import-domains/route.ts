import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    const csvText = await file.text();
    const lines = csvText.split('\n');
    const headers = lines[0].split(';').map(h => h.replace(/"/g, '').trim());
    
    const domains = [];
    const errors = [];

    // Process each line (skip header)
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;

      try {
        const values = line.split(';').map(v => v.replace(/"/g, '').trim());
        
        if (values.length < 2) {
          errors.push(`Row ${i + 1}: Insufficient data`);
          continue;
        }

        const domainName = values[0];
        const extension = values[1];
        
        if (!domainName || !extension) {
          errors.push(`Row ${i + 1}: Missing domain name or extension`);
          continue;
        }

        // Generate AI content for the domain
        const aiContent = generateAIContent(domainName, extension);
        
        const domain = {
          name: domainName,
          extension: extension,
          category: getCategoryFromDomain(domainName),
          price_range: getPriceRange(domainName, extension),
          description: aiContent.description,
          use_cases: aiContent.useCases,
          logo_concept: aiContent.logoConcept,
          keywords: aiContent.keywords,
          is_premium: isPremiumDomain(domainName, extension),
          expected_value: aiContent.expectedValue,
          is_active: true,
        };

        domains.push(domain);
      } catch (error) {
        errors.push(`Row ${i + 1}: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    }

    // Insert domains into database
    let successCount = 0;
    for (const domain of domains) {
      try {
        const { error } = await supabaseAdmin
          .from('domains')
          .insert(domain);

        if (error) {
          errors.push(`Failed to insert ${domain.name}: ${error.message}`);
        } else {
          successCount++;
        }
      } catch (error) {
        errors.push(`Failed to insert ${domain.name}: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    }

    return NextResponse.json({
      success: successCount,
      errors,
    });
  } catch (error) {
    console.error('Import error:', error);
    return NextResponse.json(
      { error: 'Failed to process file' },
      { status: 500 }
    );
  }
}

function generateAIContent(domainName: string, extension: string) {
  const categories = ['Tech', 'Business', 'Creative', 'E-commerce', 'Startup', 'Finance', 'Health', 'Education'];
  const category = getCategoryFromDomain(domainName);
  
  const useCases = generateUseCases(domainName, category);
  const description = generateDescription(domainName, category);
  const logoConcept = generateLogoConcept(domainName, category);
  const keywords = generateKeywords(domainName, category);
  const expectedValue = generateExpectedValue(domainName, extension, category);

  return {
    description,
    useCases,
    logoConcept,
    keywords,
    expectedValue,
  };
}

function getCategoryFromDomain(domainName: string): string {
  const techKeywords = ['app', 'tech', 'code', 'dev', 'api', 'data', 'cloud', 'ai', 'ml'];
  const businessKeywords = ['biz', 'corp', 'company', 'business', 'enterprise', 'pro'];
  const creativeKeywords = ['art', 'design', 'creative', 'studio', 'media', 'photo', 'video'];
  const ecommerceKeywords = ['shop', 'store', 'market', 'buy', 'sell', 'commerce', 'retail'];
  
  const lowerDomain = domainName.toLowerCase();
  
  if (techKeywords.some(keyword => lowerDomain.includes(keyword))) return 'Tech';
  if (businessKeywords.some(keyword => lowerDomain.includes(keyword))) return 'Business';
  if (creativeKeywords.some(keyword => lowerDomain.includes(keyword))) return 'Creative';
  if (ecommerceKeywords.some(keyword => lowerDomain.includes(keyword))) return 'E-commerce';
  
  return 'Startup';
}

function generateUseCases(domainName: string, category: string): string[] {
  const useCaseTemplates = {
    'Tech': [
      `SaaS platform for ${domainName}`,
      `API service for ${domainName}`,
      `Developer tools for ${domainName}`,
      `Cloud infrastructure for ${domainName}`
    ],
    'Business': [
      `Corporate website for ${domainName}`,
      `Business consulting for ${domainName}`,
      `Enterprise solutions for ${domainName}`,
      `Professional services for ${domainName}`
    ],
    'Creative': [
      `Portfolio website for ${domainName}`,
      `Creative agency for ${domainName}`,
      `Design studio for ${domainName}`,
      `Art gallery for ${domainName}`
    ],
    'E-commerce': [
      `Online store for ${domainName}`,
      `Marketplace for ${domainName}`,
      `Retail platform for ${domainName}`,
      `Shopping site for ${domainName}`
    ],
    'Startup': [
      `Startup accelerator for ${domainName}`,
      `Venture capital for ${domainName}`,
      `Innovation hub for ${domainName}`,
      `Incubator for ${domainName}`
    ]
  };

  const templates = useCaseTemplates[category as keyof typeof useCaseTemplates] || useCaseTemplates.Startup;
  return templates.slice(0, 3);
}

function generateDescription(domainName: string, category: string): string {
  const descriptions = {
    'Tech': `A cutting-edge technology platform perfect for ${domainName}. Ideal for startups, developers, and tech companies looking to establish a strong digital presence.`,
    'Business': `A professional business domain for ${domainName}. Perfect for corporate websites, business services, and professional organizations.`,
    'Creative': `A creative and artistic domain for ${domainName}. Ideal for designers, artists, creative agencies, and creative professionals.`,
    'E-commerce': `A powerful e-commerce domain for ${domainName}. Perfect for online stores, marketplaces, and retail businesses.`,
    'Startup': `An innovative startup domain for ${domainName}. Ideal for new ventures, entrepreneurs, and innovative companies.`
  };

  return descriptions[category as keyof typeof descriptions] || descriptions.Startup;
}

function generateLogoConcept(domainName: string, category: string): string {
  const logoConcepts = {
    'Tech': `Modern, minimalist logo with geometric shapes and tech-inspired colors (blue, green). Clean typography with a tech-forward feel.`,
    'Business': `Professional, corporate logo with strong typography and business colors (blue, gray). Clean, trustworthy design.`,
    'Creative': `Artistic, creative logo with bold colors and unique typography. Eye-catching design that stands out.`,
    'E-commerce': `Bold, commercial logo with vibrant colors and strong visual impact. Designed to attract customers.`,
    'Startup': `Dynamic, innovative logo with modern design and startup energy. Fresh, forward-thinking aesthetic.`
  };

  return logoConcepts[category as keyof typeof logoConcepts] || logoConcepts.Startup;
}

function generateKeywords(domainName: string, category: string): string[] {
  const baseKeywords = [domainName, category.toLowerCase()];
  
  const additionalKeywords = {
    'Tech': ['technology', 'software', 'development', 'innovation'],
    'Business': ['business', 'corporate', 'professional', 'enterprise'],
    'Creative': ['creative', 'design', 'art', 'media'],
    'E-commerce': ['commerce', 'retail', 'shopping', 'marketplace'],
    'Startup': ['startup', 'innovation', 'entrepreneur', 'venture']
  };

  const keywords = additionalKeywords[category as keyof typeof additionalKeywords] || additionalKeywords.Startup;
  return [...baseKeywords, ...keywords.slice(0, 3)];
}

function generateExpectedValue(domainName: string, extension: string, category: string): number {
  let baseValue = 500;
  
  // Extension multiplier
  const extensionMultipliers = {
    '.com': 1.0,
    '.io': 0.8,
    '.app': 0.7,
    '.co': 0.6,
    '.me': 0.5,
    '.club': 0.4
  };
  
  const extensionMultiplier = extensionMultipliers[extension as keyof typeof extensionMultipliers] || 0.5;
  
  // Category multiplier
  const categoryMultipliers = {
    'Tech': 1.5,
    'Business': 1.2,
    'E-commerce': 1.3,
    'Creative': 1.0,
    'Startup': 1.1
  };
  
  const categoryMultiplier = categoryMultipliers[category as keyof typeof categoryMultipliers] || 1.0;
  
  // Domain length and quality
  const lengthMultiplier = domainName.length < 8 ? 1.5 : domainName.length < 12 ? 1.2 : 1.0;
  
  return Math.round(baseValue * extensionMultiplier * categoryMultiplier * lengthMultiplier);
}

function getPriceRange(domainName: string, extension: string): string {
  const expectedValue = generateExpectedValue(domainName, extension, getCategoryFromDomain(domainName));
  
  if (expectedValue < 1000) return 'Under $1,000';
  if (expectedValue < 5000) return '$1,000 - $5,000';
  if (expectedValue < 10000) return '$5,000 - $10,000';
  if (expectedValue < 25000) return '$10,000 - $25,000';
  return '$25,000+';
}

function isPremiumDomain(domainName: string, extension: string): boolean {
  const expectedValue = generateExpectedValue(domainName, extension, getCategoryFromDomain(domainName));
  return expectedValue >= 5000 || domainName.length <= 6;
}

