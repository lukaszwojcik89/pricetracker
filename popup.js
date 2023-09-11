// // @ts-nocheck
// console.log(chrome.i18n.getMessage('popup_js_loaded'));
// let currentProductDetails = null;

// document.getElementById('track-price').addEventListener('click', () => {
//     chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
//         let currentTab = tabs[0];
//         chrome.tabs.sendMessage(
//             currentTab.id,
//             { action: 'trackPrice' },
//             response => {
//                 console.log(
//                     `${chrome.i18n.getMessage('response_received')}:`,
//                     response
//                 );
//                 if (response) {
//                     updatePopupUI(response);
//                 } else {
//                     console.error(
//                         chrome.i18n.getMessage('no_data_in_response')
//                     );
//                 }
//             }
//         );
//     });
// });

// function updatePopupUI(data) {
//     const productNameElement = document.getElementById('product-name');
//     const productPriceElement = document.getElementById('product-price');
//     const lowestPrice30DaysElement = document.getElementById(
//         'lowest-price-30-days'
//     );
//     const priceWithoutCodeElement =
//         document.getElementById('price-without-code');

//     if (data && data.productName) {
//         productNameElement.textContent = `${chrome.i18n.getMessage(
//             'product_name'
//         )}: ${data.productName}`;
//     }

//     if (data && data.productPrice) {
//         productPriceElement.textContent = `${chrome.i18n.getMessage(
//             'product_price'
//         )}: ${data.productPrice}`;
//     }

//     if (data && data.lowestPrice30Days) {
//         lowestPrice30DaysElement.textContent = `${chrome.i18n.getMessage(
//             'lowest_price_in_30_days'
//         )}: ${data.lowestPrice30Days}`;
//     } else {
//         lowestPrice30DaysElement.textContent = '';
//     }

//     if (data && data.priceWithoutCode) {
//         priceWithoutCodeElement.textContent = `${chrome.i18n.getMessage(
//             'price_without_code'
//         )}: ${data.priceWithoutCode}`;
//     } else {
//         priceWithoutCodeElement.textContent = '';
//     }

//     currentProductDetails = data;
// }

// const saveProductButton = document.getElementById('save-product');

// const savedProductsTable = document.getElementById('saved-products-table');

// function addProductToTable(productData, index) {
//     const row = savedProductsTable.insertRow();

//     const nameCell = row.insertCell(0);
//     nameCell.textContent = productData.productName;

//     const priceCell = row.insertCell(1);
//     priceCell.textContent = productData.productPrice;

//     const lowestPriceCell = row.insertCell(2);
//     if (productData.lowestPrice30Days) {
//         lowestPriceCell.textContent = productData.lowestPrice30Days;
//     } else {
//         lowestPriceCell.textContent = '-';
//     }

//     const priceWithoutCodeCell = row.insertCell(3);
//     if (productData.priceWithoutCode) {
//         priceWithoutCodeCell.textContent = productData.priceWithoutCode;
//     } else {
//         priceWithoutCodeCell.textContent = '-';
//     }

//     const urlCell = row.insertCell(4); // Nowa komórka dla URL
//     const link = document.createElement('a'); // Stworzenie elementu <a> (link)
//     link.href = productData.productURL; // Ustawienie href na URL produktu
//     link.textContent = 'Link'; // Tekst do wyświetlenia
//     link.target = '_blank'; // Otwarcie linku w nowej karcie
//     urlCell.appendChild(link); // Dodanie linku do komórki

//     const deleteCell = row.insertCell(5);
//     deleteCell.style.textAlign = 'center';
//     deleteCell.style.padding = '0';

//     const deleteIcon = document.createElement('img');
//     deleteIcon.classList.add('delete-icon');
//     deleteIcon.alt = chrome.i18n.getMessage('delete_product');
//     deleteIcon.style.cursor = 'pointer';
//     deleteIcon.style.width = '16px';
//     deleteIcon.src = getIconSrc('delete');
//     deleteIcon.addEventListener('click', () =>
//         removeProductFromTable(row.rowIndex)
//     );
//     deleteCell.appendChild(deleteIcon);

