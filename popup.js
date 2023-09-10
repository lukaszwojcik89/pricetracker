// @ts-nocheck
console.log('popup.js loaded');

let currentProductDetails = null;

document.getElementById('track-price').addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
        let currentTab = tabs[0];
        chrome.tabs.sendMessage(
            currentTab.id,
            { action: 'trackPrice' },
            response => {
                console.log('Response received:', response);
                if (response) {
                    updatePopupUI(response);
                } else {
                    console.error('No data received in response');
                }
            }
        );
    });
});

function updatePopupUI(data) {
    const productNameElement = document.getElementById('product-name');
    const productPriceElement = document.getElementById('product-price');
    const lowestPrice30DaysElement = document.getElementById(
        'lowest-price-30-days'
    );
    const priceWithoutCodeElement =
        document.getElementById('price-without-code');

    if (data && data.productName) {
        productNameElement.textContent = `Nazwa produktu: ${data.productName}`;
    }

    if (data && data.productPrice) {
        productPriceElement.textContent = `Cena produktu: ${data.productPrice}`;
    }

    if (data && data.lowestPrice30Days) {
        lowestPrice30DaysElement.textContent = `Najniższa cena z 30 dni przed obniżką: ${data.lowestPrice30Days}`;
    } else {
        lowestPrice30DaysElement.textContent = '';
    }

    if (data && data.priceWithoutCode) {
        priceWithoutCodeElement.textContent = `Cena bez kodu: ${data.priceWithoutCode}`;
    } else {
        priceWithoutCodeElement.textContent = '';
    }

    currentProductDetails = data;
}

const saveProductButton = document.getElementById('save-product');

const savedProductsTable = document.getElementById('saved-products-table');

saveProductButton.addEventListener('click', () => {
    if (currentProductDetails) {
        chrome.storage.local.get({ savedProducts: [] }, result => {
            const savedProducts = result.savedProducts;
            if (
                savedProducts.some(
                    product =>
                        product.productName ===
                        currentProductDetails.productName
                )
            ) {
                alert('Wybrany produkt znajduje się już na liście');
                return;
            }

            if (savedProducts.length >= 6) {
                alert(
                    'Możesz dodać maksymalnie 6 produktów. Usuń jakiś produkt, aby dodać nowy.'
                );
                return;
            }

            savedProducts.push(currentProductDetails);

            chrome.storage.local.set({ savedProducts }, () => {
                console.log('Produkt został zapisany.');
                addProductToTable(currentProductDetails);
            });
        });
    } else {
        console.log('No product details available to save');
    }
});

