'use client';

import React, { useState, useEffect } from 'react';
import { DomainCard } from './DomainCard';
import { AdBanner } from './AdBanner';
import { supabase } from '@/lib/supabase';
import { Domain, DomainFilters } from '@/types/domain';

interface DomainGridProps {
  filters?: DomainFilters;
}

export const DomainGrid: React.FC<DomainGridProps> = ({ filters = {} }) => {
  const [domains, setDomains] = useState<Domain[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchDomains();
  }, [filters]);

  const fetchDomains = async () => {
    try {
      setLoading(true);
      setError(null);

      let query = supabase
        .from('domains')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      // Apply filters
      if (filters.category) {
        query = query.eq('category', filters.category);
      }
      
      if (filters.price_range) {
        // This would need more complex logic based on your price range implementation
        // For now, we'll just filter by the price_range field
        query = query.eq('price_range', filters.price_range);
      }
      
      if (filters.extension) {
        query = query.eq('extension', filters.extension);
      }
      
      if (filters.search) {
        query = query.or(`name.ilike.%${filters.search}%,description.ilike.%${filters.search}%`);
      }

      const { data, error } = await query;

      if (error) {
        throw error;
      }

      setDomains(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch domains');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-2/3 mb-4"></div>
                <div className="h-8 bg-gray-200 rounded w-full"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="text-red-600 mb-4">
              <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Error Loading Domains</h3>
            <p className="text-gray-600 mb-4">{error}</p>
            <button
              onClick={fetchDomains}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Available Domains
          </h2>
          <p className="text-gray-600">
            {domains.length} premium domains available for purchase
          </p>
        </div>

        {/* Domains Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {domains.map((domain, index) => (
            <React.Fragment key={domain.id}>
              <DomainCard domain={domain} />
              {/* Insert ad every 6 domains */}
              {(index + 1) % 6 === 0 && (
                <div className="col-span-1 md:col-span-2 lg:col-span-3">
                  <AdBanner position="content" />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* No domains message */}
        {domains.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Domains Found</h3>
            <p className="text-gray-600">
              Try adjusting your search criteria or browse all domains.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

