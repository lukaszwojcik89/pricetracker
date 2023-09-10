// @ts-nocheck
function getProductDetails() {
    const productNameElement = document.querySelector(
        '.product-intro__title-text'
    );
    const productPriceElement = document.querySelector(
        '.price__value[data-test="product-main-price"]'
    );

    let lowestPrice30Days = null;
    let priceWithoutCode = null;

    const lowestPrice30DaysElement = document.querySelector(
        '.lowest-price__lowest-price--product-card > span:nth-child(1) > span:nth-child(1)'
    );

    if (lowestPrice30DaysElement) {
        const textContent = lowestPrice30DaysElement.textContent.trim();
        lowestPrice30Days = textContent.split(': ')[1];
    }

    const priceWithoutCodeElement = document.querySelector(
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

    return { productName, productPrice, lowestPrice30Days, priceWithoutCode };
}

chrome.runtime.onMessage.addListener((request, _sender, sendResponse) => {
    if (request.action === 'trackPrice') {
        console.log('Track price action triggered');
        const details = getProductDetails();
        console.log('Product Details:', details);
        sendResponse(details);
    }
});
