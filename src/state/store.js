const state = {
    cart: [],
    selectedCategory: 'ALL',
    sortBy: 'NONE',
    selectedBrands: [],
};

const listeners = [];

// --- Podstawowe funkcje stanu ---

export function getState() {
    return state;
}

export function updateState(updater) {
    updater(state);
    listeners.forEach((l) => l(state));
}

// --- Subskrypcja zmian stanu ---

export function subscribe(callback) {
    listeners.push(callback);

    // zwracamy funkcję do odsubskrybowania
    return () => {
        const index = listeners.indexOf(callback);
        if (index !== -1) listeners.splice(index, 1);
    };
}

// udostępniamy globalnie dla Web Components
window.appStoreSubscribe = subscribe;

// --- Funkcje koszyka ---

export function addToCart(product) {
    updateState((state) => {
        state.cart.push(product);
    });
}

export function removeFromCart(id) {
    updateState((state) => {
        const index = state.cart.findIndex((p) => p.id === id);
        if (index !== -1) {
            state.cart.splice(index, 1);
        }
    });
}

// --- Sortowanie ---

export function setSort(sortType) {
    updateState((state) => {
        state.sortBy = sortType;
    });
}

// --- Filtry producentów ---

export function toggleBrand(brand) {
    updateState((state) => {
        if (state.selectedBrands.includes(brand)) {
            state.selectedBrands = state.selectedBrands.filter(
                (b) => b !== brand,
            );
        } else {
            state.selectedBrands.push(brand);
        }
    });
}
