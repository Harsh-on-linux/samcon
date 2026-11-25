import { company, groups, products, resources } from './catalog.mjs';
import { readFileSync } from 'node:fs';

const logoArtwork = readFileSync(new URL('./static/assets/samcon.svg', import.meta.url), 'utf8');
const projectReferences = [['Fiat India Auto', 'Automotive manufacturing'], ['BHEL, Panipat', 'Industrial engineering'], ['BPCL, Kochi', 'Process industry']];

const nav = [
  ['Home', '/'],
  ['Products', '/products/'], ['Company', '/about/'], ['Resources', '/resources/'],
];
const companyNav = [['Overview', '/about/'], ['Manufacturing', '/capabilities/'], ['Projects', '/projects/'], ['CSR', '/about/csr/']];

const quote = '/contact/#enquiry';
const productPath = ({ slug }) => `/products/${slug}/`;
const productQuote = ({ slug }) => `/contact/?product=${encodeURIComponent(slug)}#enquiry`;
const escape = (value) => String(value).replace(/[&<>"']/g, (character) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
})[character]);

function button(label, href, style = 'primary') {
  return `<a class="button button--${style}" href="${escape(href)}">${escape(label)}</a>`;
}

function wordmark(animate = false) {
  return `<a href="/" class="wordmark" aria-label="Samcon home">
    ${animate ? logoArtwork : '<img src="/assets/samcon.svg" width="80" height="49" alt="">'}
    <span class="company-lockup">Industrial Controls<small>Private Limited</small></span>
  </a>`;
}

function layout({ path, title, description, content, isHome = false }) {
  const inCompany = companyNav.some(([, href]) => href === path);
  const panel = products.find(item => productPath(item) === path);
  const enquiryLink = panel ? productQuote(panel) : quote;
  const links = nav.map(([label, href]) => {
    const current = path === href ? ' aria-current="page"' : '';
    const active = (href === '/' ? isHome : href === '/about/' ? inCompany : path.startsWith(href)) ? ' data-active' : '';
    return `<a href="${href}"${current}${active}>${label}</a>`;
  }).join('');

  return `<!doctype html>
<html lang="en-IN">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="${escape(description)}">
  <meta name="theme-color" content="#ffffff">
  <title>${escape(isHome ? title : `${title} | Samcon`)}</title>
  <link rel="icon" href="/assets/samcon.svg" type="image/svg+xml">
  <link rel="preload" href="/assets/inter-variable.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="stylesheet" href="/site.css">
  <link rel="stylesheet" href="/grid.css">
  ${isHome ? `<script>try {
    if (!sessionStorage.getItem('samcon-intro') && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.documentElement.classList.add('brand-intro');
      sessionStorage.setItem('samcon-intro', 'seen');
    }
  } catch {}</script>` : ''}
  <script src="/site.js" defer></script>
</head>
<body id="top"${isHome ? ' class="home-page"' : ''}>
  <a class="skip-link" href="#main">Skip to content</a>
  <header class="site-header" data-header>
    <div class="frame header-inner">
      ${wordmark(isHome)}
      <button class="menu-toggle" type="button" aria-controls="site-nav" aria-expanded="false" hidden data-menu-toggle>
        <span>Menu</span><span class="menu-icon" aria-hidden="true"></span>
      </button>
      <nav id="site-nav" class="site-nav" aria-label="Main navigation">
        ${links}
        <div class="menu-quote">${button('Request a quote', enquiryLink)}</div>
      </nav>
      <div class="header-quote">${button('Request a quote', enquiryLink)}</div>
    </div>
  </header>
  <main id="main">${inCompany ? `<nav class="frame company-nav" aria-label="Company"><span>Company</span>${companyNav.map(([label, href]) => `<a href="${href}"${path === href ? ' aria-current="page"' : ''}>${label}</a>`).join('')}</nav>` : ''}${content}</main>
  <footer class="site-footer">
    <div class="frame footer-top">
      <div>${wordmark()}<p>Electrical control panel manufacturer<br>${company.location}</p></div>
      <nav aria-label="Footer navigation" class="footer-nav">
        ${[['Products','/products/'], ['Manufacturing','/capabilities/'], ['Projects','/projects/'], ['Resources','/resources/'], ['About Samcon','/about/']].map(([label, href]) => `<a href="${href}">${label}</a>`).join('')}
        <a href="/about/csr/">CSR</a>
      </nav>
      <div class="footer-contact">
        <a href="/contact/">Contact Samcon</a>
        <a class="text-link" href="mailto:${company.email}">${company.email}</a>
      </div>
    </div>
    <div class="frame footer-bottom">${company.name}<a href="#top">Back to top ↑</a></div>
  </footer>
</body>
</html>`;
}

