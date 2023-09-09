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
    const lowestPrice30DaysElement = document.getElementById(
        'lowest-price-30-days'
    );
    const priceWithoutCodeElement =
        document.getElementById('price-without-code');

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
// Pobierz przycisk "Zapisz produkt"
const saveProductButton = document.getElementById('save-product');

// Pobierz tabelę, do której chcesz dodać zapisane produkty
const savedProductsTable = document.getElementById('saved-products-table');

// Dodaj obsługę kliknięcia
saveProductButton.addEventListener('click', () => {
    // Pobierz dane produktu z popupu (załóżmy, że są przechowywane w zmiennej 'productData')
    const productData = {
        productName: 'Nazwa produktu',
        productPrice: 'Cena produktu',
        // Dodaj inne pola produktu
    };

    // Zapisz dane produktu w pamięci lokalnej
    chrome.storage.local.get({ savedProducts: [] }, (result) => {
        const savedProducts = result.savedProducts;
        savedProducts.push(productData);

        // Aktualizuj dane w pamięci lokalnej
        chrome.storage.local.set({ savedProducts }, () => {
            console.log('Produkt został zapisany.');

            // Dodaj pozycję do tabeli
            addProductToTable(productData);
        });
    });
});

// Funkcja dodająca pozycję do tabeli
function addProductToTable(productData) {
    // Tworzenie nowego wiersza w tabeli
    const row = savedProductsTable.insertRow();
    
    // Dodawanie komórki z nazwą produktu (skrócona)
    const nameCell = row.insertCell(0);
    const shortProductName = productData.productName.substring(0, 2);
    nameCell.textContent = shortProductName;

    // Dodawanie komórki z ceną produktu
    const priceCell = row.insertCell(1);
    priceCell.textContent = productData.productPrice;
}
