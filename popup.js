// @ts-nocheck
console.log('popup.js loaded');
document.getElementById('track-price').addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
        let currentTab = tabs[0];
        chrome.tabs.sendMessage(
            currentTab.id,
            { action: 'trackPrice' },
            response => {
                console.log('Product Details:', response);
                updatePopupUI(response); // Wywołujemy funkcję do aktualizacji interfejsu użytkownika
            }
        );
    });
});

// Funkcja do aktualizacji interfejsu użytkownika w popupie
function updatePopupUI(data) {
    const productNameElement = document.getElementById('product-name');
    const productPriceElement = document.getElementById('product-price');
    const lowestPrice30DaysElement = document.getElementById('lowest-price-30-days');
    const priceWithoutCodeElement = document.getElementById('price-without-code');

    if (data.productName) {
        productNameElement.textContent = `Nazwa produktu: ${data.productName}`;
    }

    if (data.productPrice) {
        productPriceElement.textContent = `Cena produktu: ${data.productPrice}`;
    }

    if (data.lowestPrice30Days) {
        lowestPrice30DaysElement.textContent = `${data.lowestPrice30Days}`;
    } else {
        lowestPrice30DaysElement.textContent = '';
    }

    if (data.priceWithoutCode) {
        priceWithoutCodeElement.textContent = `${data.priceWithoutCode}`;
    } else {
        priceWithoutCodeElement.textContent = '';
    }
}
