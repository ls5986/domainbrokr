'use client'

import React, { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { AdBanner } from '@/components/AdBanner'

export default function Home() {
  const [domains, setDomains] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [showOfferModal, setShowOfferModal] = useState(false)
  const [selectedDomain, setSelectedDomain] = useState<any>(null)

  useEffect(() => {
    fetchDomains()
  }, [])

  async function fetchDomains() {
    try {
      const { data, error } = await supabase
        .from('domains')
        .select('*')
        .order('is_premium', { ascending: false })

      if (error) {
        console.error('Error:', error)
      } else {
        console.log('Domains fetched:', data)
        setDomains(data || [])
      }
    } catch (err) {
      console.error('Failed to fetch:', err)
    } finally {
      setLoading(false)
    }
  }

  const filteredDomains = domains.filter(domain => {
    const matchesSearch = domain.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         domain.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || domain.category.toLowerCase() === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handleSubmitOffer = async (e: React.FormEvent) => {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    
    try {
      const { data, error } = await supabase
        .from('offers')
        .insert({
          domain_id: selectedDomain.id,
          domain_name: selectedDomain.name,
          offer_amount: parseFloat(formData.get('amount') as string),
          name: formData.get('name') as string,
          email: formData.get('email') as string,
          company: formData.get('company') as string,
          phone: formData.get('phone') as string,
          message: formData.get('message') as string
        })

      if (error) {
        console.error('Error submitting offer:', error)
        alert('Error submitting offer. Please try again.')
      } else {
        alert('Offer submitted successfully!')
        setShowOfferModal(false)
        setSelectedDomain(null)
      }
    } catch (err) {
      console.error('Failed to submit offer:', err)
      alert('Error submitting offer. Please try again.')
    }
  }

  return (
    <div className='min-h-screen bg-gray-50'>
      {/* Navigation */}
      <nav className='bg-blue-600 text-white p-4'>
        <div className='container mx-auto flex justify-between items-center'>
          <h1 className='text-2xl font-bold'>DomainBrokr</h1>
          <span>90+ Domains Available</span>
        </div>
      </nav>

      {/* Hero */}
      <div className='container mx-auto px-4 py-12'>
        <h1 className='text-4xl font-bold text-center mb-4'>Your Perfect Domain Awaits</h1>
        <p className='text-xl text-gray-600 text-center mb-8'>Find your next premium domain from our curated collection</p>

        {/* Search */}
        <div className='max-w-2xl mx-auto mb-8'>
          <input
            type='text'
            placeholder='Search domains...'
            className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Category Filters */}
        <div className='flex flex-wrap justify-center gap-2 mb-8'>
          {['All', 'Technology', 'Creative', 'E-commerce', 'Healthcare', 'Finance', 'Education', 'Premium'].map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category.toLowerCase())}
              className={`px-4 py-2 rounded-full transition ${
                selectedCategory === category.toLowerCase()
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Stats */}
        <div className='grid grid-cols-2 md:grid-cols-4 gap-4 mb-8'>
          <div className='bg-white p-4 rounded-lg shadow text-center'>
            <div className='text-2xl font-bold text-blue-600'>{domains.length}</div>
            <div className='text-gray-600'>Total Domains</div>
          </div>
          <div className='bg-white p-4 rounded-lg shadow text-center'>
            <div className='text-2xl font-bold text-green-600'>{filteredDomains.length}</div>
            <div className='text-gray-600'>Available</div>
          </div>
          <div className='bg-white p-4 rounded-lg shadow text-center'>
            <div className='text-2xl font-bold text-purple-600'>8+</div>
            <div className='text-gray-600'>Categories</div>
          </div>
          <div className='bg-white p-4 rounded-lg shadow text-center'>
            <div className='text-2xl font-bold text-orange-600'>$500K+</div>
            <div className='text-gray-600'>Total Value</div>
          </div>
        </div>

        {/* Header Ad */}
        <div className='mb-8'>
          <AdBanner position="header" />
        </div>

        {/* Loading State */}
        {loading && (
          <div className='text-center py-8'>
            <p className='text-gray-600'>Loading domains...</p>
          </div>
        )}

        {/* Domains Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {filteredDomains.map((domain, index) => (
            <React.Fragment key={domain.id}>
              <div className='bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition'>
                {domain.is_premium && (
                  <span className='bg-gradient-to-r from-yellow-400 to-orange-400 text-white text-xs px-3 py-1 rounded-full font-bold'>PREMIUM</span>
                )}
                
                {/* Mock Logo */}
                <div className='w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-xl mb-4 mt-2'>
                  {domain.name.substring(0, 2).toUpperCase()}
                </div>
                
                <h3 className='text-xl font-bold mb-2'>{domain.name}.{domain.extension}</h3>
                <p className='text-gray-600 mb-3'>{domain.description}</p>
                
                {/* Use Cases */}
                {domain.use_cases && domain.use_cases.length > 0 && (
                  <div className='mb-3'>
                    <h4 className='text-sm font-semibold text-gray-700 mb-1'>Perfect for:</h4>
                    <ul className='text-xs text-gray-600 space-y-1'>
                      {domain.use_cases.slice(0, 3).map((useCase: string, useIndex: number) => (
                        <li key={useIndex} className='flex items-center'>
                          <span className='w-1 h-1 bg-blue-500 rounded-full mr-2'></span>
                          {useCase}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                <div className='flex justify-between items-center mb-4'>
                  <span className='text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded'>{domain.category}</span>
                  <span className='text-lg font-semibold text-green-600'>{domain.price_range}</span>
                </div>
                
                <button 
                  onClick={() => {
                    setSelectedDomain(domain)
                    setShowOfferModal(true)
                  }}
                  className='w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 px-4 rounded-lg hover:from-blue-700 hover:to-purple-700 transition'
                >
                  Submit Offer
                </button>
              </div>
              
              {/* Ad between every 6 domain cards */}
              {(index + 1) % 6 === 0 && (
                <div className='col-span-full my-8'>
                  <AdBanner position="between-content" size="large" />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Footer Ad */}
        <div className='mt-12'>
          <AdBanner position="footer" />
        </div>

        {/* No Domains Message */}
        {!loading && filteredDomains.length === 0 && (
          <div className='text-center py-8'>
            <p className='text-gray-600'>No domains found matching your criteria.</p>
          </div>
        )}
      </div>

      {/* Offer Modal */}
      {showOfferModal && selectedDomain && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50'>
          <div className='bg-white rounded-lg max-w-md w-full p-6'>
            <h3 className='text-2xl font-bold mb-4'>Submit Offer for {selectedDomain.name}.{selectedDomain.extension}</h3>
            <form onSubmit={handleSubmitOffer}>
              <div className='space-y-4'>
                <input 
                  type='text' 
                  name='name'
                  placeholder='Your Name' 
                  className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent' 
                  required 
                />
                <input 
                  type='email' 
                  name='email'
                  placeholder='Email' 
                  className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent' 
                  required 
                />
                <input 
                  type='text' 
                  name='company'
                  placeholder='Company (Optional)' 
                  className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent' 
                />
                <input 
                  type='tel' 
                  name='phone'
                  placeholder='Phone' 
                  className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent' 
                />
                <input 
                  type='number' 
                  name='amount'
                  placeholder='Offer Amount ($)' 
                  className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent' 
                  required 
                />
                <textarea 
                  name='message'
                  placeholder='Message (Optional)' 
                  className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent' 
                  rows={3}
                ></textarea>
              </div>
              <div className='flex gap-3 mt-6'>
                <button 
                  type='submit' 
                  className='flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition'
                >
                  Submit Offer
                </button>
                <button 
                  type='button' 
                  onClick={() => {
                    setShowOfferModal(false)
                    setSelectedDomain(null)
                  }} 
                  className='flex-1 bg-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-400 transition'
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}