import { updateState, getState } from '../state/store.js';

export class CategoryFilter extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();

        // subskrypcja zmian stanu
        this.unsubscribe = window.appStoreSubscribe(() => {
            this.render();
        });
    }

    disconnectedCallback() {
        if (this.unsubscribe) this.unsubscribe();
    }

    render() {
        const categories = ['CPU', 'GPU', 'RAM', 'SSD', 'ALL'];
        const { selectedCategory } = getState();

        this.shadowRoot.innerHTML = `
      <style>
        .category-menu {
          display: flex;
          gap: 1rem;
        }

        button {
          background: transparent;
          border: none;
          padding: 0.4rem 0.8rem;
          font-size: 1rem;
          cursor: pointer;
          color: var(--text-dark);
          border-radius: 4px;
          transition: 0.2s;
        }

        button:hover {
          background: rgba(0, 0, 0, 0.08);
        }

        button.active {
          background: var(--accent);
          color: white;
        }
      </style>

      <div class="category-menu">
        ${categories
            .map(
                (cat) => `
          <button data-cat="${cat}" class="${selectedCategory === cat ? 'active' : ''}">
            ${cat}
          </button>
        `,
            )
            .join('')}
      </div>
    `;

        this.shadowRoot.querySelectorAll('button').forEach((btn) => {
            btn.addEventListener('click', () => {
                updateState((state) => {
                    state.selectedCategory = btn.dataset.cat;
                });
            });
        });
    }
}

customElements.define('category-filter', CategoryFilter);
