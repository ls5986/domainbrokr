export interface Domain {
  id: string;
  name: string;
  extension: string;
  category?: string;
  price_range?: string;
  description?: string;
  use_cases?: string[];
  logo_concept?: string;
  keywords?: string[];
  is_premium: boolean;
  is_active: boolean;
  expected_value?: number;
  created_at: string;
  updated_at: string;
}

export interface Offer {
  id: string;
  domain_id: string;
  domain_name: string;
  offer_amount: number;
  name: string;
  email: string;
  company?: string;
  message?: string;
  phone?: string;
  status: 'pending' | 'accepted' | 'rejected';
  created_at: string;
}

export interface OfferFormData {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  offer_amount: number;
  message?: string;
}

export interface DomainFilters {
  category?: string;
  price_range?: string;
  extension?: string;
  search?: string;
  is_premium?: boolean;
}

export interface DomainStats {
  total_domains: number;
  total_categories: number;
  total_offers: number;
  recent_offers: number;
}

