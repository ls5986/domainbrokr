# Google AdSense Setup Guide for DomainBrokr

## 🎯 Quick Start Guide

### Step 1: Create Google AdSense Account

1. **Go to Google AdSense**
   - Visit [adsense.google.com](https://adsense.google.com)
   - Click "Get Started"
   - Sign in with your Google account

2. **Add Your Website**
   - Enter your website URL: `https://domainbrokr.com` (or your domain)
   - Select your country/region
   - Choose your payment method

3. **Complete Site Information**
   - Site name: "DomainBrokr"
   - Site language: English
   - Site category: "Business" or "Technology"

### Step 2: Get Approved Quickly

#### Content Requirements
- **Minimum 20-30 pages** of original content
- **Privacy Policy** and **Terms of Service** pages
- **Contact Information** clearly visible
- **About Us** page with real information
- **Professional design** and navigation

#### For DomainBrokr Specifically:
1. **Add these pages**:
   - `/privacy` - Privacy Policy
   - `/terms` - Terms of Service  
   - `/about` - About Us
   - `/contact` - Contact Information
   - `/how-it-works` - How It Works

2. **Content Strategy**:
   - Write detailed descriptions for each domain
   - Add blog posts about domain investing
   - Create domain valuation guides
   - Add domain buying tips

#### Approval Checklist
- ✅ Website is live and accessible
- ✅ Original, valuable content
- ✅ Clear navigation and structure
- ✅ Privacy policy and terms
- ✅ Contact information visible
- ✅ Professional appearance
- ✅ Mobile-friendly design
- ✅ Fast loading times

### Step 3: Ad Placement Strategy

#### Header Banner (728x90)
```html
<!-- Place in Header component -->
<div className="w-full h-24 bg-gray-100 flex items-center justify-center">
  <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-YOUR_CLIENT_ID"
          crossorigin="anonymous"></script>
  <ins className="adsbygoogle"
       style="display:block"
       data-ad-client="ca-pub-YOUR_CLIENT_ID"
       data-ad-slot="YOUR_SLOT_ID"
       data-ad-format="auto"></ins>
</div>
```

#### Content Ads (Between Domain Cards)
```html
<!-- Place every 6 domain cards -->
<div className="w-full h-32 bg-gray-100 flex items-center justify-center">
  <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-YOUR_CLIENT_ID"
          crossorigin="anonymous"></script>
  <ins className="adsbygoogle"
       style="display:block"
       data-ad-client="ca-pub-YOUR_CLIENT_ID"
       data-ad-slot="YOUR_SLOT_ID"
       data-ad-format="rectangle"></ins>
</div>
```

#### Footer Banner (728x90)
```html
<!-- Place in Footer component -->
<div className="w-full h-24 bg-gray-100 flex items-center justify-center">
  <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-YOUR_CLIENT_ID"
          crossorigin="anonymous"></script>
  <ins className="adsbygoogle"
       style="display:block"
       data-ad-client="ca-pub-YOUR_CLIENT_ID"
       data-ad-slot="YOUR_SLOT_ID"
       data-ad-format="auto"></ins>
</div>
```

### Step 4: Implementation in DomainBrokr

#### 1. Update AdBanner Component
```typescript
// src/components/AdBanner.tsx
'use client';

import { useEffect } from 'react';

interface AdBannerProps {
  position: 'header' | 'content' | 'footer' | 'sidebar';
  className?: string;
}

export const AdBanner: React.FC<AdBannerProps> = ({ position, className = '' }) => {
  useEffect(() => {
    try {
      ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
    } catch (err) {
      console.error('AdSense error:', err);
    }
  }, []);

  const getAdSlot = () => {
    switch (position) {
      case 'header': return 'YOUR_HEADER_SLOT_ID';
      case 'content': return 'YOUR_CONTENT_SLOT_ID';
      case 'footer': return 'YOUR_FOOTER_SLOT_ID';
      default: return 'YOUR_DEFAULT_SLOT_ID';
    }
  };

  return (
    <div className={`w-full ${className}`}>
      <ins 
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-YOUR_CLIENT_ID"
        data-ad-slot={getAdSlot()}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
};
```

#### 2. Add to Layout
```typescript
// src/app/layout.tsx
import Script from 'next/script';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-YOUR_CLIENT_ID"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        {/* Your app content */}
      </body>
    </html>
  );
}
```

### Step 5: Revenue Optimization

#### Expected Revenue for Domain Marketplaces
- **RPM (Revenue Per Mille)**: $2-8 per 1,000 page views
- **Domain Marketplaces**: Higher value traffic = higher RPM
- **Premium Domains**: $5-15 RPM possible

#### Revenue Calculation
```
Monthly Revenue = (Page Views / 1000) × RPM
Example: 10,000 page views × $5 RPM = $50/month
```

#### Optimization Tips
1. **Placement**: Above the fold, between content
2. **Size**: 728x90, 300x250, 336x280 work best
3. **Content**: High-quality, relevant content
4. **Traffic**: Target domain investors and businesses
5. **Mobile**: Ensure mobile-friendly ads

### Step 6: Alternative Ad Networks

If AdSense doesn't approve or you want additional revenue:

#### 1. Media.net
- Yahoo-Bing ad network
- Often easier approval than AdSense
- Good for domain/business sites

#### 2. PropellerAds
- Pop-under and banner ads
- Good for domain marketplaces
- Easy approval process

#### 3. BuySellAds
- Direct ad sales
- Higher revenue potential
- Requires sales effort

### Step 7: Monitoring and Analytics

#### AdSense Dashboard
- Monitor daily revenue
- Track RPM and CTR
- Optimize underperforming ads

#### Google Analytics
```html
<!-- Add to layout.tsx -->
<Script
  src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
  strategy="afterInteractive"
/>
<Script id="google-analytics" strategy="afterInteractive">
  {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'GA_MEASUREMENT_ID');
  `}