function addProductToTable(productData, index) {
    const row = savedProductsTable.insertRow();

    const nameCell = row.insertCell(0);
    nameCell.textContent = productData.productName;

    const priceCell = row.insertCell(1);
    priceCell.textContent = productData.productPrice;

    const lowestPriceCell = row.insertCell(2);
    if (productData.lowestPrice30Days) {
        lowestPriceCell.textContent = productData.lowestPrice30Days;
    } else {
        lowestPriceCell.textContent = '-';
    }

    const priceWithoutCodeCell = row.insertCell(3);
    if (productData.priceWithoutCode) {
        priceWithoutCodeCell.textContent = productData.priceWithoutCode;
    } else {
        priceWithoutCodeCell.textContent = '-';
    }

    const urlCell = row.insertCell(4); // Nowa komórka dla URL
    const link = document.createElement('a'); // Stworzenie elementu <a> (link)
    link.href = productData.productURL; // Ustawienie href na URL produktu
    link.textContent = 'Link'; // Tekst do wyświetlenia
    link.target = '_blank'; // Otwarcie linku w nowej karcie
    urlCell.appendChild(link); // Dodanie linku do komórki

    const deleteCell = row.insertCell(5);
    deleteCell.style.textAlign = 'center';
    deleteCell.style.padding = '0';

    const deleteIcon = document.createElement('img');
    deleteIcon.classList.add('delete-icon');
    deleteIcon.alt = 'Usuń produkt';
    deleteIcon.style.cursor = 'pointer';
    deleteIcon.style.width = '16px';
    deleteIcon.src = getIconSrc('delete');
    deleteIcon.addEventListener('click', () =>
        removeProductFromTable(row.rowIndex)
    );
    deleteCell.appendChild(deleteIcon);

    const refreshIcon = document.createElement('img');
    refreshIcon.classList.add('refresh-icon');
    refreshIcon.alt = 'Odśwież cenę';
    refreshIcon.style.cursor = 'pointer';
    refreshIcon.style.width = '16px';
    refreshIcon.style.marginLeft = '10px'; // Add some margin between the icons
    refreshIcon.src = getIconSrc('refresh'); // Use the updated function to get the correct icon source
    refreshIcon.addEventListener('click', () => refreshProductData(product));
    deleteCell.appendChild(refreshIcon); // Add the icon to the same cell as the delete icon
}
function getIconSrc(iconType) {
    let iconPath;

    if (iconType === 'delete') {
        iconPath = document.body.classList.contains('dark-mode')
            ? 'images/trash-icon-inv.png'
            : 'images/trash-icon.png';
    } else if (iconType === 'refresh') {
        iconPath = document.body.classList.contains('dark-mode')
            ? 'images/refresh-double.256x256-inverted.png'
            : 'images/refresh-double.256x256.png';
    }
    return iconPath;
}
function updateIcons() {
    const deleteIcons = document.querySelectorAll('.delete-icon');
    deleteIcons.forEach(icon => {
        icon.src = getIconSrc('delete');
    });

    const refreshIcons = document.querySelectorAll('.refresh-icon');
    refreshIcons.forEach(icon => {
        icon.src = getIconSrc('refresh');
    });
}
document.getElementById('dark-mode-switch').addEventListener('change', () => {
    document.body.classList.toggle('dark-mode');
    updateIcons();
});

document.addEventListener('DOMContentLoaded', event => {
    fetchCurrentProductDetails();
});

function fetchCurrentProductDetails() {
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
        let currentTab = tabs[0];
        chrome.tabs.sendMessage(
            currentTab.id,
            { action: 'trackPrice' },
            response => {
                console.log('Response received:', response);
                if (response) {
                    updatePopupUI(response);
                } else {
                    console.error('No data received in response');
                }
            }
        );
    });
}

document.addEventListener('DOMContentLoaded', () => {
    loadSavedProducts();
});

function loadSavedProducts() {
    chrome.storage.local.get({ savedProducts: [] }, result => {
        const savedProducts = result.savedProducts;
        savedProducts.forEach(productData => {
            addProductToTable(productData);
        });
    });
}

function removeProductFromTable(index) {
    chrome.storage.local.get({ savedProducts: [] }, result => {
        const savedProducts = result.savedProducts;
        savedProducts.splice(index - 1, 1);

        chrome.storage.local.set({ savedProducts }, () => {
            console.log('Produkt został usunięty.');
        });
    });

    savedProductsTable.deleteRow(index);
}
const clearListButton = document.getElementById('clear-list');

clearListButton.addEventListener('click', () => {
    const confirmation = confirm(
        'Czy potwierdzasz usunięcie wszystkich produktów z listy?'
    );
    if (confirmation) {
        chrome.storage.local.set({ savedProducts: [] }, () => {
            console.log('Wszystkie produkty zostały usunięte.');
            const rows = savedProductsTable.getElementsByTagName('tr');
            while (rows.length > 1) {
                savedProductsTable.deleteRow(1);
            }
        });
    }
});

document.getElementById('dark-mode-switch').addEventListener('change', e => {
    document.body.classList.toggle('dark-mode', e.target.checked);
    updateDeleteIcons(); // Aktualizacja ikony po przełączeniu trybu
});

function refreshAllProducts() {
    const productRows = document.querySelectorAll(
        '#saved-products-table tbody tr'
    );
    productRows.forEach((row, index) => {});
}
document
    .getElementById('refresh-all')
    .addEventListener('click', refreshAllProducts);
