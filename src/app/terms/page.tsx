import React from 'react';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Terms of Service</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-6">
              <strong>Last updated:</strong> {new Date().toLocaleDateString()}
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Acceptance of Terms</h2>
            <p className="text-gray-600 mb-4">
              By accessing and using DomainBrokr, you accept and agree to be bound by the terms 
              and provision of this agreement.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Use License</h2>
            <p className="text-gray-600 mb-4">
              Permission is granted to temporarily download one copy of DomainBrokr for personal, 
              non-commercial transitory viewing only.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Domain Offers</h2>
            <p className="text-gray-600 mb-4">
              All offers submitted through our platform are non-binding until accepted by the domain owner. 
              We are not responsible for the outcome of negotiations.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Disclaimer</h2>
            <p className="text-gray-600 mb-4">
              The materials on DomainBrokr are provided on an 'as is' basis. DomainBrokr makes no 
              warranties, expressed or implied, and hereby disclaims and negates all other warranties.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Limitations</h2>
            <p className="text-gray-600 mb-4">
              In no event shall DomainBrokr or its suppliers be liable for any damages arising out of 
              the use or inability to use the materials on DomainBrokr.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Contact Information</h2>
            <p className="text-gray-600">
              If you have any questions about these Terms of Service, please contact us at{' '}
              <a href="mailto:legal@domainbrokr.com" className="text-blue-600 hover:text-blue-800">
                legal@domainbrokr.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

