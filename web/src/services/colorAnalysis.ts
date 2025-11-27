import { Vibrant } from 'node-vibrant/node';
import { colord, extend } from 'colord';
import namesPlugin from 'colord/plugins/names';
import mixPlugin from 'colord/plugins/mix';

extend([namesPlugin, mixPlugin]);

export async function extractDominantColor(imageUrl: string): Promise<string> {
    try {
        // Vibrant can take a URL directly
        const palette = await Vibrant.from(imageUrl).getPalette();
        // Prefer Vibrant or Muted swatches
        const swatch = palette.Vibrant || palette.Muted || palette.DarkVibrant || palette.LightVibrant;
        return swatch ? swatch.hex : '#000000';
    } catch (error) {
        console.error('Color extraction failed for', imageUrl, error);
        return '#000000'; // Fallback
    }
}

export function getColorName(hex: string): string {
    return colord(hex).toName({ closest: true }) || hex;
}

// Basic color theory mapping
// This is a simplified version of seasonal color analysis
export function getSeasonPalette(season: string): string[] {
    switch (season.toLowerCase()) {
        case 'spring':
            return ['#FF5733', '#FFBD33', '#33FF57', '#33FFBD', '#FFC300']; // Warm, clear, light
        case 'summer':
            return ['#3357FF', '#33FFBD', '#FF33A8', '#A833FF', '#808080']; // Cool, soft, light
        case 'autumn':
            return ['#8B4513', '#D2691E', '#DAA520', '#556B2F', '#800000']; // Warm, soft, deep
        case 'winter':
            return ['#000000', '#FFFFFF', '#FF0000', '#0000FF', '#FFFF00']; // Cool, clear, deep
        default:
            return [];
    }
}

export function isColorMatch(productColor: string, season: string): boolean {
    // This is a complex topic. For MVP, we'll check if the product color 
    // is "close enough" to any color in the season's palette 
    // OR if it shares the same temperature/saturation characteristics.

    // For now, let's just check temperature (Warm vs Cool)
    const color = colord(productColor);
    const isWarm = color.toHsl().h < 180; // Very rough approximation

    if (season === 'spring' || season === 'autumn') {
        return isWarm;
    } else {
        return !isWarm;
    }
}
