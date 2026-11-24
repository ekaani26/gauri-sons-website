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
