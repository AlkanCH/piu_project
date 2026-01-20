import { subscribe, getState, removeFromCart } from '../state/store.js';

export class CartView extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        subscribe(() => this.render());
    }

    connectedCallback() {
        this.render();
    }

    render() {
        const { cart } = getState();
        const total = cart.reduce((sum, item) => sum + item.price, 0);

        this.shadowRoot.innerHTML = `
      <style>
        .cart-section {
          background: white;
          border: 1px solid #ddd;
          border-radius: 8px;
          padding: 1rem;
          display: flex;
          flex-direction: column;
          gap: 0.8rem;
          box-shadow: 0 1px 3px rgba(0,0,0,0.08);
        }

        h2 {
          margin: 0 0 0.5rem 0;
          font-size: 1.2rem;
          font-weight: 600;
        }

        .item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.4rem 0;
          border-bottom: 1px solid #eee;
        }

        .item:last-child {
          border-bottom: none;
        }

        button {
          background: #d93025;
          color: white;
          border: none;
          padding: .3rem .6rem;
          border-radius: 4px;
          cursor: pointer;
          font-size: 0.85rem;
        }

        button:hover {
          background: #b1271b;
        }

        .total {
          font-weight: 600;
          text-align: right;
          margin-top: 0.5rem;
          font-size: 1rem;
        }
      </style>

      <div class="cart-section">
        <h2>Koszyk</h2>

        ${cart.length === 0 ? '<p>Koszyk jest pusty.</p>' : ''}

        ${cart
            .map(
                (p) => `
          <div class="item">
            <span>${p.title}</span>
            <button data-id="${p.id}">Usuń</button>
          </div>
        `,
            )
            .join('')}

        <p class="total">Razem: ${total} zł</p>
      </div>
    `;

        this.shadowRoot.querySelectorAll('button').forEach((btn) => {
            btn.addEventListener('click', () => {
                const id = Number(btn.dataset.id);
                removeFromCart(id);
            });
        });
    }
}

customElements.define('cart-view', CartView);
