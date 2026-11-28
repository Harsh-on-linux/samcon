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

const homeHero = document.querySelector('.home-page .landing');
if (homeHero && header) {
  function updateHeroHeader() {
    header.toggleAttribute('data-over-hero', homeHero.getBoundingClientRect().bottom > header.offsetHeight + 16);
  }
  window.addEventListener('scroll', updateHeroHeader, { passive: true });
  window.addEventListener('resize', updateHeroHeader, { passive: true });
  if ('ResizeObserver' in window) new ResizeObserver(updateHeroHeader).observe(homeHero);
  updateHeroHeader();
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
const siteFooter = document.querySelector('.site-footer');
const footerRevealTrigger = document.querySelector('[data-footer-trigger]');
const siteContent = document.querySelector('[data-site-content]');

function updateFooterReveal() {
  const fitsViewport = siteFooter && siteFooter.offsetHeight <= innerHeight;
  document.body.classList.toggle('has-footer-reveal', Boolean(siteContent && footerRevealTrigger && fitsViewport && !textMotionPreference.matches));
}

if (siteFooter && 'ResizeObserver' in window) new ResizeObserver(updateFooterReveal).observe(siteFooter);
window.addEventListener('resize', updateFooterReveal, { passive: true });
textMotionPreference.addEventListener('change', updateFooterReveal);
updateFooterReveal();

let footerHashPending = false;
let footerHashLayoutReady = !document.fonts;

function applyFooterHashNavigation() {
  if (!footerHashPending || !footerHashLayoutReady || location.hash !== '#footer' || page.classList.contains('brand-intro')) return;
  footerHashPending = false;
  updateFooterReveal();
  const coverEnd = scrollY + siteContent.getBoundingClientRect().bottom;
  window.scrollTo({ left: scrollX, top: Math.max(0, coverEnd), behavior: 'instant' });
}

function requestFooterHashNavigation() {
  footerHashPending = Boolean(siteFooter && siteContent && footerRevealTrigger && location.hash === '#footer');
  if (footerHashPending) setTimeout(applyFooterHashNavigation, 0);
}

if (document.fonts) {
  document.fonts.ready.then(() => {
    footerHashLayoutReady = true;
    applyFooterHashNavigation();
  });
}
if (page.classList.contains('brand-intro')) {
  const footerHashIntroObserver = new MutationObserver(() => {
    if (page.classList.contains('brand-intro')) return;
    footerHashIntroObserver.disconnect();
    applyFooterHashNavigation();
  });
  footerHashIntroObserver.observe(page, { attributes: true, attributeFilter: ['class'] });
}
window.addEventListener('hashchange', requestFooterHashNavigation);
window.addEventListener('pageshow', requestFooterHashNavigation);
document.addEventListener('click', event => {
  if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || location.hash !== '#footer') return;
  const link = event.target.closest('a[href]');
  if (!link || link.hasAttribute('download') || (link.target && link.target !== '_self')) return;
  if (link.href === location.href) {
    event.preventDefault();
    requestFooterHashNavigation();
  }
});
requestFooterHashNavigation();

