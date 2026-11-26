window.gauriProducts = Object.freeze({"disposable-pasteur-transfer-pipettes":"Pasteur Transfer Pipettes","sterile-cell-spreaders":"Sterile Cell Spreaders","laboratory-sealing-film":"Laboratory Sealing Film","interlocking-conical-tube-racks":"Click-Together Conical Tube Rack","universal-centrifuge-tube-rack":"Universal Centrifuge Tube Rack","foldable-polypropylene-tube-rack":"Foldable Tube Rack","rpp-microcentrifuge-tube-rack":"RPP Microcentrifuge Tube Rack","polycarbonate-microcentrifuge-tube-rack":"Polycarbonate Microcentrifuge Tube Rack","polypropylene-centrifuge-tube-box":"Centrifuge Tube Box","external-thread-polypropylene-cryovials":"External-Thread Cryovials","single-hand-cryovial-holder-rack":"Single-Hand Cryovial Holder Rack","polycarbonate-cryo-storage-box":"Polycarbonate Cryo Box","100-position-polycarbonate-cryo-box":"100-Position Polycarbonate Cryo Box","polypropylene-cryo-cube-box":"Polypropylene Cryo Cube Box","euro-style-ldpe-dropping-bottles":"Euro-Style Dropping Bottles","ldpe-wash-bottles":"Wash Bottles","one-piece-ldpe-wash-bottles":"Comet Wash Bottles","narrow-mouth-polypropylene-bottles":"Narrow-Mouth PP Bottles","narrow-mouth-ldpe-bottles":"Narrow-Mouth LDPE Bottles","narrow-mouth-hdpe-bottles":"Narrow-Mouth HDPE Bottles","plastic-plain-and-vacuum-desiccators":"Plain & Vacuum Desiccators","laboratory-beakers":"Laboratory Beakers","conical-flasks":"Conical Flasks","volumetric-flasks":"Volumetric Flasks","measuring-cylinders":"Measuring Cylinders","burettes":"Burettes","glass-pipettes":"Glass Pipettes","glass-droppers":"Glass Droppers","petri-dishes":"Petri Dishes","watch-glasses":"Watch Glasses","reagent-bottles":"Reagent Bottles","desiccators":"Desiccators","test-tubes":"Test Tubes","boiling-tubes":"Boiling Tubes","glass-tubing":"Glass Tubing","glass-stirring-rods":"Glass Stirring Rods","laboratory-weighing-balances":"Laboratory Weighing Balances","benchtop-centrifuges":"Benchtop Centrifuges","laboratory-ovens":"Laboratory Ovens","laboratory-water-baths":"Laboratory Water Baths","ph-meters":"pH Meters","laboratory-hot-plates":"Laboratory Hot Plates","magnetic-stirrers":"Magnetic Stirrers","heating-mantles":"Heating Mantles","compound-microscopes":"Compound Microscopes","microscope-objectives":"Microscope Objectives","microscope-slides":"Microscope Slides","cover-slips":"Cover Slips","laboratory-funnels":"Laboratory Funnels","filter-papers":"Filter Papers","filtration-sets":"Filtration Sets","sample-vials":"Sample Vials","wash-bottles":"Wash Bottles","pipette-tips":"Pipette Tips","sample-containers":"Sample Containers","laboratory-labels":"Laboratory Labels","test-tube-racks":"Test Tube Racks","laboratory-support-stands":"Laboratory Support Stands","laboratory-clamps":"Laboratory Clamps","laboratory-safety-goggles":"Laboratory Safety Goggles","laboratory-gloves":"Laboratory Gloves","laboratory-coats":"Laboratory Coats","laboratory-face-masks":"Laboratory Face Masks","polypropylene-freezing-tubes":"Polypropylene Freezing Tubes","polypropylene-storage-vials":"Polypropylene Storage Vials"});
const siteNav = document.querySelector('#main-nav');
const siteMenu = document.querySelector('.menu-trigger');
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

