import { fetchProducts } from './api/products.js';
import './components/product-card.js';
import './components/cart-view.js';

import './components/category-filter.js';
import { subscribe, getState } from './state/store.js';

import './components/sort-panel.js';
import './components/brand-filter.js';

subscribe(() => {
    const { cart } = getState();
    document.querySelector('#cart-count').textContent = cart.length;
});

async function init() {
    // 1. Pobranie wszystkich produktów
    const allProducts = await fetchProducts();

    // 2. Render początkowy
    renderProducts(allProducts);

    // 3. Reagowanie na zmiany stanu (filtry, sortowanie, koszyk)
    subscribe(() => renderProducts(allProducts));

    // 4. Dodanie panelu filtrowania kategorii
    const productsSection = document.querySelector('.products-section');

    // 7. Dodanie widoku koszyka
    const cartRoot = document.querySelector('#cart-root');
    const cartView = document.createElement('cart-view');
    cartRoot.appendChild(cartView);

    const filtersWrapper = document.createElement('div');
    filtersWrapper.classList.add('filters-wrapper');

    productsSection.prepend(filtersWrapper);
}

init();

function renderProducts(allProducts) {
    const productsRoot = document.querySelector('#products-root');
    const { selectedCategory, sortBy, selectedBrands } = getState();

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

    // SORTOWANIE
    if (sortBy === 'PRICE_ASC') {
        filtered = [...filtered].sort((a, b) => a.price - b.price);
    }
    if (sortBy === 'PRICE_DESC') {
        filtered = [...filtered].sort((a, b) => b.price - a.price);
    }

    // RENDEROWANIE
    filtered.forEach((p) => {
        const card = document.createElement('product-card');
        card.data = p;
        productsRoot.appendChild(card);
    });
}
