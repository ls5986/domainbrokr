import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { supabase } from '@/lib/supabase'

interface DomainPageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: DomainPageProps): Promise<Metadata> {
  const { slug } = params
  
  try {
    const { data: domain } = await supabase
      .from('domains')
      .select('*')
      .eq('name', slug)
      .single()

    if (!domain) {
      return {
        title: 'Domain Not Found - DomainBrokr',
        description: 'The requested domain is not available.',
      }
    }

    return {
      title: `${domain.name}.${domain.extension} - Premium Domain for Sale | DomainBrokr`,
      description: `${domain.description} ${domain.name}.${domain.extension} is available for purchase. ${domain.price_range}. Perfect for ${domain.category} businesses.`,
      keywords: `${domain.name}, ${domain.name}.${domain.extension}, ${domain.category} domain, premium domain, domain for sale, ${domain.name} for sale, ${domain.category} business domain, ${domain.name} price, ${domain.name} value`,
      openGraph: {
        title: `${domain.name}.${domain.extension} - Premium Domain for Sale`,
        description: `${domain.description} ${domain.name}.${domain.extension} is available for purchase. ${domain.price_range}.`,
        url: `https://domainbrokr.com/domains/${domain.name}`,
        siteName: 'DomainBrokr',
        images: [
          {
            url: `/domains/${domain.name}-og.jpg`,
            width: 1200,
            height: 630,
            alt: `${domain.name}.${domain.extension} - Premium Domain`,
          },
        ],
        locale: 'en_US',
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image',
        title: `${domain.name}.${domain.extension} - Premium Domain for Sale`,
        description: `${domain.description} ${domain.name}.${domain.extension} is available for purchase. ${domain.price_range}.`,
        images: [`/domains/${domain.name}-og.jpg`],
      },
    }
  } catch (error) {
    return {
      title: 'Domain Not Found - DomainBrokr',
      description: 'The requested domain is not available.',
    }
  }
}

export default async function DomainPage({ params }: DomainPageProps) {
  const { slug } = params
  
  try {
    const { data: domain } = await supabase
      .from('domains')
      .select('*')
      .eq('name', slug)
      .single()

    if (!domain) {
      notFound()
    }

    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            {/* Domain Header */}
            <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
              <div className="flex items-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-2xl mr-6">
                  {domain.name.substring(0, 2).toUpperCase()}
                </div>
                <div>
                  <h1 className="text-4xl font-bold text-gray-900 mb-2">
                    {domain.name}.{domain.extension}
                  </h1>
                  {domain.is_premium && (
                    <span className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white text-sm px-3 py-1 rounded-full font-bold">
                      PREMIUM DOMAIN
                    </span>
                  )}
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Domain Details</h2>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="font-semibold">Category:</span>
                      <span className="text-gray-600">{domain.category}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-semibold">Price Range:</span>
                      <span className="text-green-600 font-bold">{domain.price_range}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-semibold">Status:</span>
                      <span className="text-green-600">Available</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Description</h2>
                  <p className="text-gray-700 mb-4">{domain.description}</p>
                  
                  {domain.use_cases && domain.use_cases.length > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Perfect for:</h3>
                      <ul className="space-y-1">
                        {domain.use_cases.map((useCase: string, index: number) => (
                          <li key={index} className="flex items-center text-gray-600">
                            <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                            {useCase}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* SEO Content */}
            <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Why {domain.name}.{domain.extension} is Perfect for Your Business
              </h2>
              <div className="prose max-w-none">
                <p className="text-gray-700 mb-4">
                  {domain.name}.{domain.extension} is a premium domain name that offers exceptional value for {domain.category.toLowerCase()} businesses. 
                  This domain combines the perfect balance of memorability, brandability, and SEO potential.
                </p>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Key Benefits:</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
                  <li>Short, memorable domain name that's easy to type and remember</li>
                  <li>Perfect for {domain.category.toLowerCase()} businesses and startups</li>
                  <li>Strong brand potential with professional appeal</li>
                  <li>SEO-friendly domain structure</li>
                  <li>Premium .{domain.extension} extension for credibility</li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">Use Cases:</h3>
                <p className="text-gray-700 mb-4">
                  {domain.name}.{domain.extension} is ideal for {domain.category.toLowerCase()} companies looking to establish a strong online presence. 
                  Whether you're launching a startup, expanding your business, or rebranding, this domain provides the perfect foundation for your digital identity.
                </p>
              </div>
            </div>

            {/* Call to Action */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-lg p-8 text-white text-center">
              <h2 className="text-3xl font-bold mb-4">Ready to Own {domain.name}.{domain.extension}?</h2>
              <p className="text-xl mb-6">Submit your offer today and secure this premium domain for your business.</p>
              <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-bold text-lg hover:bg-gray-100 transition">
                Submit Offer Now
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  } catch (error) {
    notFound()
  }
}

