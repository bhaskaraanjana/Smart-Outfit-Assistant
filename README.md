# Smart Outfit Assist

A web application that scrapes fashion retailer websites to curate personalized outfits based on skin tone and color theory.

## Features

- **Web Scraping**: Uses Puppeteer to extract products from Old Navy and similar sites
- **Color Analysis**: Extracts dominant colors from product images using node-vibrant
- **Seasonal Color Matching**: Maps skin tones to seasonal palettes (Spring, Summer, Autumn, Winter)
- **Responsive UI**: Built with Next.js and Tailwind CSS

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm

### Installation

```bash
cd web
npm install
```

### Running the Application

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Usage

1. Select your skin tone (Fair, Medium, Olive, or Dark)
2. Paste a product category URL from Old Navy (e.g., `https://oldnavy.gap.com/browse/category.do?cid=10018`)
3. Click "Find Outfits"
4. Wait 20-40 seconds for results
5. Browse curated products matched to your skin tone

## Tech Stack

- **Frontend**: Next.js 16, React, TypeScript, Tailwind CSS
- **Scraping**: Puppeteer
- **Color Analysis**: node-vibrant, colord
- **Icons**: lucide-react

## Project Structure

```
web/
├── src/
│   ├── app/
│   │   ├── api/scrape/route.ts    # API endpoint
│   │   └── page.tsx               # Main page
│   ├── components/
│   │   ├── SkinToneSelector.tsx   # Skin tone picker
│   │   └── ProductCard.tsx        # Product display
│   ├── services/
│   │   ├── scraper.ts             # Puppeteer scraper
│   │   └── colorAnalysis.ts       # Color matching logic
│   └── types/
│       └── index.ts               # TypeScript types
```

## Notes

- Scraping can take 20-40 seconds due to headless browser overhead
- Some sites may block scrapers; Old Navy works reliably
- Color matching is simplified (warm vs. cool temperature)

## Future Enhancements

- Selfie upload for automatic skin tone detection
- More sophisticated color theory algorithms
- Support for additional retailers
- Outfit combination suggestions
- Budget filtering
