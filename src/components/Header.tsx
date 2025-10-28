'use client';

import React from 'react';
import Link from 'next/link';
import { Logo } from './Logo';
import { SearchIcon, MenuIcon } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="w-full bg-white shadow-sm border-b border-gray-200">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and brand */}
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center space-x-2">
              <Logo size="md" />
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                DomainBrokr
              </span>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              href="/" 
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              Browse Domains
            </Link>
            <Link 
              href="/categories" 
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              Categories
            </Link>
            <Link 
              href="/about" 
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              About
            </Link>
            <Link 
              href="/contact" 
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              Contact
            </Link>
          </nav>

          {/* Search and mobile menu */}
          <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-700 hover:text-blue-600 transition-colors">
              <SearchIcon className="w-5 h-5" />
            </button>
            <button className="md:hidden p-2 text-gray-700 hover:text-blue-600 transition-colors">
              <MenuIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
