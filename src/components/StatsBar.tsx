'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Users, DollarSign, TrendingUp } from 'lucide-react';

interface StatItem {
  icon: React.ReactNode;
  value: string;
  label: string;
}

export const StatsBar: React.FC = () => {
  const stats: StatItem[] = [
    {
      icon: <Globe className="w-6 h-6" />,
      value: "90+",
      label: "Premium Domains"
    },
    {
      icon: <Users className="w-6 h-6" />,
      value: "15+",
      label: "Categories"
    },
    {
      icon: <DollarSign className="w-6 h-6" />,
      value: "$2.5M+",
      label: "Total Value"
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      value: "24/7",
      label: "Active Offers"
    }
  ];

  return (
    <section className="bg-white py-8 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="flex justify-center mb-2 text-blue-600">
                {stat.icon}
              </div>
              <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-gray-600">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