const typewriterSections = [...document.querySelectorAll('.home-page main [data-typewriter], .site-footer[data-typewriter]')]
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
      playSection(entry.target === footerRevealTrigger ? siteFooter : entry.target);
      observer.unobserve(entry.target);
    }
  }, { threshold: 0, rootMargin: '0px 0px -8% 0px' });

  // A fast scroll can skip the one-pixel sentinel, so also check the uncovered footer.
  function revealUncoveredFooter() {
    if (!siteFooter || !siteContent || siteFooter.dataset.typewriterState !== 'pending' || page.classList.contains('brand-intro')) return;
    const footer = siteFooter.getBoundingClientRect();
    const coverBottom = siteContent.getBoundingClientRect().bottom;
    if (coverBottom < innerHeight && footer.bottom > 0 && footer.top < innerHeight) {
      playSection(siteFooter);
      observer.unobserve(footerRevealTrigger || siteFooter);
    }
  }
  window.addEventListener('scroll', revealUncoveredFooter, { passive: true });
  window.addEventListener('resize', revealUncoveredFooter, { passive: true });
  window.addEventListener('pageshow', () => setTimeout(revealUncoveredFooter, 0));
  window.addEventListener('hashchange', () => setTimeout(revealUncoveredFooter, 0));

  // Preserve the original logo handoff before starting scroll-triggered text.
  let introObserver;
  function observeSections() {
    if (page.classList.contains('brand-intro')) return;
    introObserver?.disconnect();
    revealUncoveredFooter();
    requestAnimationFrame(() => {
      if (textMotionPreference.matches) return;
      for (const section of typewriterSections) {
        if (section.dataset.typewriterState === 'pending') observer.observe(section === siteFooter && footerRevealTrigger ? footerRevealTrigger : section);
      }
      revealUncoveredFooter();
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

const productPreview = document.querySelector('[data-product-preview-card]');
const previewTriggers = [...document.querySelectorAll('.home-page a[data-product-preview]')];

if (productPreview && previewTriggers.length) {
  const image = productPreview.querySelector('[data-preview-image]');
  const title = productPreview.querySelector('[data-preview-title]');
  const description = productPreview.querySelector('[data-preview-description]');
  const productLink = productPreview.querySelector('[data-preview-link]');
  const closeButton = productPreview.querySelector('[data-preview-close]');
  const finePointer = matchMedia('(hover: hover) and (pointer: fine)');
  const smallViewport = matchMedia('(max-width: 47.99rem)');
  let activeTrigger = null;
  let closeTimer = null;
  let inputMode = 'keyboard';
  let suppressFocus = false;

  productPreview.id ||= 'product-preview';
  productPreview.setAttribute('role', 'region');
  productPreview.setAttribute('aria-label', 'Product preview');
  productPreview.hidden = true;

  function cancelPreviewClose() {
    clearTimeout(closeTimer);
    closeTimer = null;
  }

  function unlinkPreview(trigger) {
    if (!trigger) return;
    const ids = (trigger.getAttribute('aria-describedby') || '').split(/\s+/)
      .filter(id => id && id !== productPreview.id);
    if (ids.length) trigger.setAttribute('aria-describedby', ids.join(' '));
    else trigger.removeAttribute('aria-describedby');
  }

  function closePreview(restoreFocus = false) {
    cancelPreviewClose();
    const trigger = activeTrigger;
    if (!trigger && productPreview.hidden) return;
    restoreFocus ||= productPreview.contains(document.activeElement);
    activeTrigger = null;
    unlinkPreview(trigger);
    productPreview.classList.remove('is-open');
    productPreview.hidden = true;
    if (restoreFocus && trigger) {
      suppressFocus = true;
      trigger.focus({ preventScroll: true });
      suppressFocus = false;
    }
  }

  function queuePreviewClose() {
    cancelPreviewClose();
    closeTimer = setTimeout(() => {
      closeTimer = null;
      if (!activeTrigger?.contains(document.activeElement) && !productPreview.contains(document.activeElement)) closePreview();
    }, 160);
  }

  function queueHoverPreviewClose(event) {
    if (event.pointerType === 'mouse' && finePointer.matches) queuePreviewClose();
  }

  function positionPreview(trigger, pointer) {
    const bottom = !finePointer.matches || smallViewport.matches;
    productPreview.classList.toggle('is-bottom', bottom);
    if (bottom) {
      productPreview.style.removeProperty('left');
      productPreview.style.removeProperty('top');
      return;
    }
    const margin = 16;
    const gap = 22;
    const bounds = trigger.getBoundingClientRect();
    const card = productPreview.getBoundingClientRect();
    let left = pointer ? pointer.clientX + gap : bounds.right + gap;
    let top = pointer ? pointer.clientY + gap : bounds.top;
    if (left + card.width > innerWidth - margin) left = (pointer ? pointer.clientX : bounds.left) - card.width - gap;
    if (top + card.height > innerHeight - margin) top = (pointer ? pointer.clientY : bounds.bottom) - card.height - gap;
    left = Math.max(margin, Math.min(left, innerWidth - card.width - margin));
    top = Math.max(margin, Math.min(top, innerHeight - card.height - margin));
    productPreview.style.left = `${Math.round(left)}px`;
    productPreview.style.top = `${Math.round(top)}px`;
  }

  function openPreview(trigger, pointer) {
    cancelPreviewClose();
    if (activeTrigger !== trigger) unlinkPreview(activeTrigger);
    activeTrigger = trigger;
    image.src = trigger.dataset.previewImage;
    image.alt = trigger.dataset.previewName;
    title.textContent = trigger.dataset.previewName;
    description.textContent = trigger.dataset.previewDescription;
    productLink.href = trigger.href;
    const describedBy = new Set((trigger.getAttribute('aria-describedby') || '').split(/\s+/).filter(Boolean));
    describedBy.add(productPreview.id);
    trigger.setAttribute('aria-describedby', [...describedBy].join(' '));
    productPreview.hidden = false;
    productPreview.classList.add('is-open');
    positionPreview(trigger, pointer);
  }

  const previewFocusables = () => [...productPreview.querySelectorAll('a[href], button:not([disabled]), [tabindex]')]
    .filter(element => element.tabIndex >= 0 && element.getClientRects().length);

  for (const trigger of previewTriggers) {
    trigger.addEventListener('pointerdown', event => { inputMode = event.pointerType; });
    trigger.addEventListener('pointerenter', event => {
      if (finePointer.matches && event.pointerType === 'mouse') openPreview(trigger, event);
    });
    trigger.addEventListener('pointermove', event => {
      if (activeTrigger === trigger && finePointer.matches && event.pointerType === 'mouse') positionPreview(trigger, event);
    });
    trigger.addEventListener('pointerleave', queueHoverPreviewClose);
    trigger.addEventListener('focus', () => {
      const keyboardOrDesktopMouse = inputMode === 'keyboard' || (inputMode === 'mouse' && finePointer.matches && !smallViewport.matches);
      if (!suppressFocus && keyboardOrDesktopMouse) openPreview(trigger);
    });
    trigger.addEventListener('focusout', queuePreviewClose);
    trigger.addEventListener('keydown', event => {
      if (event.key === 'ArrowDown') {
        event.preventDefault();
        openPreview(trigger);
        previewFocusables()[0]?.focus({ preventScroll: true });
        return;
      }
      if (activeTrigger !== trigger || productPreview.hidden) return;
      if (event.key === 'Tab' && !event.shiftKey) {
        event.preventDefault();
        previewFocusables()[0]?.focus({ preventScroll: true });
      }
    });
    trigger.addEventListener('click', event => {
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const touchClick = event.detail > 0 && (inputMode === 'touch' || inputMode === 'pen' || !finePointer.matches || smallViewport.matches);
      if (!touchClick) {
        closePreview();
        return;
      }
      if (activeTrigger !== trigger) {
        event.preventDefault();
        openPreview(trigger);
      } else {
        closePreview();
      }
    });
  }

  productPreview.addEventListener('pointerenter', cancelPreviewClose);
  productPreview.addEventListener('pointerleave', queueHoverPreviewClose);
  productPreview.addEventListener('focusin', cancelPreviewClose);
  productPreview.addEventListener('focusout', event => {
    if (!productPreview.contains(event.relatedTarget) && !activeTrigger?.contains(event.relatedTarget)) queuePreviewClose();
  });
  productPreview.addEventListener('keydown', event => {
    if (event.key !== 'Tab' || !activeTrigger) return;
    const focusables = previewFocusables();
    if (event.shiftKey && document.activeElement === focusables[0]) {
      event.preventDefault();
      activeTrigger.focus({ preventScroll: true });
    } else if (!event.shiftKey && document.activeElement === focusables.at(-1)) {
      const links = [...document.querySelectorAll('a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]')]
        .filter(element => !productPreview.contains(element) && element.tabIndex >= 0 && element.getClientRects().length);
      const next = links[links.indexOf(activeTrigger) + 1];
      if (next) {
        event.preventDefault();
        closePreview();
        next.focus();
      }
    }
  });
  productLink.addEventListener('click', () => closePreview());
  closeButton.addEventListener('click', () => closePreview(true));
  document.addEventListener('pointerdown', event => {
    if (activeTrigger && !activeTrigger.contains(event.target) && !productPreview.contains(event.target)) closePreview();
  });
  document.addEventListener('keydown', event => {
    inputMode = 'keyboard';
    if (event.key === 'Escape' && activeTrigger) {
      event.preventDefault();
      closePreview(true);
    }
  }, { capture: true });
  window.addEventListener('scroll', () => {
    const keyboardFocusWithin = inputMode === 'keyboard' && activeTrigger
      && (activeTrigger.contains(document.activeElement) || productPreview.contains(document.activeElement));
    if (keyboardFocusWithin) positionPreview(activeTrigger);
    else closePreview();
  }, { passive: true });
  window.addEventListener('resize', () => closePreview(), { passive: true });
  finePointer.addEventListener('change', () => closePreview());
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
