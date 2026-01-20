import { addToCart } from '../state/store.js';

export class ProductCard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    set data(product) {
        this.render(product);
    }

    render(product) {
        this.shadowRoot.innerHTML = `
    <style>
      .product-card {
  background: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 340px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.08);
  transition: 0.2s ease;
}

.product-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}

.product-card img {
  width: 100%;
  height: 140px;
  object-fit: contain;
  margin-bottom: 0.8rem;
}

.product-card h3 {
  font-size: 1.05rem;
  margin: 0 0 0.4rem 0;
  font-weight: 600;
  color: #222;
}

.product-card p {
  margin: 0 0 0.8rem 0;
  font-size: 1rem;
  font-weight: 600;
  color: #333;
}

.product-card button {
  background: var(--accent);
  color: white;
  border: none;
  padding: 0.5rem;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: 0.2s ease;
}

.product-card button:hover {
  opacity: 0.9;
}
      }
    </style>

    <div class="product-card">
      <img src="${product.image}" alt="${product.title}">
      <h3>${product.title}</h3>
      <p>${product.price} zł</p>
      <button id="add-btn">Dodaj do koszyka</button>
    </div>
  `;

        this.shadowRoot
            .querySelector('#add-btn')
            .addEventListener('click', () => {
                addToCart(product);
            });
    }
}

customElements.define('product-card', ProductCard);
