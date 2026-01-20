import { setSort, getState } from '../state/store.js';

export class SortPanel extends HTMLElement {
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
        const { sortBy } = getState();

        this.shadowRoot.innerHTML = `
      <style>
        .sort-panel {
          background: #eee;
          padding: 0.5rem 0.8rem;
          border-radius: 6px;
          display: flex;
          gap: 0.5rem;
        }

        button {
          background: white;
          border: 1px solid var(--border);
          padding: 0.3rem 0.6rem;
          border-radius: 4px;
          cursor: pointer;
          transition: 0.2s;
        }

        button:hover {
          background: rgba(0,0,0,0.05);
        }

        button.active {
          background: var(--accent);
          color: white;
          border-color: var(--accent);
        }
      </style>

      <div class="sort-panel">
        <button data-sort="NONE" class="${sortBy === 'NONE' ? 'active' : ''}">Domyślnie</button>
        <button data-sort="PRICE_ASC" class="${sortBy === 'PRICE_ASC' ? 'active' : ''}">Cena ↑</button>
        <button data-sort="PRICE_DESC" class="${sortBy === 'PRICE_DESC' ? 'active' : ''}">Cena ↓</button>
      </div>
    `;

        this.shadowRoot.querySelectorAll('button').forEach((btn) => {
            btn.addEventListener('click', () => {
                setSort(btn.dataset.sort);
            });
        });
    }
}

customElements.define('sort-panel', SortPanel);