</Script>
```

### Step 8: Compliance and Best Practices

#### AdSense Policies
- **Content Quality**: Original, valuable content
- **Traffic Quality**: Organic, not purchased traffic
- **User Experience**: Don't overwhelm with ads
- **Click Policy**: Never click your own ads

#### DomainBrokr Specific
- **Domain Descriptions**: Write detailed, original descriptions
- **Use Cases**: Generate unique use cases for each domain
- **Blog Content**: Add domain investing articles
- **User Guides**: Create domain buying guides

### Step 9: Troubleshooting

#### Common Issues
1. **"Site under review"**: Wait 1-2 weeks, ensure content is ready
2. **"Insufficient content"**: Add more pages and original content
3. **"Site not ready"**: Improve design and user experience
4. **"Traffic issues"**: Focus on organic traffic growth

#### Solutions
- **Content**: Add 20+ pages of original content
- **Design**: Professional, mobile-friendly design
- **Navigation**: Clear site structure
- **Speed**: Optimize loading times
- **SEO**: Implement proper SEO practices

### Step 10: Revenue Timeline

#### Month 1-2: Setup and Approval
- Create AdSense account
- Add required content
- Submit for review
- Wait for approval

#### Month 3-4: Initial Revenue
- $10-50/month with low traffic
- Focus on content and SEO
- Optimize ad placements

#### Month 6+: Growth
- $100-500/month with good traffic
- Scale content and marketing
- Consider premium ad placements

### Expected Revenue for DomainBrokr

Based on domain marketplace benchmarks:

- **Low Traffic (1K views/month)**: $5-20/month
- **Medium Traffic (10K views/month)**: $50-200/month  
- **High Traffic (100K views/month)**: $500-2000/month
- **Premium Traffic (1M views/month)**: $5000-20000/month

### Final Checklist

- [ ] Google AdSense account created
- [ ] Website live with custom domain
- [ ] Privacy policy and terms added
- [ ] About and contact pages created
- [ ] 20+ pages of original content
- [ ] Professional design implemented
- [ ] Mobile-friendly responsive design
- [ ] Fast loading times (<3 seconds)
- [ ] AdSense code implemented
- [ ] Analytics tracking setup
- [ ] Submit for AdSense review
- [ ] Wait for approval (1-2 weeks)
- [ ] Start earning revenue!

---

**Note**: AdSense approval can take 1-2 weeks. Focus on creating high-quality, original content and a professional user experience to increase your chances of approval.

