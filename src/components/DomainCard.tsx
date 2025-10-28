'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, ExternalLink, DollarSign } from 'lucide-react';
import { Domain } from '@/types/domain';
import { OfferModal } from './OfferModal';

interface DomainCardProps {
  domain: Domain;
}

export const DomainCard: React.FC<DomainCardProps> = ({ domain }) => {
  const [isOfferModalOpen, setIsOfferModalOpen] = useState(false);

  const formatPrice = (price?: number) => {
    if (!price) return 'Price on request';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const getCategoryColor = (category?: string) => {
    const colors: Record<string, string> = {
      'Tech': 'bg-blue-100 text-blue-800',
      'Business': 'bg-green-100 text-green-800',
      'Creative': 'bg-purple-100 text-purple-800',
      'E-commerce': 'bg-orange-100 text-orange-800',
      'Startup': 'bg-pink-100 text-pink-800',
      'Finance': 'bg-yellow-100 text-yellow-800',
      'Health': 'bg-red-100 text-red-800',
      'Education': 'bg-indigo-100 text-indigo-800',
      'Entertainment': 'bg-teal-100 text-teal-800',
    };
    return colors[category || ''] || 'bg-gray-100 text-gray-800';
  };

  return (
    <>
      <motion.div
        className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200 overflow-hidden"
        whileHover={{ y: -2 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Domain Header */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-900 mb-1">
                {domain.name}
                <span className="text-gray-500 font-normal">.{domain.extension}</span>
              </h3>
              {domain.category && (
                <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(domain.category)}`}>
                  {domain.category}
                </span>
              )}
            </div>
            {domain.is_premium && (
              <div className="flex items-center text-yellow-500">
                <Star className="w-4 h-4 fill-current" />
              </div>
            )}
          </div>

          {/* Price */}
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold text-gray-900">
              {formatPrice(domain.expected_value)}
            </div>
            <button className="text-blue-600 hover:text-blue-800 transition-colors">
              <ExternalLink className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Logo Concept */}
        {domain.logo_concept && (
          <div className="p-6 border-b border-gray-100">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Logo Concept</h4>
            <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg p-4 text-sm text-gray-600">
              {domain.logo_concept}
            </div>
          </div>
        )}

        {/* Use Cases */}
        {domain.use_cases && domain.use_cases.length > 0 && (
          <div className="p-6 border-b border-gray-100">
            <h4 className="text-sm font-medium text-gray-700 mb-3">Potential Use Cases</h4>
            <ul className="space-y-2">
              {domain.use_cases.slice(0, 3).map((useCase, index) => (
                <li key={index} className="flex items-start space-x-2 text-sm text-gray-600">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                  <span>{useCase}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Description */}
        {domain.description && (
          <div className="p-6 border-b border-gray-100">
            <p className="text-sm text-gray-600 line-clamp-3">
              {domain.description}
            </p>
          </div>
        )}

        {/* Keywords */}
        {domain.keywords && domain.keywords.length > 0 && (
          <div className="p-6 border-b border-gray-100">
            <div className="flex flex-wrap gap-2">
              {domain.keywords.slice(0, 5).map((keyword, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Action Button */}
        <div className="p-6">
          <button
            onClick={() => setIsOfferModalOpen(true)}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
          >
            <DollarSign className="w-4 h-4" />
            <span>Submit Offer</span>
          </button>
        </div>
      </motion.div>

      {/* Offer Modal */}
      <OfferModal
        isOpen={isOfferModalOpen}
        onClose={() => setIsOfferModalOpen(false)}
        domain={domain}
      />
    </>
  );
};

