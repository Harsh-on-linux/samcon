# Samcon website redesign implementation plan

## Goal

Help procurement teams, electrical consultants, and project engineers find the right control panel, verify Samcon's capabilities, and submit a project enquiry. The primary action is **Request a quote**. **Explore products** and **Download brochure** support visitors who are still evaluating suppliers.

## Current site audit

- The legacy homepage leads with rotating banners and a company introduction. Product families sit inside a dropdown, while projects, credentials, and downloads are spread across the navigation and homepage. Give the product catalog its own landing page and use the homepage to guide buyers from relevant products to proof and an enquiry. [Legacy Samcon homepage](https://www.sme.in/samconicpl/)
- The product menu lists nine families. Sampled product pages contain technical copy that should remain easy to scan. The APFCR page has a PCC/MCC heading, so check each migrated heading and specification against the approved product data. [Legacy product menu](https://www.sme.in/samconicpl/) · [APFCR page](https://www.sme.in/samconicpl/APFCR_Panel.html) · [Solar panels page](https://www.sme.in/samconicpl/Solar_Panels.html)
- The legacy contact page lists a Thane West office, while Samcon's standalone site lists an Asangaon location and different phone contacts. Confirm which locations to show, what each location is for, and who should receive enquiries. [Legacy contact page](https://www.sme.in/samconicpl/contact.html) · [Standalone Samcon contact page](https://www.samconcontrolpanel.com/contact.php)
- Existing brochures, manufacturing information, and panel photos give the redesign material to work with. Verify current versions, publication rights, and any certification or OEM claims against the supporting documents before publishing. [TTA brochure](https://www.sme.in/samconicpl/pdf/Samcon_TTA_Brochure.pdf) · [L&T Ti brochure](https://www.sme.in/samconicpl/pdf/Samcon_LT_TI_BROCHURE.pdf) · [Manufacturing page](https://www.sme.in/samconicpl/Electrical_Manufacturing.html) · [Control panel gallery](https://www.samconcontrolpanel.com/gallery-control-panels.php)

The requested `/samconicpl/index.html` could not be fetched during the audit. The directory homepage and accessible subpages supplied the content inventory. Some linked legacy pages also could not be fetched. Check the remaining pages and the rendered desktop and mobile layouts once a live or archived copy is available.

## Proposed site structure

| Page | Route | What visitors can do |
| --- | --- | --- |
| Home | `/` | Understand what Samcon manufactures, see key product families, and start an enquiry. |
| Products | `/products/` | Browse all nine existing product families by application. |
| Product detail | `/products/<slug>/` | Review applications, photos, approved specifications, and related documents. Enquire about the selected product. |
| Capabilities | `/capabilities/` | Review manufacturing, CNC sheet metal and electronics shops, testing, and quality assurance. |
| Projects | `/projects/` | See approved project examples with the sector, Samcon's scope, and the panel families supplied. |
| Resources | `/resources/` | Download current brochures, manuals, and technical specifications. |
| About | `/about/` and `/about/csr/` | Read the company story and core values, find current credentials, and access CSR information. |
| Contact | `/contact/` | Submit an enquiry, call or email sales, and find verified office and factory details. |

Use **Products, Capabilities, Projects, Resources, About, Contact** in the header. The logo links home and the quote button opens Contact with the enquiry form in view. Keep CSR discoverable from About and the footer. The suggested catalog groups below provide a starting point for buyer-friendly navigation.

| Catalog group | Existing families and proposed product slugs |
| --- | --- |
| Power distribution | PCC / MCC (`pcc-mcc`), Distribution Boards (`distribution-boards`), APFCR Panels (`apfcr-panels`) |
| Motor control | Drawout Panels (`drawout-panels`), Intelligent Motor Control Center (`intelligent-motor-control-center`) |
| Application-specific panels | Solar Panels (`solar-panels`), AHU Panels (`ahu-panels`), Outdoor Panels (`outdoor-panels`), DG Synchronize Panels (`dg-synchronize-panels`) |

## Homepage and visual direction

1. **Header and hero.** Open with a single static hero, the proposed headline “Electrical control panels for industrial projects,” a short description, a wide Samcon panel or assembly-floor photo, and the quote and product actions.
2. **Product families.** Feature a short set of products with real photos and plain-language use cases. Link to the full catalog and product details.
3. **Manufacturing and quality.** Show the processes buyers ask about, supported by shop-floor photos and links to Capabilities and verified credentials.
4. **Featured projects.** Show approved installation photos and concise captions about the application and equipment supplied. Use customer names and logos where Samcon has permission.
5. **Downloads and enquiry.** Link to the current brochure library and close with a quote prompt and verified sales contact details.

Start with a provisional industrial style built around editorial typography, a consistent grid, generous spacing, and sharply cropped product photography. Use neutral surfaces for dense technical content and give the enquiry action the strongest emphasis. Keep product comparison and specs readable on phones with single-column layouts and responsive tables.

The color theme and visual references are pending. When they arrive, map the palette to background, surface, text, border, accent, and focus colors. Apply the reference to the specific layout, typography, image treatment, or interaction it illustrates. Review the homepage and a representative product detail at desktop and mobile widths before applying those decisions across the site. Use the approved Samcon logo and confirm its treatment against the selected palette.

## Build and migration plan

1. **Confirm scope and content.** Confirm the production domain, which Samcon site the redesign will replace, and who controls its DNS and legacy redirects. Collect the approved logo, panel and facility photos, product specs, current PDFs, project copy, and sales contact details. Inventory the legacy URLs and assign each a destination. Verify the currency and scope of certifications, test ratings, and OEM relationships with Samcon before carrying them over.
2. **Set up the site and design system.** The workspace started empty. For a new codebase, the proposed stack is Astro with TypeScript, static pages, structured content collections, and a small server-side enquiry endpoint supported by the selected host. Reuse any established stack supplied for the project. Define shared navigation, footer, button, card, form, and download components. Build the homepage and product detail first to exercise the visual system.
3. **Build and populate the page templates.** Store each product's title, slug, summary, applications, specifications with units, image and alt text, related PDFs, and legacy URL together. Use a shared product detail template. Build the catalog, capabilities, projects, resources, about, CSR, and contact pages. Link product details to relevant projects and downloads where the relationships are confirmed. Give each PDF a clear title and file type, and show its version or date when known.
4. **Connect the enquiry flow.** Product pages pass the product identifier into the Contact form, where visitors can review or change it. Ask for name, company, work email, and requirement. Make phone optional. Validate inputs and field lengths on the server, rate-limit submissions, and keep mail credentials server-side. Preserve inputs after a recoverable failure, show clear field errors, and prevent duplicate delivery on retries using a submission ID. Show success after the agreed delivery service accepts the enquiry. Verify delivery to the approved sales inbox using a test enquiry.
5. **Prepare for search and launch.** Add unique page titles and descriptions, canonical URLs, a sitemap, and share previews. Use responsive image sizes and load below-the-fold images lazily. Check internal links and PDFs. Apply permanent redirects only where hosting access allows. For SME-hosted URLs outside Samcon's control, coordinate redirects or a replacement link with the site operator. Keep a rollback path for any controlled cutover.

### Initial URL mapping

Legacy paths below are relative to `https://www.sme.in/samconicpl/`. Complete the mapping for the remaining menu links and PDFs during the migration inventory.

| Legacy path | Proposed destination |
| --- | --- |
| Directory root and `index.html` | `/` |
| `about.html` | `/about/` |
| `Projects1.html` | `/projects/` |
| `PCC_MCC.html` | `/products/pcc-mcc/` |
| `APFCR_Panel.html` | `/products/apfcr-panels/` |
| `Electrical_Manufacturing.html` | `/capabilities/` |
| `Technical_Specification.html` | `/resources/` |
| `CSR.html` | `/about/csr/` |
| `contact.html` | `/contact/` |
| `pdf/Samcon_TTA_Brochure.pdf` | Equivalent approved PDF URL linked from `/resources/` |
| `pdf/Samcon_LT_TI_BROCHURE.pdf` | Equivalent approved PDF URL linked from `/resources/` |

## Acceptance checks

- [ ] Review the homepage and a product detail with real content at mobile and desktop widths. Check reading order, crop, alignment, table overflow, and quote button visibility.
- [ ] Browse from Home to a catalog category and a product detail. Open the correct brochure and start a quote with the selected product carried through.
- [ ] Test the mobile menu, keyboard navigation, visible focus, readable contrast, descriptive links, form labels, and accessible error and success messages. Check reduced-motion behavior if animation is added.
- [ ] Exercise a valid enquiry, invalid input, a recoverable delivery failure, and a double submission. Confirm one accepted enquiry reaches the approved inbox and failed submissions retain entered text.
- [ ] Confirm the nine catalog entries, CSR, project content, technical downloads, and verified contact details are reachable. Check mapped legacy URLs and staged metadata on the production host where access allows.

## Inputs pending

- Color palette and visual references for the design direction.
- Approved logo, product and facility photos, current brochures and certificates, and project material cleared for publication.
- Confirmed production domain and hosting, access to any legacy redirects, and approved contact details and enquiry recipient.