//     const refreshIcon = document.createElement('img');
//     refreshIcon.classList.add('refresh-icon');
//     refreshIcon.alt = chrome.i18n.getMessage('refresh_price');
//     refreshIcon.style.cursor = 'pointer';
//     refreshIcon.style.width = '16px';
//     refreshIcon.style.marginLeft = '10px'; // Add some margin between the icons
//     refreshIcon.src = getIconSrc('refresh'); // Use the updated function to get the correct icon source
//     refreshIcon.addEventListener('click', () => {
//         console.log(chrome.i18n.getMessage('refresh_icon_clicked'));
//         refreshProductData(productData);
//     });
//     deleteCell.appendChild(refreshIcon); // Add the icon to the same cell as the delete icon
// }
// function getIconSrc(iconType) {
//     let iconPath;

//     if (iconType === 'delete') {
//         iconPath = document.body.classList.contains('dark-mode')
//             ? 'images/trash-icon-inv.png'
//             : 'images/trash-icon.png';
//     } else if (iconType === 'refresh') {
//         iconPath = document.body.classList.contains('dark-mode')
//             ? 'images/refresh-double.256x256-inverted.png'
//             : 'images/refresh-double.256x256.png';
//     }
//     return iconPath;
// }
// function updateIcons() {
//     const deleteIcons = document.querySelectorAll('.delete-icon');
//     deleteIcons.forEach(icon => {
//         icon.src = getIconSrc('delete');
//     });

//     const refreshIcons = document.querySelectorAll('.refresh-icon');
//     refreshIcons.forEach(icon => {
//         icon.src = getIconSrc('refresh');
//     });
// }
// document.getElementById('dark-mode-switch').addEventListener('change', () => {
//     document.body.classList.toggle('dark-mode');
//     updateIcons();
// });

// document.addEventListener('DOMContentLoaded', event => {
//     fetchCurrentProductDetails();
// });

// function fetchCurrentProductDetails() {
//     chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
//         let currentTab = tabs[0];
//         chrome.tabs.sendMessage(
//             currentTab.id,
//             { action: 'trackPrice' },
//             response => {
//                 console.log(
//                     `${chrome.i18n.getMessage('response_received')}:`,
//                     response
//                 );
//                 if (response) {
//                     updatePopupUI(response);
//                 } else {
//                     console.error(
//                         chrome.i18n.getMessage('no_data_in_response')
//                     );
//                 }
//             }
//         );
//     });
// }

// document.addEventListener('DOMContentLoaded', () => {
//     let objects = document.querySelectorAll('[data-i18n]');
//     objects.forEach(obj => {
//         let message = chrome.i18n.getMessage(obj.getAttribute('data-i18n'));
//         if (message) obj.textContent = message;
//     });
//     loadSavedProducts();
// });

// function loadSavedProducts() {
//     chrome.storage.local.get({ savedProducts: [] }, result => {
//         const savedProducts = result.savedProducts;
//         savedProducts.forEach(productData => {
//             addProductToTable(productData);
//         });
//     });
// }

// function removeProductFromTable(index) {
//     chrome.storage.local.get({ savedProducts: [] }, result => {
//         const savedProducts = result.savedProducts;
//         savedProducts.splice(index - 1, 1);

//         chrome.storage.local.set({ savedProducts }, () => {
//             console.log(chrome.i18n.getMessage('product_deleted'));
//         });
//     });

//     savedProductsTable.deleteRow(index);
// }
// const clearListButton = document.getElementById('clear-list');

// clearListButton.addEventListener('click', () => {
//     const confirmation = confirm(
//         'Czy potwierdzasz usunięcie wszystkich produktów z listy?'
//     );
//     if (confirmation) {
//         chrome.storage.local.set({ savedProducts: [] }, () => {
//             console.log(chrome.i18n.getMessage('all_products_deleted'));
//             const rows = savedProductsTable.getElementsByTagName('tr');
//             while (rows.length > 1) {
//                 savedProductsTable.deleteRow(1);
//             }
//         });
//     }
// });

// document.getElementById('dark-mode-switch').addEventListener('change', e => {
//     document.body.classList.toggle('dark-mode', e.target.checked);
//     updateDeleteIcons(); // Aktualizacja ikony po przełączeniu trybu
// });

// function refreshAllProducts() {
//     console.log(chrome.i18n.getMessage('refresh_all_products_called'));
//     const productRows = document.querySelectorAll(
//         '#saved-products-table tbody tr'
//     );
//     productRows.forEach((row, index) => {
//         console.log(
//             chrome.i18n.getMessage('refreshing_product_at_index', [
//                 index.toString(),
//             ])
//         ); // Używamy zastępowania parametrów
//     });
// }
// document
//     .getElementById('refresh-all')
//     .addEventListener('click', refreshAllProducts);