function productImage(product, { priority = false, sizes = '(min-width: 75rem) 380px, (min-width: 40rem) 46vw, 92vw' } = {}) {
  const base = `/assets/products/${product.slug}`;
  const source = priority
    ? `src="${base}-1448.webp" fetchpriority="high"`
    : `src="${base}-720.webp" srcset="${base}-720.webp 720w, ${base}-1448.webp 1448w" sizes="${sizes}" loading="lazy"`;
  return `<img ${source} width="1448" height="1086" alt="${escape(product.alt)}" decoding="async">`;
}

function productCard(product) {
  return `<article class="product-card">
    <a href="${productPath(product)}">
      <div class="card-equipment">${productImage(product, { sizes: '112px' })}</div>
      <div class="product-card-content">
        <h3>${escape(product.title)}</h3>
        <p>${escape(product.summary)}</p>
      </div>
      <span class="row-arrow" aria-hidden="true">→</span>
    </a>
  </article>`;
}

function breadcrumb(links, page) {
  return `<nav class="breadcrumb" aria-label="Breadcrumb">
    <ol><li><a href="/">Home</a></li>${links.map(([label, href]) => `<li><a href="${href}">${escape(label)}</a></li>`).join('')}
      <li aria-current="page">${escape(page)}</li></ol>
  </nav>`;
}

function pageIntro(name, title, description, links = []) {
  return `<section class="frame page-intro">
    ${links.length ? breadcrumb(links, name) : ''}
    <h1>${escape(title)}</h1>
    <p class="lead">${escape(description)}</p>
  </section>`;
}

const studies = [
  { file: 'busbar-study', alt: 'Material study of copper busbars and red insulating supports', caption: 'Copper busbar assembly' },
  { file: 'drawout-study', alt: 'Axonometric study of a switchgear feeder drawer and its housing', caption: 'Withdrawable feeder' },
  { file: 'fabrication-study', alt: 'Enclosure study showing a formed steel edge and mounting hardware', caption: 'Sheet metal enclosure' },
];

function studyImage(study, priority = false) {
  return `<img src="/assets/studies/${study.file}.webp" alt="${study.alt}" decoding="async" ${priority ? 'fetchpriority="high"' : 'loading="lazy"'}>`;
}

function homePage() {
  return `<section class="flagship" aria-labelledby="home-title">
    <div class="flagship-inner">
      <div class="flagship-copy">
        <p class="flagship-family">PCC / MCC</p>
        <h1 id="home-title">Modular power<br>and motor control<span>.</span></h1>
        <p class="flagship-description">Switchboards designed around your plant’s power distribution, motor feeders and cable layout.</p>
      </div>
      <figure class="flagship-assembly">
        <img src="/assets/products/pcc-mcc-1448.webp" srcset="/assets/products/pcc-mcc-720.webp 720w, /assets/products/pcc-mcc-1448.webp 1448w" sizes="(max-width: 44rem) 100vw, 74vw" width="1448" height="1086" alt="Design study of a modular switchboard with incoming power bays and stacked motor feeders" fetchpriority="high">
      </figure>
      <div class="flagship-actions"><a class="flagship-cta" href="/products/pcc-mcc/">Explore PCC / MCC <span aria-hidden="true">→</span></a></div>
    </div>
  </section>
  <section class="frame home-range" id="panel-range" aria-labelledby="range-heading">
    <div id="equipment-studies"><h2 id="range-heading">Find a panel</h2><a class="text-link" href="/products/">View all products</a></div>
    <ul>${groups.map(group => `<li><a href="/products/?group=${group.id}"><div><h3>${group.name}</h3><p>${group.summary}</p></div><span aria-hidden="true">→</span></a></li>`).join('')}</ul>
  </section>
  <section class="frame field-section" aria-labelledby="applications-title">
    <div class="field-heading"><h2 id="applications-title">Selected project references</h2><a class="text-link" href="/projects/">View project list</a></div>
    <div class="field-cells">
      ${projectReferences.map(([name, sector]) => `<article><p class="sector-label">${sector}</p><h3>${name}</h3></article>`).join('')}
    </div>
  </section>
  `;
}

