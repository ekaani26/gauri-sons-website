const storefront = document.querySelector('#shop-products');
const filters = storefront.querySelector('.storefront-toolbar');
const material = storefront.querySelector('#storefront-material');
const capacity = storefront.querySelector('#storefront-capacity');
const search = storefront.querySelector('#storefront-search');
const cards = [...storefront.querySelectorAll('.storefront-card')];
const resultCount = storefront.querySelector('#storefront-count');
const loadMore = storefront.querySelector('#load-products');
const pageSize = 12;
let limit = pageSize;

function filterProducts() {
  const term = search.value.trim().toLowerCase();
  const matches = cards.filter(card =>
    (!material.value || card.dataset.material === material.value) &&
    (!capacity.value || card.dataset.capacity.split(' ').includes(capacity.value)) &&
    (!term || card.querySelector('.storefront-details').textContent.toLowerCase().includes(term))
  );
  const visible = new Set(matches.slice(0, limit));
  for (const card of cards) {
    card.hidden = !visible.has(card);
    card.classList.toggle('last-single', visible.size % 2 === 1 && card === matches[visible.size - 1]);
  }
  resultCount.textContent = matches.length
    ? `Showing ${visible.size} of ${matches.length} products`
    : 'No products match these filters.';
  loadMore.parentElement.hidden = visible.size === matches.length;
}

function resetPage() {
  limit = pageSize;
  filterProducts();
}
filters.addEventListener('input', resetPage);
filters.addEventListener('submit', event => event.preventDefault());
filters.addEventListener('reset', event => {
  event.preventDefault();
  search.value = '';
  material.value = '';
  capacity.value = '';
  resetPage();
});
loadMore.addEventListener('click', () => {
  const previouslyHidden = cards.filter(card => card.hidden);
  limit += pageSize;
  filterProducts();
  previouslyHidden.find(card => !card.hidden)?.querySelector('h3 a').focus();
});
filters.hidden = false;
filterProducts();

const cartKey = 'gauri-quote-cart';
const cartProducts = new Map(Object.entries(window.gauriProducts ?? {}));
for (const card of cards) {
  const link = card.querySelector('h3 a');
  const id = link.getAttribute('href').slice('product-'.length, -'.html'.length);
  cartProducts.set(id, link.textContent.trim());

  const addButton = document.createElement('button');
  addButton.type = 'button';
  addButton.className = 'button storefront-add';
  addButton.textContent = 'Add to quote';
  addButton.setAttribute('aria-label', `Add ${cartProducts.get(id)} to quote list`);
  addButton.addEventListener('click', () => {
    const quantity = cart.get(id) ?? 0;
    if (quantity < 999) cart.set(id, quantity + 1);
    updateCart(`${cartProducts.get(id)} · quantity ${cart.get(id)} in your quote list`);
    window.dataLayer?.push({event:'add_to_quote',product_id:id,quantity:1});
  });
  card.querySelector('.storefront-details').append(addButton);
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

const cartPanel = document.querySelector('#quote-cart');
const cartTrigger = document.querySelector('button[aria-controls=quote-cart]');
const cartCount = cartTrigger.querySelector('.storefront-cart-count');
const announcement = document.querySelector('#quote-announcement');
const cartEmpty = cartPanel.querySelector('.cart-empty');
cartTrigger.addEventListener('click', () => {
  cartPanel.showModal();
  window.dataLayer?.push({event:'view_quote'});
});
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
  cartStatus.textContent = cartPanel.open ? message : '';
  announcement.textContent = cartPanel.open ? '' : message;
  sendQuote.hidden = true;
}

