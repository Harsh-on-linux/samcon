const header = document.querySelector('[data-header]');
const menuToggle = document.querySelector('[data-menu-toggle]');
const menu = document.getElementById('site-nav');
if (header && 'ResizeObserver' in window) {
  new ResizeObserver(() => {
    document.documentElement.style.setProperty('--header-height', header.offsetHeight + 'px');
  }).observe(header);
}

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

  matchMedia('(min-width: 52rem)').addEventListener('change', () => setMenu(false));
}

const brandIntro = document.querySelector('[data-brand-intro]');
const page = document.documentElement;
if (brandIntro && page.classList.contains('brand-intro')) {
  const introEvents = new AbortController();
  const { signal } = introEvents;
  const introLogo = brandIntro.querySelector('svg');
  const headerLogo = header?.querySelector('.wordmark img');

  function alignIntroLogo() {
    const backdrop = brandIntro.getBoundingClientRect();
    const destination = headerLogo.getBoundingClientRect();
    const logoWidth = parseFloat(getComputedStyle(introLogo).width);
    if (!logoWidth || !destination.width) return;

    const x = destination.left + destination.width / 2 - (backdrop.left + backdrop.width / 2);
    const y = destination.top + destination.height / 2 - (backdrop.top + backdrop.height / 2);
    brandIntro.style.setProperty('--intro-x', `${x}px`);
    brandIntro.style.setProperty('--intro-y', `${y}px`);
    brandIntro.style.setProperty('--intro-scale', destination.width / logoWidth);
    page.classList.add('brand-intro-dock');
  }

  function dismissIntro() {
    page.classList.remove('brand-intro', 'brand-intro-dock');
    introEvents.abort();
  }

  if (introLogo && headerLogo) {
    alignIntroLogo();
    window.addEventListener('resize', alignIntroLogo, { signal });
    window.addEventListener('scroll', alignIntroLogo, { passive: true, signal });
  }

  brandIntro.addEventListener('animationend', (event) => {
    if (event.animationName === 'logo-intro-dock' || event.animationName === 'logo-intro-hide') dismissIntro();
  }, { signal });
  brandIntro.addEventListener('pointerdown', dismissIntro, { signal });
  document.addEventListener('focusin', dismissIntro, { signal });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') dismissIntro();
  }, { signal });
  matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', dismissIntro, { signal });
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
      if (next.href !== location.href) history.pushState(null, '', next);
    }
  }

  applyFilter(new URLSearchParams(location.search).get('group'), false);
  window.addEventListener('popstate', () => applyFilter(new URLSearchParams(location.search).get('group'), false));
  filterControls.hidden = false;
  for (const button of filterButtons) {
    button.addEventListener('click', () => applyFilter(button.dataset.filter, true));
  }
}

const textMotionPreference = matchMedia('(prefers-reduced-motion: reduce)');
const typewriterSections = [...document.querySelectorAll('[data-typewriter]')]
  .filter(section => section.dataset.typewriter !== 'off' && !section.parentElement.closest('[data-typewriter]'));

