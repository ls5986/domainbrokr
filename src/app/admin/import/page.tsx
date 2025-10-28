'use client';

import React, { useState } from 'react';
import { Upload, FileText, CheckCircle, AlertCircle } from 'lucide-react';

interface ImportResult {
  success: number;
  errors: string[];
}

export default function AdminImportPage() {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [result, setResult] = useState<ImportResult | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile && selectedFile.type === 'text/csv') {
      setFile(selectedFile);
      setResult(null);
    } else {
      alert('Please select a CSV file');
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setIsUploading(true);
    setResult(null);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/admin/import-domains', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setResult({ success: data.success, errors: data.errors });
      } else {
        setResult({ success: 0, errors: [data.error] });
      }
    } catch (error) {
      setResult({ 
        success: 0, 
        errors: ['Failed to upload file. Please try again.'] 
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-6 py-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Import Domains
              </h1>
              <p className="text-gray-600">
                Upload a CSV file to import domains into the marketplace
              </p>
            </div>

            {/* Upload Area */}
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors">
              <input
                type="file"
                accept=".csv"
                onChange={handleFileChange}
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="cursor-pointer flex flex-col items-center"
              >
                <Upload className="w-12 h-12 text-gray-400 mb-4" />
                <p className="text-lg font-medium text-gray-900 mb-2">
                  Choose CSV file or drag and drop
                </p>
                <p className="text-sm text-gray-500">
                  CSV files only, max 10MB
                </p>
              </label>
            </div>

            {/* File Info */}
            {file && (
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <FileText className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="font-medium text-blue-900">{file.name}</p>
                    <p className="text-sm text-blue-700">
                      {(file.size / 1024).toFixed(1)} KB
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Upload Button */}
            <div className="mt-8 text-center">
              <button
                onClick={handleUpload}
                disabled={!file || isUploading}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200 flex items-center space-x-2 mx-auto"
              >
                {isUploading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Importing...</span>
                  </>
                ) : (
                  <>
                    <Upload className="w-4 h-4" />
                    <span>Import Domains</span>
                  </>
                )}
              </button>
            </div>

            {/* Results */}
            {result && (
              <div className="mt-8">
                {result.success > 0 && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <p className="text-green-800 font-medium">
                        Successfully imported {result.success} domains
                      </p>
                    </div>
                  </div>
                )}

                {result.errors.length > 0 && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <div className="flex items-start space-x-2">
                      <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
                      <div>
                        <p className="text-red-800 font-medium mb-2">
                          {result.errors.length} error(s) occurred:
                        </p>
                        <ul className="text-red-700 text-sm space-y-1">
                          {result.errors.map((error, index) => (
                            <li key={index}>• {error}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Instructions */}
            <div className="mt-12 bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                CSV Format Requirements
              </h3>
              <div className="space-y-3 text-sm text-gray-600">
                <p>
                  <strong>Required columns:</strong> DomainName, TLD
                </p>
                <p>
                  <strong>Optional columns:</strong> Category, PriceRange, Description, UseCases, LogoConcept, Keywords, IsPremium, ExpectedValue
                </p>
                <p>
                  <strong>Example format:</strong>
                </p>
                <pre className="bg-white p-3 rounded border text-xs overflow-x-auto">
{`DomainName,TLD,Category,PriceRange,Description,IsPremium,ExpectedValue
example.com,com,Tech,$1000-5000,Great for tech startups,true,2500
mydomain.io,io,Business,$500-1000,Perfect for business,false,750`}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

