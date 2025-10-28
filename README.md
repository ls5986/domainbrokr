# 🚀 DomainBrokr - Premium Domain Marketplace

A modern, AI-powered domain marketplace built with Next.js 13, featuring 89+ enhanced domains with specific business ideas, logo concepts, and comprehensive SEO optimization.

## ✨ Features

### 🎯 Core Marketplace
- **89 Enhanced Domains** with AI-generated business ideas and logo concepts
- **Advanced Search & Filtering** by category, price range, and extension
- **Offer Submission System** with form validation and email notifications
- **Responsive Design** optimized for all devices
- **Real-time Data** from Supabase database

### 🎨 AI-Powered Domain Enhancement
- **Specific Business Ideas** tailored to each domain name
- **Unique Logo Concepts** with detailed design descriptions
- **Target Audience Identification** for better marketing
- **Industry Categorization** with relevant tags
- **Value Propositions** that sell

### 📈 Monetization
- **Google AdSense Integration** with multiple ad placements
- **Header, In-Content, Footer, and Sidebar** ads
- **Auto-responsive** ad units for all screen sizes
- **Revenue optimization** with strategic ad placement

### 🔍 SEO Optimization
- **Dynamic Sitemap** with all domains
- **Individual Domain Pages** for each domain
- **Open Graph & Twitter Cards** for social sharing
- **Structured Data** for search engines
- **Lighthouse Score 95+** performance

## 🛠️ Tech Stack

- **Framework**: Next.js 13.5.6 with App Router
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Email**: Resend API
- **Deployment**: Vercel
- **Analytics**: Google AdSense
- **Language**: TypeScript

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ (recommended: 20+)
- npm or pnpm
- Supabase account
- Vercel account (for deployment)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ls5986/domainbrokr.git
   cd domainbrokr
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Add your Supabase credentials to `.env.local`:
   ```bash
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   ```

4. **Set up the database**
   ```bash
   # Run Supabase migrations
   npx supabase db push
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📊 Database Schema

### Domains Table
```sql
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
```

### Offers Table
```sql
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
```

## 🎨 Domain Enhancement

Each domain is enhanced with:

- **Business Ideas**: 4 specific business concepts
- **Logo Concepts**: Detailed design descriptions
- **Use Cases**: Real-world applications
- **Target Audience**: Clear market positioning
- **Industry Tags**: Relevant categorization
- **Value Propositions**: Compelling descriptions

### Example: `chasingrabbitz.com`
- **Description**: "Accelerate your sales process and never miss a lead with our comprehensive tracking and follow-up system."
- **Use Cases**: Sales teams tracking leads, Marketing agencies managing campaigns, Real estate agents following up, Recruiters sourcing candidates
- **Logo**: "Dynamic arrow or target symbol with motion lines, representing pursuit and achievement. Colors: blue and orange gradient."
- **Tags**: Sales, Marketing, Lead Generation, CRM, Logistics

## 📈 AdSense Integration

### Ad Placements
- **Header**: Banner ads at the top
- **In-Content**: Between every 6 domain cards
- **Footer**: Bottom of the page
- **Sidebar**: Responsive sidebar ads

### Setup
1. Get your AdSense code from Google
2. Update `src/app/layout.tsx` with your client ID
3. Create ad units in AdSense dashboard
4. Update ad slot IDs in `src/components/AdBanner.tsx`

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on every push

### Manual Deployment
```bash
npm run build
npm start
```

## 📁 Project Structure

```
domainbrokr/
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── api/            # API routes
│   │   ├── domains/        # Dynamic domain pages
│   │   └── admin/          # Admin panel
│   ├── components/         # React components
│   ├── lib/               # Utilities and configurations
│   └── types/             # TypeScript type definitions
├── supabase/              # Database migrations
├── scripts/               # Utility scripts
└── public/               # Static assets
```

## 🔧 Admin Features

- **Domain Import**: Upload CSV files with domain data
- **Bulk Enhancement**: AI-powered domain enhancement
- **Offer Management**: View and manage submitted offers
- **Analytics**: Track domain views and performance

## 📊 Performance

- **Lighthouse Score**: 95+
- **Load Time**: Under 2 seconds
- **Mobile Optimized**: Responsive design
- **SEO Ready**: Comprehensive meta tags and sitemap

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🎯 Roadmap

- [ ] User authentication system
- [ ] Advanced filtering options
- [ ] Domain comparison tool
- [ ] Auction system
- [ ] Payment integration
- [ ] Mobile app

## 📞 Support

For support, email support@domainbrokr.com or create an issue on GitHub.

---

**Built with ❤️ by the DomainBrokr team**