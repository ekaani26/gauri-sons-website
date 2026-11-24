const storefront = document.querySelector('#shop-products');
const categoryFilter = storefront.querySelector('#storefront-category');
const productSearch = storefront.querySelector('#storefront-search');
const cards = Array.from(storefront.querySelectorAll('[data-storefront-category]'));
const resultCount = storefront.querySelector('#storefront-count');

function filterProducts() {
  const searchTerm = productSearch.value.trim().toLowerCase();
  let visibleCount = 0;
  for (const card of cards) {
    const categoryMatches = !categoryFilter.value ||
      card.dataset.storefrontCategory === categoryFilter.value;
    const searchMatches = card.textContent.toLowerCase().includes(searchTerm);
    card.hidden = !(categoryMatches && searchMatches);
    visibleCount += Number(!card.hidden);
  }
  resultCount.textContent = visibleCount === 1 ? '1 product' : `${visibleCount} products`;
}

categoryFilter.addEventListener('change', filterProducts);
productSearch.addEventListener('input', filterProducts);
storefront.querySelector('.storefront-toolbar').hidden = false;
filterProducts();

const cartKey = 'gauri-quote-cart';
const cartProducts = new Map();
for (const card of cards) {
  const link = card.querySelector('h3 a');
  const id = link.getAttribute('href').slice('product-'.length, -'.html'.length);
  cartProducts.set(id, link.textContent.trim());

  const addButton = document.createElement('button');
  addButton.type = 'button';
  addButton.className = 'storefront-add';
  addButton.textContent = 'Add to cart';
  addButton.setAttribute('aria-label', `Add ${cartProducts.get(id)} to cart`);
  addButton.addEventListener('click', () => {
    const quantity = cart.get(id) ?? 0;
    if (quantity < 999) cart.set(id, quantity + 1);
    updateCart(`${cartProducts.get(id)} · quantity ${cart.get(id)} in cart`);
  });
  card.querySelector('.storefront-quote').before(addButton);
}

const cart = new Map();
try {
  for (const [id, quantity] of JSON.parse(localStorage.getItem(cartKey) || '[]')) {
    if (cartProducts.has(id) && Number.isInteger(quantity) && quantity > 0 && quantity <= 999) {
      cart.set(id, quantity);
    }
  }
} catch {
  cart.clear();
}

const cartPanel = document.createElement('details');
cartPanel.className = 'storefront-cart';
cartPanel.innerHTML = `
  <summary>Quote cart <span class="storefront-cart-count"></span></summary>
  <ul class="storefront-cart-items"></ul>
  <button type="button" class="storefront-add storefront-checkout">Prepare quote</button>
  <a class="storefront-send" hidden target="_blank" rel="noopener">Send quote request on WhatsApp</a>
  <p class="storefront-cart-status" role="status"></p>`;
storefront.querySelector('.storefront-heading').after(cartPanel);
const cartCount = cartPanel.querySelector('.storefront-cart-count');
const cartItems = cartPanel.querySelector('.storefront-cart-items');
const cartStatus = cartPanel.querySelector('.storefront-cart-status');
const checkout = cartPanel.querySelector('.storefront-checkout');
const sendQuote = cartPanel.querySelector('.storefront-send');
let revision = 0;

function updateCart(message = '') {
  revision++;
  try {
    localStorage.setItem(cartKey, JSON.stringify([...cart]));
  } catch {
    // The cart remains available in this tab when local storage is disabled.
  }
  renderCart();
  cartStatus.textContent = message;
  sendQuote.hidden = true;
}

function renderCart() {
  cartCount.textContent = `(${[...cart.values()].reduce((sum, quantity) => sum + quantity, 0)})`;
  cartItems.replaceChildren();
  checkout.disabled = cart.size === 0;
  for (const [id, quantity] of cart) {
    const row = document.createElement('li');
    const name = cartProducts.get(id);
    const label = document.createElement('label');
    label.textContent = name;
    const input = document.createElement('input');
    input.type = 'number';
    input.min = 1;
    input.max = 999;
    input.value = quantity;
    input.setAttribute('aria-label', `Quantity for ${name}`);
    input.addEventListener('change', () => {
      if (!input.checkValidity() || !input.value) {
        input.value = cart.get(id);
        return;
      }
      cart.set(id, input.valueAsNumber);
      updateCart(`Quantity updated for ${name}.`);
      cartItems.querySelector(`[data-product="${id}"] input`)?.focus();
    });
    const remove = document.createElement('button');
    remove.type = 'button';
    remove.textContent = 'Remove';
    remove.setAttribute('aria-label', `Remove ${name}`);
    remove.addEventListener('click', () => {
      cart.delete(id);
      updateCart(`Removed ${name}.`);
      cartPanel.querySelector('summary').focus();
    });
    row.dataset.product = id;
    label.append(input);
    row.append(label, remove);
    cartItems.append(row);
  }
}

checkout.addEventListener('click', async () => {
  const requestRevision = revision;
  checkout.disabled = true;
  sendQuote.hidden = true;
  cartStatus.textContent = 'Preparing your quote…';
  try {
    const response = await fetch('/api/quote', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items: [...cart].map(([id, quantity]) => ({ id, quantity })) })
    });
    if (!response.ok) throw new Error('Quote preparation failed');
    const { url } = await response.json();
    if (requestRevision !== revision) return;
    sendQuote.href = url;
    sendQuote.hidden = false;
    cartStatus.textContent = 'Your product list is ready to send on WhatsApp.';
  } catch {
    if (requestRevision === revision) cartStatus.textContent = 'Could not prepare the quote. Please try again.';
  } finally {
    if (requestRevision === revision) checkout.disabled = false;
  }
});
renderCart();