function catalogPage() {
  return `${pageIntro('Products', 'Product catalog', 'Select a panel to view its configuration, applications and enquiry options.')}
  <div class="frame catalog catalog-directory">
    <div class="filters" role="group" aria-labelledby="category-label" data-filters hidden>
      <strong id="category-label">Panel categories</strong>
      <button type="button" data-filter="all" aria-pressed="true">All panels <span>${products.length}</span></button>
      ${groups.map(({ id, name }) => `<button type="button" data-filter="${id}" aria-pressed="false">${name} <span>${products.filter(product => product.group === id).length}</span></button>`).join('')}
    </div>
    <div class="catalog-results">
    <p class="visually-hidden" role="status" data-filter-status></p>
    ${groups.map(({ id, name, summary }) => `<section class="catalog-group" id="${id}" data-group="${id}" aria-labelledby="${id}-title">
      <div class="section-heading"><h2 id="${id}-title">${name}</h2><p>${summary}</p></div>
      <div class="product-grid">${products.filter(({ group }) => group === id).map(productCard).join('')}</div>
    </section>`).join('')}
    <p class="media-note">Product imagery is illustrative. Configurations are specified for each project.</p>
    </div>
  </div>
  `;
}

const manufacturerImages = {
  'pcc-mcc': 'gallery/cp/83.jpg', 'distribution-boards': 'gallery/cp/68.jpg',
  'apfcr-panels': 'gallery/cp/89.jpg', 'drawout-panels': 'gallery/cp/14.jpg',
  'outdoor-panels': 'gallery/cp/93.jpg', 'intelligent-motor-control-center': 'gallery/cp/90.jpg',
  'ahu-panels': 'product/ahu-panel.jpg', 'solar-panels': 'product/solar1.jpg',
  'dg-synchronize-panels': 'product/dg-panel.jpg',
};

function productPage(product) {
  const group = groups.find(({ id }) => id === product.group);
  const isFlagship = product.slug === 'pcc-mcc';
  const ordered = groups.flatMap(group => products.filter(item => item.group === group.id));
  const index = ordered.indexOf(product);
  const adjacent = step => ordered[(index + step + ordered.length) % ordered.length];
  return `<section class="frame product-top">
    <div class="panel-tools">${breadcrumb([['Products', '/products/']], product.name)}
    <nav class="panel-browser" aria-label="Product navigation">
      <details><summary>Switch panel <span aria-hidden="true">⌄</span></summary>
        <div class="panel-directory">${groups.map(group => `<div><strong>${group.name}</strong>${ordered.filter(item => item.group === group.id).map(item => `<a href="${productPath(item)}" ${item === product ? 'aria-current="page"' : ''}>${escape(item.name)}</a>`).join('')}</div>`).join('')}</div>
      </details>
    </nav></div>
    <div class="product-intro">
      <div class="product-copy">
        <span class="eyebrow">${group.name}</span>
        <h1>${escape(product.title)}</h1>
        <p class="lead">${escape(product.summary)}</p>
        <div class="actions">${button('Request a quote', productQuote(product))}</div>
      </div>
      <figure class="product-figure" data-source-image="${company.website}images/${manufacturerImages[product.slug]}">
        <div>${productImage(product, { priority: true })}</div>
        <button class="image-open" type="button" data-image-open hidden>Enlarge image <span aria-hidden="true">↗</span></button>
        <figcaption>${escape(product.name)}<span>Concept render</span></figcaption>
      </figure>
    </div>
  </section>
  <dialog class="image-view" aria-label="${escape(product.name)} image viewer"><header><strong>${escape(product.name)}</strong><form method="dialog"><button autofocus>Close ×</button></form></header><img alt=""><p></p></dialog>
  <nav class="frame detail-contents" aria-label="On this product page"><span>On this page</span><a href="#configuration">Configuration</a><a href="#applications">Applications</a><a href="#documents">Documents</a></nav>
  <section class="frame product-config section-spacing" id="configuration" aria-labelledby="config-title">
    <div class="${isFlagship ? 'spec-panel spec-panel--technical' : 'spec-panel'}">
      <div class="spec-copy">
        <h2 id="config-title">Configuration overview</h2>
        <dl class="spec-list">${product.specs.map(([term, value]) => `<div><dt>${escape(term)}</dt><dd>${escape(value)}</dd></div>`).join('')}</dl>
        <p>Confirm ratings, dimensions and enclosure requirements for your project.</p>
      </div>
      ${isFlagship ? `<figure class="engineering-figure" data-reveal>
        <img width="1448" height="1086" src="/assets/products/pcc-mcc-technical.webp" alt="Technical-style outline showing the exterior and door arrangement of the concept switchboard" loading="lazy" decoding="async">
        <figcaption>Configuration illustration</figcaption>
      </figure>` : ''}
    </div>
  </section>
  <section class="frame product-body section-spacing" id="applications" aria-labelledby="application-title">
    <h2 id="application-title">Applications and options</h2>
    <div class="product-body-content">${product.sections.map(([heading, text]) => `<section><h3>${escape(heading)}</h3><p>${escape(text)}</p></section>`).join('')}
    </div>
  </section>
  <section class="frame product-body section-spacing" id="documents"><h2>Documents</h2><div class="document-links"><a href="${escape(product.source)}">Manufacturer’s product reference ↗</a><a href="/resources/">Panel brochures and installation manual →</a></div></section>
  <nav class="frame panel-neighbours" aria-label="Adjacent products">
    <a href="${productPath(adjacent(-1))}"><small>← Previous panel</small>${escape(adjacent(-1).name)}</a>
    <a href="${productPath(adjacent(1))}"><small>Next panel →</small>${escape(adjacent(1).name)}</a>
  </nav>`;
}

