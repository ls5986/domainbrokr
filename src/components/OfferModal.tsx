'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XIcon, DollarSign, User, Mail, Building, Phone, MessageSquare } from 'lucide-react';
import { Domain, OfferFormData } from '@/types/domain';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

interface OfferModalProps {
  isOpen: boolean;
  onClose: () => void;
  domain: Domain;
}

const offerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  company: z.string().optional(),
  phone: z.string().optional(),
  offer_amount: z.number().min(1, 'Offer amount must be at least $1'),
  message: z.string().optional(),
});

export const OfferModal: React.FC<OfferModalProps> = ({ isOpen, onClose, domain }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<OfferFormData>({
    resolver: zodResolver(offerSchema),
  });

  const onSubmit = async (data: OfferFormData) => {
    try {
      setIsSubmitting(true);

      // Submit offer to Supabase
      const response = await fetch('/api/offers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          domain_id: domain.id,
          domain_name: domain.name,
          ...data,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit offer');
      }

      setIsSubmitted(true);
      reset();
    } catch (error) {
      console.error('Error submitting offer:', error);
      alert('Failed to submit offer. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setIsSubmitted(false);
    reset();
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-screen items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleClose}
            />

            {/* Modal */}
            <motion.div
              className="relative bg-white rounded-lg shadow-xl max-w-md w-full"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Submit Offer for
                  </h3>
                  <p className="text-sm text-gray-600">
                    {domain.name}.{domain.extension}
                  </p>
                </div>
                <button
                  onClick={handleClose}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <XIcon className="w-5 h-5" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6">
                {isSubmitted ? (
                  <div className="text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">
                      Offer Submitted Successfully!
                    </h4>
                    <p className="text-gray-600 mb-6">
                      Thank you for your interest. We'll review your offer and get back to you soon.
                    </p>
                    <button
                      onClick={handleClose}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
                    >
                      Close
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {/* Name */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name *
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          {...register('name')}
                          type="text"
                          className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Enter your full name"
                        />
                      </div>
                      {errors.name && (
                        <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address *
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          {...register('email')}
                          type="email"
                          className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Enter your email"
                        />
                      </div>
                      {errors.email && (
                        <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                      )}
                    </div>

                    {/* Company */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Company (Optional)
                      </label>
                      <div className="relative">
                        <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          {...register('company')}
                          type="text"
                          className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Enter your company name"
                        />
                      </div>
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number (Optional)
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          {...register('phone')}
                          type="tel"
                          className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Enter your phone number"
                        />
                      </div>
                    </div>

                    {/* Offer Amount */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Offer Amount *
                      </label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          {...register('offer_amount', { valueAsNumber: true })}
                          type="number"
                          min="1"
                          step="0.01"
                          className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Enter your offer amount"
                        />
                      </div>
                      {errors.offer_amount && (
                        <p className="mt-1 text-sm text-red-600">{errors.offer_amount.message}</p>
                      )}
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Message (Optional)
                      </label>
                      <div className="relative">
                        <MessageSquare className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                        <textarea
                          {...register('message')}
                          rows={3}
                          className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Tell us about your plans for this domain..."
                        />
                      </div>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>Submitting...</span>
                        </>
                      ) : (
                        <>
                          <DollarSign className="w-4 h-4" />
                          <span>Submit Offer</span>
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};