// function refreshProductData(productData) {
//     console.log(
//         `${chrome.i18n.getMessage('refreshing_product')}: ${
//             productData.productName
//         }`
//     );

//     // Otwórz nową kartę z URL produktu, aby pobrać najnowsze dane
//     chrome.tabs.create({ url: productData.productURL }, tab => {
//         // Po otwarciu karty zaczekaj chwilę, aby strona się załadowała, a następnie wysyłaj wiadomość do content script
//         setTimeout(() => {
//             chrome.tabs.sendMessage(
//                 tab.id,
//                 { action: 'trackPrice' },
//                 response => {
//                     if (response) {
//                         console.log(
//                             `${chrome.i18n.getMessage('new_data_retrieved')}:`,
//                             response
//                         );

//                         // Aktualizuj dane produktu w pamięci lokalnej i w UI
//                         updateProductData(productData, response);

//                         // Zamknij kartę po zakończeniu
//                         chrome.tabs.remove(tab.id);
//                     } else {
//                         console.error(
//                             chrome.i18n.getMessage('failed_to_retrieve_data')
//                         );
//                     }
//                 }
//             );
//         }, 3000); // Ustalony czas oczekiwania - możesz go dostosować
//     });
// }

// @ts-nocheck
console.log(chrome.i18n.getMessage('popup_js_loaded'));

// Globalne zmienne
let currentProductDetails = null;
const savedProductsTable = document.getElementById('saved-products-table');

// Funkcje pomocnicze
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

// Funkcje obsługi UI
function updatePopupUI(data) {
    const productNameElement = document.getElementById('product-name');
    const productPriceElement = document.getElementById('product-price');
    const lowestPrice30DaysElement = document.getElementById(
        'lowest-price-30-days'
    );
    const priceWithoutCodeElement =
        document.getElementById('price-without-code');

    if (data && data.productName) {
        productNameElement.textContent = `${chrome.i18n.getMessage(
            'product_name'
        )}: ${data.productName}`;
    }

    if (data && data.productPrice) {
        productPriceElement.textContent = `${chrome.i18n.getMessage(
            'product_price'
        )}: ${data.productPrice}`;
    }

    if (data && data.lowestPrice30Days) {
        lowestPrice30DaysElement.textContent = `${chrome.i18n.getMessage(
            'lowest_price_in_30_days'
        )}: ${data.lowestPrice30Days}`;
    } else {
        lowestPrice30DaysElement.textContent = '';
    }

    if (data && data.priceWithoutCode) {
        priceWithoutCodeElement.textContent = `${chrome.i18n.getMessage(
            'price_without_code'
        )}: ${data.priceWithoutCode}`;
    } else {
        priceWithoutCodeElement.textContent = '';
    }

    currentProductDetails = data;
}

function addProductToTable(productData) {
    const row = savedProductsTable.insertRow();

    const nameCell = row.insertCell(0);
    nameCell.textContent = productData.productName;

    const priceCell = row.insertCell(1);
    priceCell.textContent = productData.productPrice;

    const lowestPriceCell = row.insertCell(2);
    lowestPriceCell.textContent = productData.lowestPrice30Days || '-';

    const priceWithoutCodeCell = row.insertCell(3);
    priceWithoutCodeCell.textContent = productData.priceWithoutCode || '-';

    const urlCell = row.insertCell(4);
    const link = document.createElement('a');
    link.href = productData.productURL;
    link.textContent = 'Link';
    link.target = '_blank';
    urlCell.appendChild(link);

    const actionCell = row.insertCell(5);
    actionCell.style.textAlign = 'center';
    actionCell.style.padding = '0';

    const deleteIcon = document.createElement('img');
    deleteIcon.classList.add('delete-icon');
    deleteIcon.alt = chrome.i18n.getMessage('delete_product');
    deleteIcon.style.cursor = 'pointer';
    deleteIcon.style.width = '16px';
    deleteIcon.src = getIconSrc('delete');
    deleteIcon.addEventListener('click', () =>
        removeProductFromTable(row.rowIndex)
    );
    actionCell.appendChild(deleteIcon);

    const refreshIcon = document.createElement('img');
    refreshIcon.classList.add('refresh-icon');
    refreshIcon.alt = chrome.i18n.getMessage('refresh_price');
    refreshIcon.style.cursor = 'pointer';
    refreshIcon.style.width = '16px';
    refreshIcon.style.marginLeft = '10px';
    refreshIcon.src = getIconSrc('refresh');
    refreshIcon.addEventListener('click', () => {
        console.log(chrome.i18n.getMessage('refresh_icon_clicked'));
        refreshProductData(productData);
    });
    actionCell.appendChild(refreshIcon);
}

