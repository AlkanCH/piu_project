import { toggleBrand, getState } from '../state/store.js';

export class BrandFilter extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
    }

    render() {
        const { selectedBrands } = getState();

        const brands = [
            'Intel',
            'AMD',
            'NVIDIA',
            'Corsair',
            'Kingston',
            'Samsung',
            'Crucial',
        ];

        this.shadowRoot.innerHTML = `
      <style>
        .brand-section {
          background: white;
          border: 1px solid #ddd;
          border-radius: 8px;
          padding: 1rem;
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
          box-shadow: 0 1px 3px rgba(0,0,0,0.08);
        }

        h2 {
          margin: 0 0 0.5rem 0;
          font-size: 1.2rem;
          font-weight: 600;
        }

        label {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          cursor: pointer;
          padding: 0.2rem 0;
        }

        input[type="checkbox"] {
          transform: scale(1.2);
        }
      </style>

      <div class="brand-section">
        <h2>Producenci</h2>

        ${brands
            .map(
                (brand) => `
          <label>
            <input type="checkbox" value="${brand}" ${selectedBrands.includes(brand) ? 'checked' : ''}>
            ${brand}
          </label>
        `,
            )
            .join('')}
      </div>
    `;

        this.shadowRoot.querySelectorAll('input').forEach((checkbox) => {
            checkbox.addEventListener('change', () => {
                toggleBrand(checkbox.value);
            });
        });
    }
}

customElements.define('brand-filter', BrandFilter);
