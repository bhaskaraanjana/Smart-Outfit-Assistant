import puppeteer from 'puppeteer';
import { Product, ScrapeResult } from '@/types';
import path from 'path';

export async function scrapeProducts(url: string): Promise<ScrapeResult> {
    let browser;
    try {
        console.log(`Launching browser to scrape: ${url}`);
        browser = await puppeteer.launch({
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox'],
        });
        const page = await browser.newPage();

        // Set a realistic user agent
        await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');

        console.log('Navigating to page...');
        await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });

        // Scroll to bottom to trigger lazy loading
        console.log('Scrolling page...');
        await autoScroll(page);

        // Take a screenshot for debugging
        try {
            const debugPath = path.resolve(process.cwd(), 'public', 'debug-scrape.png');
            await page.screenshot({ path: debugPath, fullPage: true });
            console.log(`Saved debug screenshot to ${debugPath}`);
        } catch (e) {
            console.error('Failed to save screenshot:', e);
        }

        // Extract products
        console.log('Extracting products...');
        const products = await page.evaluate(() => {
            const items: any[] = [];

            // Broad selectors for product cards
            const potentialCards = document.querySelectorAll('div[class*="product"], div[class*="item"], a[class*="product"], li[class*="product"]');

            potentialCards.forEach((card) => {
                const img = card.querySelector('img');
                // Look for price with $ symbol or specific classes
                const priceElement = card.querySelector('[class*="price"], [class*="amount"]');
                const titleElement = card.querySelector('[class*="title"], [class*="name"], h3, h4');
                const linkElement = card.tagName === 'A' ? card : card.querySelector('a');

                if (img && linkElement) {
                    const title = titleElement?.textContent?.trim() || img.getAttribute('alt') || 'Unknown Product';
                    const price = priceElement?.textContent?.trim() || ''; // Price might be missing on some cards
                    const imageUrl = img.getAttribute('src') || img.getAttribute('data-src') || '';
                    const productUrl = (linkElement as HTMLAnchorElement).href;

                    if (title && imageUrl && productUrl) {
                        items.push({
                            title,
                            price,
                            imageUrl,
                            productUrl,
                            id: productUrl
                        });
                    }
                }
            });

            const uniqueItems = Array.from(new Map(items.map(item => [item.id, item])).values());
            return uniqueItems;
        });

        console.log(`Found ${products.length} products.`);
        await browser.close();

        return {
            success: true,
            products: products as Product[],
        };

    } catch (error) {
        console.error('Scraping failed:', error);
        if (browser) await browser.close();
        return {
            success: false,
            products: [],
            error: error instanceof Error ? error.message : 'Unknown error',
        };
    }
}

async function autoScroll(page: any) {
    await page.evaluate(async () => {
        await new Promise<void>((resolve) => {
            let totalHeight = 0;
            const distance = 100;
            const timer = setInterval(() => {
                const scrollHeight = document.body.scrollHeight;
                window.scrollBy(0, distance);
                totalHeight += distance;

                if (totalHeight >= scrollHeight - window.innerHeight || totalHeight > 5000) { // Limit scroll to avoid infinite loops
                    clearInterval(timer);
                    resolve();
                }
            }, 100);
        });
    });
}
