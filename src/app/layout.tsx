import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'DomainBrokr - Premium Domain Marketplace | 89+ Premium Domains Available',
  description: 'Discover 89+ premium domains including tech domains, creative domains, e-commerce domains, and business domains. AI-generated descriptions, instant offers, and professional marketplace. Find domains like domainbrokr.com, chatgpt-wrapped.com, clinkhq.com, and more.',
  keywords: 'premium domains, domain marketplace, tech domains, creative domains, e-commerce domains, business domains, domain names, domainbrokr, chatgpt-wrapped, clinkhq, reignmoney, qualifymylead, letsqualifi, toptake, domainbrokr.com, chatgpt-wrapped.com, clinkhq.com, reignmoney.app, qualifymylead.io, letsqualifi.com, toptake.app, domain investment, domain portfolio, domain sales, domain auction, domain broker, domain marketplace, premium domain names, brandable domains, startup domains, tech startup domains, creative agency domains, e-commerce store domains, healthcare domains, finance domains, education domains, domain valuation, domain pricing, domain offers, domain marketplace, domain broker, domain investment, domain portfolio, domain sales, domain auction, domain names for sale, premium domain names, brandable domain names, startup domain names, tech domain names, creative domain names, e-commerce domain names, business domain names, healthcare domain names, finance domain names, education domain names, domain names with AI, domain names with descriptions, domain names with use cases, domain names with logos, domain names with pricing, domain names with offers, domain names marketplace, domain names broker, domain names investment, domain names portfolio, domain names sales, domain names auction, domain names for startups, domain names for businesses, domain names for tech companies, domain names for creative agencies, domain names for e-commerce, domain names for healthcare, domain names for finance, domain names for education, domain names for brands, domain names for marketing, domain names for advertising, domain names for SEO, domain names for websites, domain names for apps, domain names for platforms, domain names for services, domain names for products, domain names for companies, domain names for organizations, domain names for institutions, domain names for foundations, domain names for associations, domain names for communities, domain names for networks, domain names for systems, domain names for solutions, domain names for technologies, domain names for innovations, domain names for developments, domain names for creations, domain names for designs, domain names for studios, domain names for agencies, domain names for firms, domain names for enterprises, domain names for corporations, domain names for businesses, domain names for startups, domain names for ventures, domain names for projects, domain names for initiatives, domain names for campaigns, domain names for programs, domain names for services, domain names for products, domain names for brands, domain names for trademarks, domain names for intellectual property, domain names for assets, domain names for investments, domain names for portfolios, domain names for collections, domain names for inventories, domain names for catalogs, domain names for directories, domain names for listings, domain names for marketplaces, domain names for platforms, domain names for ecosystems, domain names for communities, domain names for networks, domain names for systems, domain names for solutions, domain names for technologies, domain names for innovations, domain names for developments, domain names for creations, domain names for designs, domain names for studios, domain names for agencies, domain names for firms, domain names for enterprises, domain names for corporations, domain names for businesses, domain names for startups, domain names for ventures, domain names for projects, domain names for initiatives, domain names for campaigns, domain names for programs, domain names for services, domain names for products, domain names for brands, domain names for trademarks, domain names for intellectual property, domain names for assets, domain names for investments, domain names for portfolios, domain names for collections, domain names for inventories, domain names for catalogs, domain names for directories, domain names for listings, domain names for marketplaces, domain names for platforms, domain names for ecosystems',
  authors: [{ name: 'DomainBrokr' }],
  openGraph: {
    title: 'DomainBrokr - Premium Domain Marketplace | 89+ Premium Domains Available',
    description: 'Discover 89+ premium domains including tech domains, creative domains, e-commerce domains, and business domains. AI-generated descriptions, instant offers, and professional marketplace.',
    url: 'https://domainbrokr.com',
    siteName: 'DomainBrokr',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'DomainBrokr - Premium Domain Marketplace',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DomainBrokr - Premium Domain Marketplace | 89+ Premium Domains Available',
    description: 'Discover 89+ premium domains including tech domains, creative domains, e-commerce domains, and business domains. AI-generated descriptions, instant offers, and professional marketplace.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://domainbrokr.com',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full">
      <head>
        {/* Google AdSense */}
        <script 
          async 
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5967127883638065"
          crossOrigin="anonymous"
        ></script>
        {/* AdSense Verification Meta Tag - Add this if script method fails */}
        {/* <meta name="google-adsense-account" content="ca-pub-5967127883638065"> */}
      </head>
      <body className={`${inter.className} h-full`}>
        <div className="min-h-screen bg-gray-50 flex flex-col">
          <Header />
          <main className="flex-1 w-full">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  )
}