(() => {
  const makeIcon = name => `<svg class="site-icon" aria-hidden="true" focusable="false"><use href="/img/contact-icons.svg#${name}"></use></svg>`;
  const header = document.querySelector('.site-header');
  if (!header || !siteNav || !siteMenu) return;
  const utility = header.querySelector('.utility .wrap');
  const service = utility.querySelector('span');
  service.className = 'utility-info';
  service.insertAdjacentHTML('afterbegin', makeIcon('box'));
  service.insertAdjacentHTML('afterend', `<span class="utility-info">${makeIcon('chat')} Product and quotation support</span><span class="utility-info">${makeIcon('list')} Catalogue and size guidance</span>`);
  const searchForm = header.querySelector('.site-search');
  const searchField = searchForm.querySelector('input');
  searchForm.id = 'site-search';
  searchField.placeholder = 'Search equipment, glassware, consumables…';
  siteNav.insertAdjacentHTML('beforeend', `<a class="header-whatsapp" href="https://wa.me/918826750844">${makeIcon('whatsapp')} WhatsApp</a>`);
  utility.insertAdjacentHTML('afterbegin', '<span class="mobile-announcement">Trusted Laboratory Equipment Supplier in India</span>');
  const suggestions = document.createElement('ul');
  suggestions.className = 'search-suggestions';
  suggestions.setAttribute('aria-label', 'Product suggestions');
  suggestions.hidden = true;
  searchForm.after(suggestions);
  function showSuggestions() {
    const term = searchField.value.toLowerCase().trim();
    suggestions.replaceChildren();
    if (term.length >= 2 && searchForm.classList.contains('search-open')) {
      for (const [slug, name] of Object.entries(window.gauriProducts).filter(([,name]) => name.toLowerCase().includes(term)).slice(0,5)) {
        const row = document.createElement('li');
        const link = document.createElement('a');
        link.href = `/product-${slug}.html`;
        link.textContent = name;
        row.append(link);
        suggestions.append(row);
      }
    }
    suggestions.hidden = !suggestions.children.length;
  }
  searchField.addEventListener('input', showSuggestions);
  for (const nav of document.querySelectorAll('.site-footer .footer-grid nav')) {
    const title = nav.querySelector('h2');
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'mobile-footer-toggle';
    button.setAttribute('aria-expanded','false');
    button.textContent = title.textContent;
    const list = nav.querySelector('ul');
    list.id = 'footer-links-' + title.textContent.trim().toLowerCase().replace(/[^a-z0-9]+/g,'-');
    button.setAttribute('aria-controls',list.id);
    title.after(button);
    button.addEventListener('click', () => button.setAttribute('aria-expanded',String(button.getAttribute('aria-expanded') === 'false')));
  }
  const actions = header.querySelector('.header-actions');
  actions.insertAdjacentHTML('afterbegin', `<button class="mobile-search-trigger cart-trigger" type="button" aria-label="Open product search" aria-controls="site-search" aria-expanded="false">${makeIcon('search')}</button><a class="header-quote-link cart-trigger" href="/#site-visit">${makeIcon('quote')} Request a Quote</a>`);
  const searchTrigger = actions.querySelector('.mobile-search-trigger');
  const toggleSearch = open => {
    searchForm.classList.toggle('search-open', open);
    searchTrigger.setAttribute('aria-expanded', String(open));
    if (open) searchField.focus();
    showSuggestions();
  };
  searchTrigger.addEventListener('click', () => toggleSearch(!searchForm.classList.contains('search-open')));
  header.addEventListener('keydown', e => {
    if (e.key === 'Escape' && searchForm.classList.contains('search-open')) {
      toggleSearch(false);
      searchTrigger.focus();
    }
  });
  document.body.insertAdjacentHTML('beforeend', `<div class="mobile-actions" aria-label="Quick contact"><a class="button secondary" href="tel:+918826750844">${makeIcon('phone')} Call Us</a><a class="button" href="/#site-visit">${makeIcon('quote')} Get Quote</a><a class="button whatsapp" href="https://wa.me/918826750844">${makeIcon('whatsapp')} WhatsApp</a></div><p class="sr-only" id="catalogue-feedback" role="status"></p>`);

  siteMenu.innerHTML = makeIcon('menu');
  siteMenu.setAttribute('aria-controls', 'mobile-drawer');
  siteMenu.setAttribute('aria-haspopup', 'dialog');
  siteMenu.setAttribute('aria-label', 'Open navigation');
  header.querySelector('.site-search button').innerHTML = makeIcon('search');
  const quoteControl = header.querySelector('.cart-trigger:not(.mobile-search-trigger):not(.header-quote-link)');
  quoteControl.querySelector('.gauri-icon')?.remove();
  quoteControl.insertAdjacentHTML('afterbegin', makeIcon('quote'));
  utility.querySelector('a[href^="tel:"]').insertAdjacentHTML('afterbegin', makeIcon('phone'));
  for (const link of document.querySelectorAll('.quote-copy a[href*="wa.me"], .detail-actions a[href*="wa.me"]')) {
    link.insertAdjacentHTML('afterbegin', makeIcon('whatsapp') + ' ');
  }
  const drawer = document.createElement('dialog');
  drawer.id = 'mobile-drawer';
  drawer.setAttribute('aria-label', 'Mobile navigation');
  drawer.innerHTML = `<div class="drawer-heading"><a href="/" aria-label="Gauri & Sons homepage"><img src="/img/gauri-wordmark.png" width="229" height="57" alt="Gauri &amp; Sons Group"></a><button type="button" aria-label="Close navigation">${makeIcon('close')}</button></div><nav aria-label="Mobile menu"></nav><div class="drawer-contact"><a href="tel:+918826750844">${makeIcon('phone')} Call Gauri &amp; Sons</a></div>`;
  const menuLinks = drawer.querySelector('nav');
  for (const link of siteNav.querySelectorAll('a')) menuLinks.append(link.cloneNode(true));
  const categories = document.createElement('details');
  categories.className = 'drawer-categories';
  categories.innerHTML = '<summary>Product categories</summary>';
  for (const link of document.querySelectorAll('.site-footer nav[aria-label="Footer product categories"] a')) categories.append(link.cloneNode(true));
  menuLinks.append(categories);
  document.body.append(drawer);
  document.body.classList.add('js-nav');
  const close = drawer.querySelector('button');
  siteMenu.addEventListener('click', () => {
    toggleSearch(false);
    drawer.showModal();
    siteMenu.setAttribute('aria-expanded', 'true');
    close.focus();
  });
  function closeDrawer() {
    drawer.close();
    siteMenu.setAttribute('aria-expanded', 'false');
  }
  close.addEventListener('click', closeDrawer);
  menuLinks.addEventListener('click', event => {
    if (!event.target.closest('a')) return;
    closeDrawer();
  });
  drawer.addEventListener('click', event => {
    if (event.target !== drawer) return;
    const bounds = drawer.getBoundingClientRect();
    if (event.clientX > bounds.right) closeDrawer();
  });
  drawer.addEventListener('close', () => siteMenu.setAttribute('aria-expanded', 'false'));
  matchMedia('(max-width: 760px)').addEventListener('change', event => {
    if (!event.matches && drawer.open) closeDrawer();
    toggleSearch(false);
  });

  const quoteCount = header.querySelector('.storefront-cart-count');
  const feedback = document.querySelector('#catalogue-feedback');
  function addProduct(id, amount) {
    if (!Object.hasOwn(window.gauriProducts, id)) return;
    try {
      const saved = new Map(JSON.parse(localStorage.getItem('gauri-quote-cart') || '[]'));
      saved.set(id, Math.min(999, (saved.get(id) || 0) + amount));
      localStorage.setItem('gauri-quote-cart', JSON.stringify([...saved]));
      quoteCount.textContent = [...saved.values()].reduce((sum, qty) => sum + qty, 0);
      feedback.textContent = `${window.gauriProducts[id]} added to your quote list.`;
      window.dataLayer?.push({event:'add_to_quote', product_id:id, quantity:amount});
    } catch {
      location.href = `/?product=${encodeURIComponent(window.gauriProducts[id])}#site-visit`;
    }
  }
  for (const card of document.querySelectorAll('.catalog-product')) {
    if (!Object.hasOwn(window.gauriProducts, card.id)) continue;
    const quote = card.querySelector('a.btn-dark');
    if (!quote) continue;
    const button = document.createElement('button');
    button.type = 'button';
    button.className = quote.className;
    button.textContent = 'Add to Quote';
    button.setAttribute('aria-label', `Add ${window.gauriProducts[card.id]} to Quote`);
    button.addEventListener('click', () => {
      addProduct(card.id, 1);
      button.textContent = 'Added · Add another';
    });
    quote.replaceWith(button);
  }
  const productMatch = location.pathname.match(/\/product-([^/]+)\.html$/);
  const detail = document.querySelector('.product-detail .subpage-hero .btn-dark');
  if (productMatch && detail && Object.hasOwn(window.gauriProducts, productMatch[1])) {
    const id = productMatch[1];
    const form = document.createElement('form');
    form.className = 'detail-actions';
    form.innerHTML = '<label>Quantity<input name="quantity" type="number" min="1" max="999" value="1" required></label><button class="button" type="submit">Add to Quote</button>';
    const whatsapp = document.createElement('a');
    whatsapp.className = 'button secondary';
    whatsapp.href = `https://wa.me/918826750844?text=${encodeURIComponent('Please share a quotation for ' + window.gauriProducts[id])}`;
    whatsapp.innerHTML = makeIcon('whatsapp') + ' Ask on WhatsApp';
    form.append(whatsapp);
    form.addEventListener('submit', e => {
      e.preventDefault();
      addProduct(id, form.elements.quantity.valueAsNumber);
      form.querySelector('button').textContent = 'Added to Quote';
    });
    detail.replaceWith(form);
  }
  window.dataLayer = window.dataLayer || [];
  document.addEventListener('click', e => {
    const link = e.target.closest('a');
    if (!link) return;
    const target = link.getAttribute('href') || '';
    const event = target.startsWith('tel:') ? 'phone_click' : target.startsWith('https://wa.me/') ? 'whatsapp_click' : link.hasAttribute('download') ? 'catalogue_download' : null;
    if (event) window.dataLayer.push({event});
  });
  if (productMatch) window.dataLayer.push({event:'view_item', product_id:productMatch[1]});
  searchForm.addEventListener('submit', () => window.dataLayer.push({event:'catalogue_search'}));
})();
