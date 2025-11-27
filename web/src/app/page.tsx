'use client';

import React, { useState } from 'react';
import { SkinToneSelector } from '@/components/SkinToneSelector';
import { ProductCard } from '@/components/ProductCard';
import { SkinTone, Product, Season } from '@/types';
import { Search, Loader2, Sparkles, AlertCircle } from 'lucide-react';

export default function Home() {
  const [selectedTone, setSelectedTone] = useState<SkinTone | null>(null);
  const [url, setUrl] = useState('');
  const [products, setProducts] = useState<(Product & { isMatch?: boolean; dominantColor?: string })[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [season, setSeason] = useState<Season | null>(null);

  const handleSearch = async () => {
    if (!selectedTone) {
      setError('Please select a skin tone first.');
      return;
    }
    if (!url) {
      setError('Please enter a product category URL.');
      return;
    }

    setLoading(true);
    setError(null);
    setProducts([]);
    setSeason(null);

    try {
      const response = await fetch('/api/scrape', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url, skinTone: selectedTone }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch products');
      }

      setProducts(data.products);
      setSeason(data.season);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="text-indigo-600" />
            <h1 className="text-xl font-bold text-gray-900">Smart Outfit Assist</h1>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">

        {/* Controls Section */}
        <section className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 space-y-8">
          <SkinToneSelector selectedTone={selectedTone} onSelect={setSelectedTone} />

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">2. Enter Shopping URL</h3>
            <div className="flex gap-4">
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="Paste a URL (e.g., https://oldnavy.gap.com/browse/category.do?cid=...)"
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-shadow"
                />
              </div>
              <button
                onClick={handleSearch}
                disabled={loading}
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5" />
                    Analyzing...
                  </>
                ) : (
                  'Find Outfits'
                )}
              </button>
            </div>
            <p className="text-sm text-gray-500">
              Try a category page from Old Navy, Gap, or similar sites.
            </p>
          </div>

          {error && (
            <div className="rounded-md bg-red-50 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <AlertCircle className="h-5 w-5 text-red-400" aria-hidden="true" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">Error</h3>
                  <div className="mt-2 text-sm text-red-700">
                    <p>{error}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* Results Section */}
        {products.length > 0 && (
          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Curated For You</h2>
              {season && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800 capitalize">
                  Season: {season}
                </span>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
