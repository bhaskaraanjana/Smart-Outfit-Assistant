import { NextResponse } from 'next/server';
import { scrapeProducts } from '@/services/scraper';
import { extractDominantColor, isColorMatch, getSeasonPalette } from '@/services/colorAnalysis';
import { SkinTone, Season } from '@/types';

// Simple mapping from skin tone to season (simplified for MVP)
function getSeasonForSkinTone(skinTone: SkinTone): Season {
    switch (skinTone) {
        case 'fair': return 'spring'; // or summer
        case 'medium': return 'autumn';
        case 'olive': return 'autumn';
        case 'dark': return 'winter';
        default: return 'winter';
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { url, skinTone } = body;

        if (!url || !skinTone) {
            return NextResponse.json({ error: 'Missing url or skinTone' }, { status: 400 });
        }

        // 1. Scrape products
        const scrapeResult = await scrapeProducts(url);

        if (!scrapeResult.success) {
            return NextResponse.json({ error: scrapeResult.error }, { status: 500 });
        }

        const season = getSeasonForSkinTone(skinTone as SkinTone);
        const seasonPalette = getSeasonPalette(season);

        // 2. Analyze colors and filter
        // Limit to first 10 products for performance in MVP
        const productsToAnalyze = scrapeResult.products.slice(0, 10);

        const analyzedProducts = await Promise.all(productsToAnalyze.map(async (product) => {
            const dominantColor = await extractDominantColor(product.imageUrl);
            const isMatch = isColorMatch(dominantColor, season);

            return {
                ...product,
                dominantColor,
                isMatch
            };
        }));

        const matchedProducts = analyzedProducts.filter(p => p.isMatch);

        return NextResponse.json({
            season,
            palette: seasonPalette,
            products: matchedProducts,
            allScraped: analyzedProducts // Return all for debugging/comparison
        });

    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
