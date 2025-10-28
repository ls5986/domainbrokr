import React from 'react';
import { Logo } from '@/components/Logo';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <Logo size="lg" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">About DomainBrokr</h1>
            <p className="text-xl text-gray-600">
              Your trusted marketplace for premium domains
            </p>
          </div>

          <div className="prose prose-lg max-w-none">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Our Mission</h2>
            <p className="text-gray-600 mb-6">
              DomainBrokr connects domain investors and businesses with premium domains. 
              We use AI-powered insights to help you find the perfect domain for your next venture.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">What Makes Us Different</h2>
            <ul className="text-gray-600 mb-6 space-y-2">
              <li>• AI-generated use cases and logo concepts for every domain</li>
              <li>• Curated collection of premium domains</li>
              <li>• Easy offer submission and negotiation</li>
              <li>• Professional marketplace experience</li>
              <li>• Secure and transparent transactions</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Our Process</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-blue-600 font-bold">1</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Browse</h3>
                <p className="text-gray-600 text-sm">Explore our curated collection of premium domains</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-blue-600 font-bold">2</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Submit Offer</h3>
                <p className="text-gray-600 text-sm">Make an offer on domains you're interested in</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-blue-600 font-bold">3</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Negotiate</h3>
                <p className="text-gray-600 text-sm">Work directly with domain owners to close deals</p>
              </div>
            </div>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Contact Us</h2>
            <p className="text-gray-600">
              Have questions? We'd love to hear from you. Contact us at{' '}
              <a href="mailto:hello@domainbrokr.com" className="text-blue-600 hover:text-blue-800">
                hello@domainbrokr.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

