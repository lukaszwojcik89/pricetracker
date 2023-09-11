// @ts-nocheck
self.addEventListener('install', () => {
    console.log('Service Worker installed');
});

self.addEventListener('activate', () => {
    console.log('Service Worker activated');
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'trackPrice') {
        fetchProductDetails(request.productURL).then(details => {
            sendResponse(details);
        });
        return true;
    }
});

async function fetchProductDetails(url) {
    try {
        const response = await fetch(url);
        const text = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(text, 'text/html');

        const productNameElement = doc.querySelector(
            '.product-intro__title-text'
        );
        const productPriceElement = doc.querySelector(
            '.price__value[data-test="product-main-price"]'
        );

        let lowestPrice30Days = null;
        let priceWithoutCode = null;

        const lowestPrice30DaysElement = doc.querySelector(
            '.lowest-price__lowest-price--product-card > span:nth-child(1) > span:nth-child(1)'
        );
        if (lowestPrice30DaysElement) {
            const textContent = lowestPrice30DaysElement.textContent.trim();
            lowestPrice30Days = textContent.split(': ')[1];
        }

        const priceWithoutCodeElement = doc.querySelector(
            '.lowest-price__lowest-price--product-card > span:nth-child(1) > span:nth-child(2)'
        );
        if (priceWithoutCodeElement) {
            const textContent = priceWithoutCodeElement.textContent.trim();
            priceWithoutCode = textContent.split(': ')[1];
        }

        const productName = productNameElement
            ? productNameElement.textContent
            : null;
        const productPrice = productPriceElement
            ? productPriceElement.textContent
            : null;

        return {
            success: true,
            productName,
            productPrice,
            lowestPrice30Days,
            priceWithoutCode,
        };
    } catch (error) {
        console.error('Failed to fetch product details', error);
        return { success: false, error: 'Failed to fetch product details' };
    }
}
