# DomainBrokr - Premium Domain Marketplace

A modern, full-featured domain marketplace built with Next.js 14, TypeScript, and Supabase. Features AI-generated domain insights, offer submission system, and Google AdSense integration.

## 🚀 Features

- **Domain Display System**: Browse 90+ domains with AI-generated use cases and logo concepts
- **Smart Search & Filters**: Filter by category, price range, extension, and keywords
- **Offer Submission**: Easy offer submission with email notifications
- **Admin Import**: CSV import functionality for bulk domain management
- **Google AdSense**: Strategic ad placements for monetization
- **Responsive Design**: Mobile-first, modern UI with smooth animations
- **SEO Optimized**: Meta tags, structured data, and fast loading

## 🛠 Tech Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **Backend**: Supabase (Database, Auth, Storage)
- **Animations**: Framer Motion
- **Forms**: React Hook Form + Zod validation
- **Email**: Resend API
- **Deployment**: Vercel

## 📋 Prerequisites

- Node.js 18+ (Note: Next.js 16 requires Node 20+, but we'll work around this)
- Supabase account
- Resend account for email notifications
- Google AdSense account (for monetization)

## 🚀 Quick Start

### 1. Clone and Install

```bash
git clone <your-repo-url>
cd domainbrokr
npm install
```

### 2. Environment Setup

Copy `.env.local` and update with your credentials:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Email Configuration
RESEND_API_KEY=your_resend_api_key
ADMIN_EMAIL=your_email@example.com

# Google AdSense
NEXT_PUBLIC_ADSENSE_CLIENT_ID=your_adsense_client_id

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3. Database Setup

1. Go to your Supabase dashboard
2. Navigate to SQL Editor
3. Run the SQL from `supabase-schema.sql` to create tables and policies

### 4. Import Your Domains

1. Start the development server: `npm run dev`
2. Navigate to `/admin/import`
3. Upload your CSV file with domains
4. The system will automatically generate AI content for each domain

### 5. Start Development

```bash
npm run dev
```

Visit `http://localhost:3000` to see your domain marketplace!

## 📊 Database Schema

### Domains Table
- `id`: UUID primary key
- `name`: Domain name (e.g., "example")
- `extension`: Domain extension (e.g., "com")
- `category`: Business category
- `price_range`: Price range string
- `description`: AI-generated description
- `use_cases`: JSON array of use cases
- `logo_concept`: AI-generated logo description
- `keywords`: Array of keywords
- `is_premium`: Boolean for premium domains
- `is_active`: Boolean for active domains
- `expected_value`: Numeric expected value
- `created_at`, `updated_at`: Timestamps

### Offers Table
- `id`: UUID primary key
- `domain_id`: Foreign key to domains
- `domain_name`: Domain name for reference
- `offer_amount`: Numeric offer amount
- `name`, `email`, `company`, `phone`: Contact info
- `message`: Optional message
- `status`: Offer status (pending, accepted, rejected)
- `created_at`: Timestamp

## 🎨 Customization

### Adding New Categories
Update the category logic in `/src/app/api/admin/import-domains/route.ts`:

```typescript
function getCategoryFromDomain(domainName: string): string {
  // Add your custom category logic here
}
```

### Styling
- Main styles: `src/app/globals.css`
- Component styles: Tailwind CSS classes
- Logo: `src/components/Logo.tsx`

### AI Content Generation
Customize AI content generation in the import route:
- `generateUseCases()`: Domain use cases
- `generateDescription()`: Domain descriptions
- `generateLogoConcept()`: Logo concepts
- `generateKeywords()`: SEO keywords

## 📧 Email Setup

### Resend Configuration
1. Sign up at [Resend](https://resend.com)
2. Get your API key
3. Add to `.env.local`
4. Update `ADMIN_EMAIL` with your email

### Email Templates
Email templates are in `/src/app/api/offers/route.ts`. Customize the HTML template as needed.

## 💰 Google AdSense Setup

### 1. Create AdSense Account
1. Go to [Google AdSense](https://www.google.com/adsense/)
2. Sign up with your Google account
3. Add your website URL
4. Complete the verification process

### 2. Get Approved Quickly
- **Content**: Ensure your site has substantial, original content
- **Navigation**: Clear site structure and navigation
- **Privacy Policy**: Add privacy policy and terms of service
- **Contact Info**: Include contact information
- **Domain**: Use a custom domain (not localhost)

### 3. Ad Placements
The app includes strategic ad placements:
- Header banner
- Between domain cards (every 6 domains)
- Footer banner
- Sidebar (if implemented)

### 4. Expected Revenue
- **Domain Marketplaces**: $2-5 RPM (revenue per mille)
- **Tech/Business Sites**: $3-8 RPM
- **Premium Domains**: Higher value traffic = higher RPM

## 🚀 Deployment

### Vercel Deployment
1. Push to GitHub
2. Connect to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Custom Domain
1. Buy domain (domainbrokr.com)
2. Add to Vercel project
3. Update DNS settings
4. Update `NEXT_PUBLIC_APP_URL` in environment

## 📈 Performance Optimization

- **Images**: Optimize domain logos and images
- **CDN**: Vercel's global CDN included
- **Caching**: Supabase caching enabled
- **Lazy Loading**: Implemented for domain cards
- **SEO**: Meta tags, structured data, sitemap

## 🔧 Admin Features

### Domain Management
- **Import**: CSV bulk import at `/admin/import`
- **Edit**: Direct database editing in Supabase
- **Analytics**: View offers and statistics

### Offer Management
- **View Offers**: Check Supabase offers table
- **Respond**: Contact buyers directly
- **Track**: Monitor offer status and trends

## 📱 Mobile Optimization

- **Responsive Design**: Mobile-first approach
- **Touch Friendly**: Large buttons and touch targets
- **Fast Loading**: Optimized for mobile networks
- **PWA Ready**: Can be converted to PWA

## 🛡 Security

- **Row Level Security**: Supabase RLS enabled
- **Input Validation**: Zod schema validation
- **CSRF Protection**: Next.js built-in protection
- **Rate Limiting**: Consider adding rate limiting for API routes

## 📊 Analytics

### Built-in Analytics
- Domain views (can be tracked)
- Offer submissions
- Search queries
- Popular categories

### Google Analytics
Add Google Analytics for detailed insights:

```typescript
// Add to layout.tsx
<Script src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID" />
```

## 🎯 SEO Features

- **Meta Tags**: Dynamic meta tags for each page
- **Structured Data**: JSON-LD for domains
- **Sitemap**: Auto-generated sitemap
- **Open Graph**: Social media optimization
- **Schema Markup**: Rich snippets for domains

## 🚀 Future Enhancements

- **User Accounts**: User registration and profiles
- **Wishlist**: Save favorite domains
- **Auction System**: Bidding on premium domains
- **Advanced Search**: More sophisticated filtering
- **Domain Valuation**: Automated domain appraisal
- **Payment Integration**: Stripe for transactions

## 📞 Support

For questions or issues:
1. Check the documentation
2. Review the code comments
3. Check Supabase logs for database issues
4. Verify environment variables

## 📄 License

This project is proprietary. All rights reserved.

---

**DomainBrokr** - Your Perfect Domain Awaits! 🚀