function capabilitiesPage() {
  const capabilities = [
    ['Sheet metal fabrication', 'CNC fabrication forms the enclosure frames, panels and partitions. Coordinate service clearance and enclosure layout early in the project.'],
    ['Busbar fabrication and panel assembly', 'Samcon describes busbar punching and bending, panel finishing, and assembly. Confirm the conductor arrangement, cable entry and access for maintenance.'],
    ['Inspection and testing', 'Samcon’s PCC/MCC documentation describes dimensional, functional and insulation checks. Discuss applicable test scope and witness requirements for the configured assembly.'],
  ];
  return `${pageIntro('Capabilities', 'Manufacturing and testing', 'Work with Samcon on the enclosure, power system layout and documentation for your electrical control panels.')}
  <div class="frame feature-layout">
    <div class="editorial-list">${capabilities.map(([heading, description]) => `<section><h2>${heading}</h2><p>${description}</p></section>`).join('')}</div>
    <figure class="feature-image">
      ${studyImage(studies[2])}
      <figcaption>Sheet metal enclosure study</figcaption>
    </figure>
  </div>
  <div class="frame supporting-links actions">
    <a class="text-link" href="https://www.sme.in/samconicpl/Electrical_Manufacturing.html">Published equipment list</a>
    <a class="text-link" href="${company.gallery}">Samcon’s panel gallery</a>
  </div>
  `;
}

function projectsPage() {
  return `${pageIntro('Projects', 'Project references', 'Selected organisations and sectors from Samcon’s published project list.')}
  <section class="frame project-records" aria-label="Selected project references">
    <table><thead><tr><th scope="col">Organisation</th><th scope="col">Sector</th></tr></thead><tbody>${projectReferences.map(([name, industry]) => `<tr><th scope="row">${name}</th><td>${industry}</td></tr>`).join('')}</tbody></table>
    <div class="supporting-links actions"><a class="text-link" href="${company.projects}">View Samcon’s project list</a><a class="text-link" href="${company.gallery}">View completed panel photographs</a></div>
  </section>
  `;
}

function resourcesPage() {
  return `${pageIntro('Resources', 'Document library', 'Choose a brochure for equipment selection or the manual for installation and handling.')}
  <div class="frame resource-list">
    ${['Brochures', 'Installation'].map(section => `<section class="library-group"><h2>${section}</h2><div>${resources.filter(doc => doc.section === section).map(({title,line,url}) => `<a class="library-file" href="${escape(url)}"><div><h3>${escape(title)}</h3><p>${escape(line)}</p></div><span>PDF ↗</span></a>`).join('')}</div></section>`).join('')}
    <p class="media-note">Confirm the applicable document and revision for your project with Samcon.</p>
  </div>
  `;
}

function aboutPage() {
  return `${pageIntro('About', 'About Samcon', 'Samcon Industrial Controls designs and manufactures electrical control panel systems in Maharashtra.')}
  <div class="frame story-layout">
    <section class="editorial-list">
      <div><h2>Panel engineering since 1998</h2><p>Samcon works across power distribution, engineering, HVAC and process industries.</p><a class="text-link" href="/projects/">See project references</a></div>
      <div id="core-values"><h2>Manufacturing and quality</h2><p>Samcon fabricates enclosures, assembles panels and checks each project’s electrical configuration.</p><a class="text-link" href="/capabilities/">Explore manufacturing and testing</a></div>
      <div><h2>Corporate social responsibility</h2><p><a class="text-link" href="/about/csr/">Find Samcon’s CSR information</a></p></div>
    </section>
    <aside class="story-aside"><figure class="location-study">${studyImage(studies[2])}<figcaption>Enclosure fabrication study</figcaption></figure><h2>Manufacturing location</h2><p>${company.location}</p><a class="text-link" href="${company.contact}">View published address and contacts</a></aside>
  </div>
  `;
}

