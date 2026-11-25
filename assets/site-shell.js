const siteNav = document.querySelector('#main-nav');
const siteMenu = document.querySelector('.menu-trigger');
if (siteNav && siteMenu) {
  function setMenu(open) {
    siteNav.classList.toggle('is-open', open);
    siteMenu.setAttribute('aria-expanded', String(open));
  }
  document.body.classList.add('js-nav');
  siteMenu.addEventListener('click', () => setMenu(!siteNav.classList.contains('is-open')));
  siteNav.addEventListener('click', event => {
    if (event.target.closest('a')) setMenu(false);
  });
  siteNav.closest('header').addEventListener('keydown', event => {
    if (event.key === 'Escape' && siteNav.classList.contains('is-open')) {
      setMenu(false);
      siteMenu.focus();
    }
  });
}

const quoteLink = document.querySelector('a.cart-trigger');
if (quoteLink) {
  try {
    const items = JSON.parse(localStorage.getItem('gauri-quote-cart') || '[]');
    const count = items.reduce((sum, entry) => {
      const quantity = entry?.[1];
      return Number.isInteger(quantity) && quantity > 0 && quantity <= 999 ? sum + quantity : sum;
    }, 0);
    quoteLink.querySelector('.storefront-cart-count').textContent = count;
  } catch {
    // The quote-list link remains available without local storage.
  }
}
