# DomainBrokr Deployment Guide

## 🚀 Vercel Deployment (Recommended)

### Step 1: Prepare Your Repository

1. **Initialize Git** (if not already done):
```bash
git init
git add .
git commit -m "Initial DomainBrokr setup"
```

2. **Create GitHub Repository**:
   - Go to [GitHub](https://github.com)
   - Create new repository: `domainbrokr`
   - Make it public or private (your choice)

3. **Push to GitHub**:
```bash
git remote add origin https://github.com/YOUR_USERNAME/domainbrokr.git
git branch -M main
git push -u origin main
```

### Step 2: Deploy to Vercel

1. **Go to Vercel**:
   - Visit [vercel.com](https://vercel.com)
   - Sign up with GitHub account
   - Click "New Project"

2. **Import Project**:
   - Select your `domainbrokr` repository
   - Vercel will auto-detect Next.js
   - Click "Deploy"

3. **Configure Environment Variables**:
   - Go to Project Settings → Environment Variables
   - Add all variables from `.env.local`:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://abfnhnuiofdrmergezeu.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiZm5obnVpb2Zkcm1lcmdlemV1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjExNTczNTYsImV4cCI6MjA3NjczMzM1Nn0.toON-W6yf49hNfHnwksZsyUr49hAm0xr7XtozdfVooA
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiZm5obnVpb2Zkcm1lcmdlemV1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MTE1NzM1NiwiZXhwIjoyMDc2NzMzMzU2fQ.ZqtVtBVLzV0-3MCWERWBBCPZTKp6sgs152EU9LEvUYk
RESEND_API_KEY=your_resend_api_key_here
ADMIN_EMAIL=lindsey.stevens98@outlook.com
NEXT_PUBLIC_ADSENSE_CLIENT_ID=your_adsense_client_id_here
NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app
```

### Step 3: Custom Domain Setup

1. **Buy Domain** (if needed):
   - Go to [Namecheap](https://namecheap.com), [GoDaddy](https://godaddy.com), or [Cloudflare](https://cloudflare.com)
   - Search for `domainbrokr.com`
   - Purchase the domain

2. **Configure DNS**:
   - Go to your domain registrar's DNS settings
   - Add CNAME record:
     ```
     Type: CNAME
     Name: www
     Value: cname.vercel-dns.com
     ```
   - Add A record:
     ```
     Type: A
     Name: @
     Value: 76.76.19.61
     ```

3. **Add Domain to Vercel**:
   - Go to Project Settings → Domains
   - Add `domainbrokr.com`
   - Add `www.domainbrokr.com`
   - Vercel will provide DNS instructions

### Step 4: Database Setup

1. **Go to Supabase Dashboard**:
   - Visit [supabase.com](https://supabase.com)
   - Open your project

2. **Run SQL Schema**:
   - Go to SQL Editor
   - Copy and paste the contents of `supabase-schema.sql`
   - Click "Run"

3. **Test Database Connection**:
   - Your app should now connect to Supabase
   - Test by visiting your deployed site

### Step 5: Email Setup (Resend)

1. **Create Resend Account**:
   - Go to [resend.com](https://resend.com)
   - Sign up with your email
   - Verify your email address

2. **Get API Key**:
   - Go to API Keys in dashboard
   - Create new API key
   - Copy the key

3. **Add to Vercel Environment**:
   - Update `RESEND_API_KEY` in Vercel
   - Redeploy if needed

4. **Test Email**:
   - Submit a test offer on your site
   - Check if you receive the email notification

### Step 6: Import Your Domains

1. **Access Admin Panel**:
   - Go to `https://your-domain.com/admin/import`
   - Upload your CSV file
   - Wait for processing

2. **Verify Import**:
   - Check your homepage
   - Ensure domains are displaying
   - Test search and filters

### Step 7: Google AdSense Setup

1. **Follow AdSense Guide**:
   - See `ADSENSE_SETUP.md` for detailed instructions
   - Create AdSense account
   - Add required content pages

2. **Add Ad Code**:
   - Update `AdBanner` component with your AdSense code
   - Deploy changes to Vercel

### Step 8: SEO Optimization

1. **Add Required Pages**:
   - Create `/privacy` page
   - Create `/terms` page
   - Create `/about` page
   - Create `/contact` page

2. **Update Sitemap**:
   - Add sitemap generation
   - Submit to Google Search Console

3. **Meta Tags**:
   - Already implemented in the app
   - Verify they're working correctly

## 🔧 Alternative Deployment Options

### Netlify Deployment

1. **Connect to Netlify**:
   - Go to [netlify.com](https://netlify.com)
   - Connect your GitHub repository
   - Set build command: `npm run build`
   - Set publish directory: `.next`

2. **Environment Variables**:
   - Add all environment variables in Netlify dashboard
   - Redeploy

### Railway Deployment

1. **Connect to Railway**:
   - Go to [railway.app](https://railway.app)
   - Connect GitHub repository
   - Add environment variables
   - Deploy

### Self-Hosted (VPS)

1. **Server Requirements**:
   - Ubuntu 20.04+ or CentOS 8+
   - Node.js 18+
   - Nginx or Apache
   - SSL certificate

2. **Setup Commands**:
```bash
# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Clone repository
git clone https://github.com/YOUR_USERNAME/domainbrokr.git
cd domainbrokr

# Install dependencies
npm install

# Build application
npm run build

# Start application
npm start
```

## 📊 Monitoring and Analytics

### Vercel Analytics
- Built-in analytics in Vercel dashboard
- Page views, performance metrics
- Real-time monitoring

### Google Analytics
- Add Google Analytics tracking
- Monitor user behavior
- Track conversions

### Uptime Monitoring
- Use services like UptimeRobot
- Monitor site availability
- Get alerts for downtime

## 🚀 Performance Optimization

### Vercel Optimizations
- Automatic CDN
- Edge functions
- Image optimization
- Automatic HTTPS

### Database Optimization
- Supabase connection pooling
- Query optimization
- Caching strategies

### Image Optimization
- Use Next.js Image component
- Optimize domain logos
- Lazy loading

## 🔒 Security Considerations

### Environment Variables
- Never commit `.env.local`
- Use Vercel environment variables
- Rotate keys regularly

### Database Security
- Row Level Security enabled
- API rate limiting
- Input validation

### HTTPS
- Automatic with Vercel
- SSL certificate included
- Secure headers

## 📈 Scaling Considerations

### Traffic Growth
- Vercel scales automatically
- Supabase handles database scaling
- CDN for global performance

### Cost Management
- Monitor Vercel usage
- Optimize Supabase queries
- Use caching effectively

### Backup Strategy
- Supabase automatic backups
- Code in GitHub
- Environment variables documented

## 🐛 Troubleshooting

### Common Issues

1. **Build Failures**:
   - Check Node.js version
   - Verify all dependencies installed
   - Check for TypeScript errors

2. **Database Connection**:
   - Verify Supabase credentials
   - Check network connectivity
   - Verify RLS policies

3. **Email Not Working**:
   - Check Resend API key
   - Verify email templates
   - Check spam folder

4. **Domain Not Working**:
   - Check DNS settings
   - Wait for propagation
   - Verify SSL certificate

### Debug Steps

1. **Check Logs**:
   - Vercel function logs
   - Supabase logs
   - Browser console

2. **Test Locally**:
   - Run `npm run dev`
   - Test all features
   - Check environment variables

3. **Verify Environment**:
   - All variables set correctly
   - No typos in keys
   - Proper permissions

## 📞 Support and Maintenance

### Regular Maintenance
- Update dependencies monthly
- Monitor performance
- Check for security updates
- Backup data regularly

### Monitoring
- Set up alerts for downtime
- Monitor error rates
- Track performance metrics
- Check user feedback

### Updates
- Deploy updates through Vercel
- Test in staging first
- Monitor for issues
- Rollback if needed

---

## 🎉 You're Live!

Once deployed, your DomainBrokr marketplace will be live and ready to:
- Display your domains
- Accept offers
- Generate revenue through ads
- Scale with your business

**Next Steps**:
1. Import your domains via admin panel
2. Set up Google AdSense
3. Add required content pages
4. Start marketing your marketplace!

Good luck with your domain marketplace! 🚀