function renderCart() {
  cartCount.textContent = [...cart.values()].reduce((sum, quantity) => sum + quantity, 0);
  cartEmpty.hidden = cart.size > 0;
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
    remove.className = 'text-button';
    remove.textContent = 'Remove';
    remove.setAttribute('aria-label', `Remove ${name}`);
    remove.addEventListener('click', () => {
      cart.delete(id);
      updateCart(`Removed ${name}.`);
      cartPanel.querySelector('.dialog-head button').focus();
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

if (new URLSearchParams(location.search).get('quote') === 'list') cartPanel.showModal();

const form = document.querySelector('#quote-form');
const formStatus = form.querySelector('.form-status');
const initialProduct = new URLSearchParams(location.search).get('product');
if (initialProduct) form.elements.Product.value = initialProduct.slice(0, 1000).trim();

form.addEventListener('submit', async event => {
  event.preventDefault();
  const submit = form.querySelector('button[type="submit"]');
  if (submit.disabled) return;
  const values = Object.fromEntries(new FormData(form));
  if (!['Phone', 'Name', 'Organisation', 'Product'].every(field => values[field].trim())) {
    formStatus.textContent = 'Enter your phone, name, organisation and product requirements.';
    return;
  }
  window.dataLayer?.push({event:'quote_form_submit'});
  submit.disabled = true;
  formStatus.textContent = 'Sending your request…';
  try {
    const response = await fetch('https://formsubmit.co/ajax/gouriandsonsllp@gmail.com', {
      method: 'POST',
      headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...values, _subject: 'Gauri & Sons website quote request', _template: 'table' })
    });
    const result = await response.json();
    if (!response.ok || String(result.success) !== 'true') throw new Error('Submission not confirmed');
    form.reset();
    window.dataLayer?.push({event:'quote_form_success'});
    formStatus.textContent = 'Thank you. Your quote request was sent.';
  } catch {
    formStatus.textContent = 'Your request could not be sent. Please call or contact us on WhatsApp.';
  } finally {
    submit.disabled = false;
  }
});

const sizeGuide = document.querySelector('#size-guides');
function openLinkedGuide() {
  if (location.hash === '#size-guides') sizeGuide.open = true;
}
window.addEventListener('hashchange', openLinkedGuide);
document.querySelector('#main-nav a[href="#size-guides"]').addEventListener('click', () => { sizeGuide.open = true; });
openLinkedGuide();

cartPanel.querySelector('.quote-with-list').addEventListener('click', () => {
  if (!cart.size) return;
  form.elements.Product.value = [...cart].map(([id, quantity]) => `${cartProducts.get(id)} × ${quantity}`).join('\n').slice(0,1000);
  form.elements.Quantity.value = [...cart.values()].reduce((sum, quantity) => sum + quantity, 0);
  cartPanel.close();
  form.elements.Phone.focus();
});

(() => {
  const carousel = document.querySelector('.hero-carousel');
  const slides = [...carousel.querySelectorAll('.hero-slide')];
  const controls = carousel.querySelector('.hero-controls');
  const selectors = [...controls.querySelectorAll('.hero-select button')];
  const status = carousel.querySelector('.hero-status');
  let current = 0;
  let touchStart;

  function show(index) {
    const next = (index + slides.length) % slides.length;
    if (current === next) return;
    slides[current].inert = true;
    slides[current].classList.remove('is-active');
    selectors[current].removeAttribute('aria-current');
    current = next;
    slides[current].inert = false;
    slides[current].classList.add('is-active');
    selectors[current].setAttribute('aria-current', 'true');
    status.textContent = `Banner ${current + 1} of ${slides.length}: ${slides[current].getAttribute('aria-label')}`;
  }

  controls.hidden = false;
  selectors.forEach((button, index) => button.addEventListener('click', () => show(index)));
  controls.querySelectorAll('[data-hero-step]').forEach(button => {
    button.addEventListener('click', () => show(current + Number(button.dataset.heroStep)));
  });
  controls.addEventListener('keydown', event => {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
    event.preventDefault();
    show(current + (event.key === 'ArrowLeft' ? -1 : 1));
    selectors[current].focus();
  });

  const viewport = carousel.querySelector('.hero-slides');
  viewport.addEventListener('touchstart', event => {
    touchStart = event.touches.length === 1 ? event.touches[0] : undefined;
  }, { passive: true });
  viewport.addEventListener('touchend', event => {
    if (!touchStart) return;
    const end = event.changedTouches[0];
    const dx = end.clientX - touchStart.clientX;
    const dy = end.clientY - touchStart.clientY;
    touchStart = undefined;
    if (Math.abs(dx) > 55 && Math.abs(dx) > Math.abs(dy) * 1.5) show(current + (dx < 0 ? 1 : -1));
  }, { passive: true });
})();
