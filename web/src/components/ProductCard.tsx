import React from 'react';
import { Product } from '@/types';
import { ExternalLink } from 'lucide-react';

interface ProductCardProps {
    product: Product & { isMatch?: boolean; dominantColor?: string };
}

export function ProductCard({ product }: ProductCardProps) {
    return (
        <div className="group relative bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
            <div className="aspect-[3/4] overflow-hidden bg-gray-100 relative">
                <img
                    src={product.imageUrl}
                    alt={product.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                {product.isMatch && (
                    <div className="absolute top-2 right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-sm">
                        Match
                    </div>
                )}
            </div>
            <div className="p-4">
                <h3 className="font-medium text-gray-900 line-clamp-2 text-sm h-10 mb-1" title={product.title}>
                    {product.title}
                </h3>
                <div className="flex items-center justify-between mt-2">
                    <span className="font-bold text-gray-900">{product.price}</span>
                    <a
                        href={product.productUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-indigo-600 hover:text-indigo-800 p-1 rounded-full hover:bg-indigo-50 transition-colors"
                    >
                        <ExternalLink size={18} />
                    </a>
                </div>
                {product.dominantColor && (
                    <div className="mt-3 flex items-center gap-2 text-xs text-gray-500">
                        <span>Color:</span>
                        <div
                            className="w-4 h-4 rounded-full border border-gray-200"
                            style={{ backgroundColor: product.dominantColor }}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}