if (textMotionPreference.matches || !('IntersectionObserver' in window)) {
  typewriterSections.forEach(section => {
    section.dataset.typewriterState = 'complete';
    section.dataset.typewriterProgress = '0/0';
    section.classList.add('is-typed');
  });
} else {
  const records = new Map();
  const excludedText = 'script, style, noscript, template, svg, canvas, form, input, textarea, select, option, button, [aria-hidden="true"], [aria-live], [role="status"], [role="alert"], [data-no-typewriter], [data-typewriter="off"], .no-typewriter, .visually-hidden, .sr-only';
  const textBlocks = 'h1, h2, h3, h4, h5, h6, p, li, dt, dd, th, td, figcaption, address, a';
  const segmenter = 'Segmenter' in Intl ? new Intl.Segmenter(undefined, { granularity: 'grapheme' }) : null;
  const characters = text => segmenter ? [...segmenter.segment(text)].map(item => item.segment) : Array.from(text);

  function completeSection(section) {
    const record = records.get(section);
    if (record) {
      if (record.timer !== null) clearTimeout(record.timer);
      if (record.tickTimer !== null) clearTimeout(record.tickTimer);
      record.timer = null;
      record.tickTimer = null;
      for (let index = record.visibleCount; index < record.schedule.length; index++) {
        record.schedule[index].character.classList.add('is-visible');
      }
      record.visibleCount = record.schedule.length;
      section.dataset.typewriterProgress = `${record.visibleCount}/${record.schedule.length}`;
    }
    section.classList.remove('is-typing');
    section.classList.add('is-typed');
    section.dataset.typewriterState = 'complete';
  }

  function playSection(section) {
    if (section.dataset.typewriterState !== 'pending') return;
    if (section.contains(document.activeElement) || textMotionPreference.matches) {
      completeSection(section);
      return;
    }
    section.classList.add('is-typing');
    section.dataset.typewriterState = 'playing';
    const record = records.get(section);
    const started = performance.now();
    function revealCharacters(now) {
      if (section.dataset.typewriterState !== 'playing') return;
      const elapsed = now - started;
      while (record.visibleCount < record.schedule.length && record.schedule[record.visibleCount].delay <= elapsed) {
        record.schedule[record.visibleCount++].character.classList.add('is-visible');
      }
      section.dataset.typewriterProgress = `${record.visibleCount}/${record.schedule.length}`;
      if (record.visibleCount === record.schedule.length) completeSection(section);
      else record.tickTimer = setTimeout(() => revealCharacters(performance.now()), 20);
    }
    // The guard leaves all copy readable if a background tab delays text ticks.
    record.timer = setTimeout(() => completeSection(section), record.duration);
    revealCharacters(started);
  }

  for (const section of typewriterSections) {
    const walker = document.createTreeWalker(section, NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (walker.nextNode()) {
      const node = walker.currentNode;
      const parent = node.parentElement;
      if (!node.textContent.trim() || parent.closest(excludedText)) continue;
      const hiddenAncestor = parent.closest('[hidden]');
      if (hiddenAncestor && section.contains(hiddenAncestor)) continue;
      nodes.push(node);
    }

    const blocks = new Map();
    for (const node of nodes) {
      const block = node.parentElement.closest(textBlocks) || section;
      if (!blocks.has(block)) blocks.set(block, []);
      const blockCharacters = blocks.get(block);
      const accessible = document.createElement('span');
      accessible.className = 'visually-hidden typewriter-accessible';
      accessible.textContent = node.textContent;
      const visual = document.createElement('span');
      visual.className = 'typewriter-visual';
      visual.setAttribute('aria-hidden', 'true');
      for (const part of node.textContent.split(/(\s+)/)) {
        if (!part || /^\s+$/.test(part)) {
          visual.append(document.createTextNode(part));
          continue;
        }
        const word = document.createElement('span');
        word.className = 'typewriter-word';
        for (const character of characters(part)) {
          const span = document.createElement('span');
          span.className = 'typewriter-char';
          span.textContent = character;
          word.append(span);
          blockCharacters.push(span);
        }
        visual.append(word);
      }
      node.replaceWith(accessible, visual);
    }

    let blockIndex = 0;
    let duration = 0;
    const schedule = [];
    for (const blockCharacters of blocks.values()) {
      const startDelay = Math.min(blockIndex++ * 65, 260);
      const step = Math.min(32, 1150 / Math.max(1, blockCharacters.length));
      blockCharacters.forEach((character, index) => {
        const delay = Math.round(startDelay + index * step);
        character.style.setProperty('--char-delay', `${delay}ms`);
        schedule.push({ character, delay });
      });
      duration = Math.max(duration, startDelay + blockCharacters.length * step + 80);
    }
    schedule.sort((first, second) => first.delay - second.delay);
    records.set(section, { duration, schedule, visibleCount: 0, tickTimer: null, timer: null });
    section.classList.add('typewriter-ready');
    section.dataset.typewriterState = 'pending';
    section.dataset.typewriterProgress = `0/${schedule.length}`;
    if (!nodes.length || section.contains(document.activeElement)) completeSection(section);

    // Keyboard navigation never waits for text to finish appearing.
    section.addEventListener('focusin', () => completeSection(section));
  }

  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      playSection(entry.target);
      observer.unobserve(entry.target);
    }
  }, { threshold: 0, rootMargin: '0px 0px -8% 0px' });

  // Preserve the original logo handoff before starting scroll-triggered text.
  let introObserver;
  function observeSections() {
    if (page.classList.contains('brand-intro')) return;
    introObserver?.disconnect();
    requestAnimationFrame(() => {
      if (textMotionPreference.matches) return;
      for (const section of typewriterSections) {
        if (section.dataset.typewriterState === 'pending') observer.observe(section);
      }
    });
  }
  if (page.classList.contains('brand-intro')) {
    introObserver = new MutationObserver(observeSections);
    introObserver.observe(page, { attributes: true, attributeFilter: ['class'] });
  } else {
    observeSections();
  }

  textMotionPreference.addEventListener('change', event => {
    if (!event.matches) return;
    introObserver?.disconnect();
    observer.disconnect();
    typewriterSections.forEach(completeSection);
  });
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
