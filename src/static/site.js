const header = document.querySelector('[data-header]');
const menuToggle = document.querySelector('[data-menu-toggle]');
const menu = document.getElementById('site-nav');

function setMenu(open) {
  menu.toggleAttribute('data-open', open);
  menuToggle.setAttribute('aria-expanded', String(open));
}

if (header && menuToggle && menu) {
  header.dataset.menuReady = '';
  menuToggle.hidden = false;
  menuToggle.addEventListener('click', () => setMenu(menuToggle.getAttribute('aria-expanded') === 'false'));
  menu.addEventListener('click', (event) => {
    if (event.target.closest('a')) setMenu(false);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && menu.hasAttribute('data-open')) {
      setMenu(false);
      menuToggle.focus();
    }
  });

  document.addEventListener('click', (event) => {
    if (menu.hasAttribute('data-open') && !header.contains(event.target)) setMenu(false);
  });

  matchMedia('(min-width: 64rem)').addEventListener('change', () => setMenu(false));
}

const productFigure = document.querySelector('[data-source-image]');
const directory = document.querySelector('.panel-browser details');
if (directory) {
  document.addEventListener('click', event => {
    if (!directory.contains(event.target)) directory.open = false;
  });
  directory.addEventListener('keydown', event => {
    if (event.key !== 'Escape' || !directory.open) return;
    directory.open = false;
    directory.querySelector('summary').focus();
  });
}
if (productFigure) {
  const viewer = document.querySelector('.image-view');
  const open = productFigure.querySelector('[data-image-open]');
  if (typeof viewer.showModal === 'function') {
    open.hidden = false;
    open.addEventListener('click', () => {
      const original = productFigure.querySelector('div img');
      const enlarged = viewer.querySelector('img');
      enlarged.src = original.currentSrc || original.src;
      enlarged.alt = original.alt;
      viewer.querySelector('p').textContent = productFigure.querySelector('figcaption span').textContent;
      viewer.showModal();
    });
    viewer.addEventListener('click', event => {
      if (event.target === viewer) viewer.close();
    });
    viewer.addEventListener('close', () => open.focus({ preventScroll: true }));
  }
  const photo = new Image();
  photo.alt = document.querySelector('.product-copy h1').textContent + ', photographed by Samcon';
  photo.addEventListener('load', () => {
    productFigure.querySelector('div img').replaceWith(photo);
    productFigure.querySelector('figcaption span').textContent = 'Manufacturer photograph';
  }, { once: true });
  photo.src = productFigure.dataset.sourceImage;
}

const filterControls = document.querySelector('[data-filters]');
const filterStatus = document.querySelector('[data-filter-status]');
const productGroups = [...document.querySelectorAll('[data-group]')];

if (filterControls && filterStatus) {
  const filterButtons = [...filterControls.querySelectorAll('[data-filter]')];

  function applyFilter(requested, updateUrl) {
    const valid = filterButtons.some(({ dataset }) => dataset.filter === requested);
    const selection = valid ? requested : 'all';

    for (const section of productGroups) {
      section.hidden = selection !== 'all' && section.dataset.group !== selection;
    }

    for (const button of filterButtons) {
      button.setAttribute('aria-pressed', String(button.dataset.filter === selection));
    }

    const visibleCount = productGroups.reduce((count, section) => count + (section.hidden ? 0 : section.querySelectorAll('.product-card').length), 0);
    filterStatus.textContent = `${visibleCount} products shown.`;

    if (updateUrl) {
      const next = new URL(location.href);
      if (selection === 'all') next.searchParams.delete('group');
      else next.searchParams.set('group', selection);
      history.replaceState(null, '', next);
    }
  }

  applyFilter(new URLSearchParams(location.search).get('group'), false);
  filterControls.hidden = false;
  for (const button of filterButtons) {
    button.addEventListener('click', () => applyFilter(button.dataset.filter, true));
  }
}

if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      entry.target.classList.add('in-view');
      observer.unobserve(entry.target);
    }
  }, { threshold: 0.05 });

  const sections = '[data-reveal], .feature-image, .location-study, .range-heading, .range-chapter, .field-cells article, .product-card, .spec-copy, .editorial-list > *, .resource-row, .quote-band-inner';
  document.querySelectorAll(sections).forEach(item => observer.observe(item));
}

const enquiry = document.querySelector('[data-enquiry]');
const draft = document.querySelector('[data-draft]');

if (enquiry && draft) {
  const product = enquiry.elements.namedItem('product');
  const draftHeading = draft.querySelector('h2');
  const emailLink = draft.querySelector('[data-open-email]');
  const copyButton = draft.querySelector('[data-copy-draft]');
  const message = draft.querySelector('[data-draft-message]');
  const status = draft.querySelector('[data-draft-status]');
  const requestedProduct = new URLSearchParams(location.search).get('product');

  if ([...product.options].some(({ value }) => value === requestedProduct)) product.value = requestedProduct;
  enquiry.hidden = false;

  enquiry.addEventListener('input', (event) => {
    event.target.setCustomValidity?.('');
    draft.hidden = true;
  });

  enquiry.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = new FormData(enquiry);
    const text = (name) => String(data.get(name) ?? '').trim();
    for (const name of ['name', 'company', 'requirement']) {
      if (text(name)) continue;
      const field = enquiry.elements.namedItem(name);
      field.setCustomValidity('Enter a value for this field.');
      field.reportValidity();
      return;
    }

    const selectedProduct = product.value ? product.selectedOptions[0].textContent.trim() : 'To be confirmed';
    const subject = `Samcon project enquiry | ${selectedProduct}`;
    const reply = [
      'Hello Samcon,', '', 'I would like to discuss an electrical panel requirement.', '',
      `Name: ${text('name')}`, `Company: ${text('company')}`, `Work email: ${text('email')}`,
      ...(text('phone') ? [`Phone: ${text('phone')}`] : []),
      `Product: ${selectedProduct}`, '', 'Project requirements', text('requirement'),
    ].join('\r\n');

    message.value = reply;
    emailLink.href = `mailto:${enquiry.dataset.recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(reply)}`;
    status.textContent = '';
    draft.hidden = false;
    draftHeading.focus();
  });

  copyButton.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(message.value);
      status.textContent = 'Message copied.';
    } catch {
      message.closest('details').open = true;
      message.focus();
      message.select();
      status.textContent = 'Your message is selected. Use your copy shortcut to copy it.';
    }
  });
}
