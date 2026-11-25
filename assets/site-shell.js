window.gauriProducts = Object.freeze({"disposable-pasteur-transfer-pipettes":"Pasteur Transfer Pipettes","sterile-cell-spreaders":"Sterile Cell Spreaders","laboratory-sealing-film":"Laboratory Sealing Film","interlocking-conical-tube-racks":"Click-Together Conical Tube Rack","universal-centrifuge-tube-rack":"Universal Centrifuge Tube Rack","foldable-polypropylene-tube-rack":"Foldable Tube Rack","rpp-microcentrifuge-tube-rack":"RPP Microcentrifuge Tube Rack","polycarbonate-microcentrifuge-tube-rack":"Polycarbonate Microcentrifuge Tube Rack","polypropylene-centrifuge-tube-box":"Centrifuge Tube Box","external-thread-polypropylene-cryovials":"External-Thread Cryovials","single-hand-cryovial-holder-rack":"Single-Hand Cryovial Holder Rack","polycarbonate-cryo-storage-box":"Polycarbonate Cryo Box","100-position-polycarbonate-cryo-box":"100-Position Polycarbonate Cryo Box","polypropylene-cryo-cube-box":"Polypropylene Cryo Cube Box","euro-style-ldpe-dropping-bottles":"Euro-Style Dropping Bottles","ldpe-wash-bottles":"Wash Bottles","one-piece-ldpe-wash-bottles":"Comet Wash Bottles","narrow-mouth-polypropylene-bottles":"Narrow-Mouth PP Bottles","narrow-mouth-ldpe-bottles":"Narrow-Mouth LDPE Bottles","narrow-mouth-hdpe-bottles":"Narrow-Mouth HDPE Bottles","plastic-plain-and-vacuum-desiccators":"Plain & Vacuum Desiccators","laboratory-beakers":"Laboratory Beakers","conical-flasks":"Conical Flasks","volumetric-flasks":"Volumetric Flasks","measuring-cylinders":"Measuring Cylinders","burettes":"Burettes","glass-pipettes":"Glass Pipettes","glass-droppers":"Glass Droppers","petri-dishes":"Petri Dishes","watch-glasses":"Watch Glasses","reagent-bottles":"Reagent Bottles","desiccators":"Desiccators","test-tubes":"Test Tubes","boiling-tubes":"Boiling Tubes","glass-tubing":"Glass Tubing","glass-stirring-rods":"Glass Stirring Rods","laboratory-weighing-balances":"Laboratory Weighing Balances","benchtop-centrifuges":"Benchtop Centrifuges","laboratory-ovens":"Laboratory Ovens","laboratory-water-baths":"Laboratory Water Baths","ph-meters":"pH Meters","laboratory-hot-plates":"Laboratory Hot Plates","magnetic-stirrers":"Magnetic Stirrers","heating-mantles":"Heating Mantles","compound-microscopes":"Compound Microscopes","microscope-objectives":"Microscope Objectives","microscope-slides":"Microscope Slides","cover-slips":"Cover Slips","laboratory-funnels":"Laboratory Funnels","filter-papers":"Filter Papers","filtration-sets":"Filtration Sets","sample-vials":"Sample Vials","wash-bottles":"Wash Bottles","pipette-tips":"Pipette Tips","sample-containers":"Sample Containers","laboratory-labels":"Laboratory Labels","test-tube-racks":"Test Tube Racks","laboratory-support-stands":"Laboratory Support Stands","laboratory-clamps":"Laboratory Clamps","laboratory-safety-goggles":"Laboratory Safety Goggles","laboratory-gloves":"Laboratory Gloves","laboratory-coats":"Laboratory Coats","laboratory-face-masks":"Laboratory Face Masks","polypropylene-freezing-tubes":"Polypropylene Freezing Tubes","polypropylene-storage-vials":"Polypropylene Storage Vials"});
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

(() => {
  const makeIcon = name => `<span class="gauri-icon gauri-icon-${name}" aria-hidden="true"></span>`;
  const header = document.querySelector('.site-header');
  const utility = header.querySelector('.utility .wrap');
  const service = utility.querySelector('span');
  service.className = 'utility-info';
  service.insertAdjacentHTML('afterbegin', makeIcon('box'));
  service.insertAdjacentHTML('afterend', `<span class="utility-info">${makeIcon('chat')} Product and quotation support</span><span class="utility-info">${makeIcon('list')} Catalogue and size guidance</span>`);
  const searchForm = header.querySelector('.site-search');
  const searchField = searchForm.querySelector('input');
  searchForm.id = 'site-search';
  searchField.placeholder = 'Search equipment, glassware, consumables…';
  siteNav.insertAdjacentHTML('beforeend', `<a class="header-whatsapp" href="https://wa.me/918826750844">${makeIcon('chat')} WhatsApp</a>`);
  const actions = header.querySelector('.header-actions');
  actions.insertAdjacentHTML('afterbegin', `<button class="mobile-search-trigger cart-trigger" type="button" aria-label="Open product search" aria-controls="site-search" aria-expanded="false">${makeIcon('search')}</button><a class="header-quote-link cart-trigger" href="index.html#site-visit">Request a Quote</a>`);
  const searchTrigger = actions.querySelector('.mobile-search-trigger');
  const toggleSearch = open => {
    searchForm.classList.toggle('search-open', open);
    searchTrigger.setAttribute('aria-expanded', String(open));
    if (open) searchField.focus();
  };
  searchTrigger.addEventListener('click', () => toggleSearch(!searchForm.classList.contains('search-open')));
  header.addEventListener('keydown', e => {
    if (e.key === 'Escape' && searchForm.classList.contains('search-open')) {
      toggleSearch(false);
      searchTrigger.focus();
    }
  });
  document.querySelector('.site-footer .footer-grid').insertAdjacentHTML('beforeend', '<div><strong>Product Categories</strong><a href="products.html#glassware">Glassware</a><a href="products.html#equipment">Lab Equipment</a><a href="products.html#optics">Microscopy</a><a href="products.html#consumables">Consumables</a></div>');
  document.body.insertAdjacentHTML('beforeend', `<div class="mobile-actions" aria-label="Quick contact"><a class="button secondary" href="tel:+918826750844">${makeIcon('phone')} Call</a><a class="button" href="index.html#site-visit">${makeIcon('list')} Quote</a><a class="button whatsapp" href="https://wa.me/918826750844">${makeIcon('chat')} WhatsApp</a></div><p class="sr-only" id="catalogue-feedback" role="status"></p>`);

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
      location.href = `index.html?product=${encodeURIComponent(window.gauriProducts[id])}#site-visit`;
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
    whatsapp.textContent = 'Ask on WhatsApp';
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