function removeProductFromTable(index) {
    chrome.storage.local.get({ savedProducts: [] }, result => {
        const savedProducts = result.savedProducts;
        savedProducts.splice(index - 1, 1);

        chrome.storage.local.set({ savedProducts }, () => {
            console.log(chrome.i18n.getMessage('product_deleted'));
        });
    });

    savedProductsTable.deleteRow(index);
}

// Funkcje obsługi akcji
function fetchCurrentProductDetails() {
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
        let currentTab = tabs[0];
        chrome.tabs.sendMessage(
            currentTab.id,
            { action: 'trackPrice' },
            response => {
                console.log(
                    `${chrome.i18n.getMessage('response_received')}:`,
                    response
                );
                if (response) {
                    updatePopupUI(response);
                } else {
                    console.error(
                        chrome.i18n.getMessage('no_data_in_response')
                    );
                }
            }
        );
    });
}

function refreshProductData(productData) {
    console.log(
        `${chrome.i18n.getMessage('refreshing_product')}: ${
            productData.productName
        }`
    );

    chrome.tabs.create({ url: productData.productURL }, tab => {
        setTimeout(() => {
            chrome.tabs.sendMessage(
                tab.id,
                { action: 'trackPrice' },
                response => {
                    if (response) {
                        console.log(
                            `${chrome.i18n.getMessage('new_data_retrieved')}:`,
                            response
                        );

                        // Aktualizuj dane produktu w pamięci lokalnej i w UI
                        updateProductData(productData, response);

                        chrome.tabs.remove(tab.id);
                    } else {
                        console.error(
                            chrome.i18n.getMessage('failed_to_retrieve_data')
                        );
                    }
                }
            );
        }, 3000);
    });
}

// Tutaj możesz dodać funkcję updateProductData, która aktualizuje dane w pamięci lokalnej i UI.

// Event Listeners
document
    .getElementById('track-price')
    .addEventListener('click', fetchCurrentProductDetails);

document.getElementById('save-product').addEventListener('click', () => {
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
                alert(chrome.i18n.getMessage('product_already_on_list'));
                return;
            }

            if (savedProducts.length >= 6) {
                alert(chrome.i18n.getMessage('max_six_products'));
                return;
            }

            savedProducts.push(currentProductDetails);

            chrome.storage.local.set({ savedProducts }, () => {
                console.log(chrome.i18n.getMessage('product_saved'));
                addProductToTable(currentProductDetails);
            });
        });
    } else {
        console.log(chrome.i18n.getMessage('product_saved'));
    }
});

document.getElementById('dark-mode-switch').addEventListener('change', () => {
    document.body.classList.toggle('dark-mode');
    updateIcons();
});

document.getElementById('clear-list').addEventListener('click', () => {
    const confirmation = confirm(
        'Czy potwierdzasz usunięcie wszystkich produktów z listy?'
    );
    if (confirmation) {
        chrome.storage.local.set({ savedProducts: [] }, () => {
            console.log(chrome.i18n.getMessage('all_products_deleted'));
            const rows = savedProductsTable.getElementsByTagName('tr');
            while (rows.length > 1) {
                savedProductsTable.deleteRow(1);
            }
        });
    }
});

document.getElementById('refresh-all').addEventListener('click', () => {
    console.log(chrome.i18n.getMessage('refresh_all_products_called'));
    const productRows = document.querySelectorAll(
        '#saved-products-table tbody tr'
    );
    productRows.forEach((row, index) => {
        console.log(
            chrome.i18n.getMessage('refreshing_product_at_index', [
                index.toString(),
            ])
        );
    });
});

// Inicjalizacja
document.addEventListener('DOMContentLoaded', () => {
    fetchCurrentProductDetails();
    loadSavedProducts(); // Dodaj definicję funkcji loadSavedProducts poniżej

    let objects = document.querySelectorAll('[data-i18n]');
    objects.forEach(obj => {
        let message = chrome.i18n.getMessage(obj.getAttribute('data-i18n'));
        if (message) obj.textContent = message;
    });
});

function loadSavedProducts() {
    chrome.storage.local.get({ savedProducts: [] }, result => {
        const savedProducts = result.savedProducts;
        savedProducts.forEach(productData => {
            addProductToTable(productData);
        });
    });
}
