'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { SearchIcon, ArrowRightIcon } from 'lucide-react';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative w-full bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-black/10">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
      </div>
      
      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <motion.h1 
            className="text-4xl md:text-6xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Your Perfect Domain
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">
              Awaits
            </span>
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Discover premium domains with AI-generated use cases, 
            logo concepts, and instant offer submission. 
            Find your next business domain today.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="relative w-full sm:w-auto">
              <input
                type="text"
                placeholder="Search domains..."
                className="w-full sm:w-96 px-6 py-4 rounded-full text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 shadow-lg"
              />
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 bg-blue-600 hover:bg-blue-700 rounded-full transition-colors">
                <SearchIcon className="w-5 h-5 text-white" />
              </button>
            </div>
            
            <button className="flex items-center space-x-2 bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-8 py-4 rounded-full font-semibold transition-colors shadow-lg">
              <span>Browse All Domains</span>
              <ArrowRightIcon className="w-5 h-5" />
            </button>
          </motion.div>
          
          <motion.div 
            className="mt-12 flex flex-wrap justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {['Tech', 'Business', 'Creative', 'E-commerce', 'Startup'].map((category) => (
              <span
                key={category}
                className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium hover:bg-white/30 transition-colors cursor-pointer"
              >
                {category}
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
