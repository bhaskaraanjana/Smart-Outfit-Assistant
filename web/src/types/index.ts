export interface Product {
    id: string;
    title: string;
    price: string;
    imageUrl: string;
    productUrl: string;
    dominantColor?: string;
}

export interface ScrapeResult {
    success: boolean;
    products: Product[];
    error?: string;
}

export type SkinTone = 'fair' | 'medium' | 'olive' | 'dark';

export type Season = 'spring' | 'summer' | 'autumn' | 'winter';
