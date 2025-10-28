'use client';

import React, { useState } from 'react';
import { SearchIcon, FilterIcon, XIcon } from 'lucide-react';
import { DomainFilters } from '@/types/domain';

interface SearchAndFiltersProps {
  onFiltersChange?: (filters: DomainFilters) => void;
}

export const SearchAndFilters: React.FC<SearchAndFiltersProps> = ({ onFiltersChange }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedPriceRange, setSelectedPriceRange] = useState('');
  const [selectedExtension, setSelectedExtension] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const categories = [
    'All Categories',
    'Tech',
    'Business',
    'Creative',
    'E-commerce',
    'Startup',
    'Finance',
    'Health',
    'Education',
    'Entertainment'
  ];

  const priceRanges = [
    'All Prices',
    'Under $1,000',
    '$1,000 - $5,000',
    '$5,000 - $10,000',
    '$10,000 - $25,000',
    '$25,000+'
  ];

  const extensions = [
    'All Extensions',
    '.com',
    '.io',
    '.app',
    '.co',
    '.me',
    '.club'
  ];

  const handleSearch = () => {
    const filters: DomainFilters = {
      search: searchTerm || undefined,
      category: selectedCategory || undefined,
      price_range: selectedPriceRange || undefined,
      extension: selectedExtension || undefined,
    };
    onFiltersChange?.(filters);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setSelectedPriceRange('');
    setSelectedExtension('');
    onFiltersChange?.({});
  };

  return (
    <section className="bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative max-w-2xl mx-auto">
            <input
              type="text"
              placeholder="Search domains by name, keywords, or use case..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              className="w-full px-6 py-4 pl-12 pr-4 text-lg border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
            />
            <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <button
              onClick={handleSearch}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full transition-colors"
            >
              Search
            </button>
          </div>
        </div>

        {/* Filter Toggle */}
        <div className="flex justify-center mb-4">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <FilterIcon className="w-4 h-4" />
            <span>Filters</span>
          </button>
        </div>

        {/* Filters */}
        {showFilters && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Category Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {categories.map((category) => (
                    <option key={category} value={category === 'All Categories' ? '' : category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price Range Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price Range
                </label>
                <select
                  value={selectedPriceRange}
                  onChange={(e) => setSelectedPriceRange(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {priceRanges.map((range) => (
                    <option key={range} value={range === 'All Prices' ? '' : range}>
                      {range}
                    </option>
                  ))}
                </select>
              </div>

              {/* Extension Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Extension
                </label>
                <select
                  value={selectedExtension}
                  onChange={(e) => setSelectedExtension(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {extensions.map((ext) => (
                    <option key={ext} value={ext === 'All Extensions' ? '' : ext}>
                      {ext}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Filter Actions */}
            <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-200">
              <button
                onClick={clearFilters}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                <XIcon className="w-4 h-4" />
                <span>Clear All Filters</span>
              </button>
              
              <button
                onClick={handleSearch}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
              >
                Apply Filters
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

