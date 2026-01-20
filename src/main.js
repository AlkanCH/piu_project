// --- Importy komponentów i logiki stanu ---
import { fetchProducts } from './api/products.js';
import { subscribe, getState } from './state/store.js';

import './components/product-card.js';
import './components/cart-view.js';
import './components/category-filter.js';
import './components/sort-panel.js';
import './components/brand-filter.js';

// --- Inicjalizacja aplikacji ---
async function init() {
    // Pobranie produktów
    const allProducts = await fetchProducts();

    renderProducts(allProducts);

    subscribe(() => renderProducts(allProducts));

    // Wstawienie widoku koszyka
    const cartRoot = document.querySelector('#cart-root');
    if (cartRoot) {
        const cartView = document.createElement('cart-view');
        cartRoot.appendChild(cartView);
    }
}

init();

document.querySelector('#theme-toggle').addEventListener('click', () => {
    document.body.classList.toggle('dark');
});

// --- Renderowanie produktów ---
function renderProducts(allProducts) {
    const productsRoot = document.querySelector('#products-root');
    if (!productsRoot) return;

    const { selectedCategory, sortBy, selectedBrands } = getState();

    // Czyszczenie listy
    productsRoot.innerHTML = '';

    // FILTROWANIE KATEGORII
    let filtered =
        selectedCategory === 'ALL'
            ? allProducts
            : allProducts.filter((p) => p.category === selectedCategory);

    // FILTROWANIE PRODUCENTÓW
    if (selectedBrands.length > 0) {
        filtered = filtered.filter((p) => selectedBrands.includes(p.brand));
    }

    // --- SORTOWANIE ---
    if (sortBy === 'PRICE_ASC') {
        filtered = [...filtered].sort((a, b) => a.price - b.price);
    } else if (sortBy === 'PRICE_DESC') {
        filtered = [...filtered].sort((a, b) => b.price - a.price);
    }

    // --- RENDEROWANIE KART PRODUKTÓW ---
    filtered.forEach((product) => {
        const card = document.createElement('product-card');
        card.data = product;
        productsRoot.appendChild(card);
    });
}