function csrPage() {
  return `${pageIntro('CSR', 'Corporate social responsibility', 'Find Samcon’s published CSR information or contact the company for current details.', [['About', '/about/']])}
  <section class="frame supporting-links actions">
    <a class="button button--secondary" href="https://www.sme.in/samconicpl/CSR.html">Published CSR information</a>
    <a class="text-link" href="/contact/">Contact Samcon</a>
  </section>`;
}

function contactPage() {
  return `${pageIntro('Contact', 'Request a quote', 'Share the panel family, application and project requirements so Samcon can discuss the right configuration.')}
  <div class="frame contact-layout" id="enquiry">
    <div class="contact-main">
      <form class="enquiry-form" data-enquiry data-recipient="${company.email}" hidden>
        <div class="form-heading"><h2>Project enquiry</h2><p>Prepare an email to the Samcon sales team. You can review it before sending.</p></div>
        <div class="form-grid">
          <label>Name<input name="name" autocomplete="name" maxlength="100" required></label>
          <label>Company<input name="company" autocomplete="organization" maxlength="120" required></label>
          <label>Work email<input type="email" name="email" autocomplete="email" maxlength="160" required></label>
          <label>Phone <span>(optional)</span><input type="tel" name="phone" autocomplete="tel" maxlength="30"></label>
          <label class="form-wide">Product<select name="product"><option value="">Select a product, if known</option>
            ${products.map(({ slug, name }) => `<option value="${slug}">${escape(name)}</option>`).join('')}
          </select></label>
          <label class="form-wide">Project requirements<textarea name="requirement" rows="5" maxlength="1500" placeholder="Application, project location, panel type and any project-specific requirements" required></textarea></label>
        </div>
        <button class="button button--primary" type="submit">Prepare enquiry</button>
      </form>
      <section class="draft-result" data-draft hidden aria-labelledby="draft-title">
        <h2 id="draft-title" tabindex="-1">Your enquiry draft is ready</h2>
        <p>Open it in your email app, or copy the message into your own email.</p>
        <div class="actions"><a class="button button--primary" data-open-email href="mailto:${company.email}">Open email draft</a>
          <button class="button button--secondary" type="button" data-copy-draft>Copy message</button></div>
        <p class="draft-status" data-draft-status role="status"></p>
        <details><summary>Review message</summary><label class="visually-hidden" for="draft-message">Prepared enquiry message</label><textarea id="draft-message" rows="9" readonly data-draft-message></textarea></details>
      </section>
    </div>
    <aside class="contact-aside">
      <h2>Contact sales</h2>
      <p><a class="text-link" href="mailto:${company.email}">${company.email}</a></p>
      <h3>Manufacturing location</h3><p>${company.location}</p>
      <a class="text-link" href="${company.contact}">Published address and phone details</a>
    </aside>
  </div>`;
}

export const pages = [
  { path: '/', title: 'Samcon | Electrical Control Panels', description: 'Explore Samcon’s industrial electrical control panels, including PCC and MCC switchgear, distribution boards and HVAC controls.', content: homePage(), isHome: true },
  { path: '/products/', title: 'Electrical control panels', description: 'Browse Samcon’s nine electrical control panel families by application.', content: catalogPage() },
  ...products.map((product) => ({ path: productPath(product), title: product.title, description: product.summary, content: productPage(product) })),
  { path: '/capabilities/', title: 'Manufacturing and testing', description: 'Explore Samcon’s enclosure fabrication, panel assembly and testing capabilities.', content: capabilitiesPage() },
  { path: '/projects/', title: 'Project applications', description: 'Explore applications and published project references for Samcon control panels.', content: projectsPage() },
  { path: '/resources/', title: 'Brochures and technical resources', description: 'Find published Samcon brochures and panel installation information.', content: resourcesPage() },
  { path: '/about/', title: 'About Samcon', description: 'Learn about Samcon Industrial Controls, an electrical control panel manufacturer in Maharashtra.', content: aboutPage() },
  { path: '/about/csr/', title: 'Corporate social responsibility', description: 'Find Samcon’s published CSR information.', content: csrPage() },
  { path: '/contact/', title: 'Request a quote', description: 'Prepare an enquiry for Samcon about an electrical control panel project.', content: contactPage() },
].map((page) => ({ path: page.path, html: layout(page) }));
