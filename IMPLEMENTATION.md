# Samcon website redesign implementation plan

## Goal

Help procurement teams, electrical consultants, and project engineers find the right control panel, verify Samcon's capabilities, and submit a project enquiry. The primary action is **Request a quote**. **Explore products** and **Download brochure** support visitors who are still evaluating suppliers.

The first local implementation uses dependency-free Node.js static rendering with shared templates and structured product data. The package registry was unavailable in this workspace. Connect the delivery endpoint after the sales workflow and hosting are confirmed.

## Current site audit

- The legacy homepage leads with rotating banners and a company introduction. Product families sit inside a dropdown, while projects, credentials, and downloads are spread across the navigation and homepage. Give the product catalog its own landing page and use the homepage to guide buyers from relevant products to proof and an enquiry. [Legacy Samcon homepage](https://www.sme.in/samconicpl/)
- The product menu lists nine families. The legacy APFCR page has a PCC/MCC heading, and the standalone site provides the correct product context. Check each migrated heading and specification against the approved product data. [Legacy product menu](https://www.sme.in/samconicpl/) · [Legacy APFCR page](https://www.sme.in/samconicpl/APFCR_Panel.html) · [Samcon APFCR page](https://samconcontrolpanel.com/apfcr-panel.php)
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

## Art direction

Use the white industrial editorial reference (image 3) for oversized type, asymmetrical image-and-copy layouts, generous whitespace, and disciplined grids. Use the dark technical detail reference (image 4) for thin rules, compact specification labels, and an engineering-style product view. Translate those choices to Samcon's cabinet hardware. Keep the technical canvas contained inside the white page and give product imagery room to show enclosure seams, locks, meters, and feeder compartments. Use the approved Samcon logo.

The later skh.design reference sets the structure for the implemented layout. Thin rules align the header, image captions, product index and workshop spread. The desktop header pairs the local SVG redraw with a separate company descriptor and a blue quote action. The logo follows the stripe, lettering and blue block arrangement documented in the [Samcon brochure](https://www.sme.in/samconicpl/pdf/Samcon_TTA_Brochure.pdf). The redraw and selected colors await comparison with original vector artwork.

### Color and contrast

The four swatches below were sampled from the supplied palette (image 2). Apply **70 / 20 / 10** as an approximate balance of visible interface surfaces. Photography and technical media have their own tonal range.

| Share | Color | Use |
| --- | --- | --- |
| 70% | Warm white `#FCFBF8` and white `#FFFFFF` | Page canvas, header, product lists and open reading areas. |
| 20% | Pale blue `#F1F6FF` and `#EDF2FC` | Image controls, grouped specifications, filters and the enquiry section. |
| 10% | Signal red `#BF202B` and royal blue `#1B4EF5` | Use the logo?s red for emphasis and cobalt for primary actions, category navigation, selection and focus. Navy grounds the homepage introduction and enquiry section. |

- Use `#191A19` for text, `#555856` for secondary copy, `#657693` for essential control borders, and `#951722` for red button hovers. Inside a technical preview, use a near-black `#151922` canvas and light `#D5DDEF` labels.
- White on `#1B4EF5` has **6.08:1** contrast. White on `#3874FF` and `#5996FF` has **4.11:1** and **2.90:1**, respectively. Use those two fills for accents and keep normal text on tested combinations. Dark text `#111827` on `#5996FF` has **6.11:1**. Use an underline, visible focus outline, or state label wherever a color change carries meaning. [WCAG text contrast](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html) · [WCAG non-text contrast](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html)

### Typography

| Typeface | Research and decision |
| --- | --- |
| **Inter Variable** | Selected for headings, navigation, body copy, and form controls. Its display optical sizes provide the editorial heading rhythm in the references. The text optical sizes prioritize small-size legibility for dense product copy. [Inter specimen and license](https://rsms.me/inter/) |
| **IBM Plex Mono Regular** | Selected for short product identifiers, units, labels, and numerical specification values. Use sentence case and Inter for long labels or explanations. [IBM Plex source and license](https://github.com/IBM/plex) |
| **Space Grotesk** | Considered for display type because of its distinctive grotesk forms and features for technical figures. Inter gives the site a quieter heading voice and covers body and display with one shared font family. [Space Grotesk specimen](https://floriankarsten.github.io/space-grotesk/) |
| **Manrope** | Considered for its clean geometric construction. It would give the site a rounder feel than the two references. [Manrope upstream description](https://github.com/google/fonts/blob/main/ofl/manrope/DESCRIPTION.en_us.html) |

Set the desktop hero to roughly 64–80 px at 600–650 weight and mobile to 36–48 px. Use 36–48 px for desktop section titles, 26–34 px on mobile, 16–18 px body, and 13–14 px for short technical labels. Keep paragraphs around 60–70 characters per line. Self-host WOFF2 with the license notices, retain engineering and punctuation glyphs when subsetting, and use system sans and mono fallbacks.

### Page compositions

- **Home.** Pair the headline with a full-bleed copper busbar detail in a 55/45 split. Visitors can use the image controls to inspect two more generated studies, a withdrawable feeder and a folded steel enclosure. Present the nine products in a ruled index, followed by fabrication, applications and the enquiry action. Label generated images as studies.
- **Catalog.** Give every product an illustrated card within its group. On each product detail page offer a grouped directory and previous and next links above the overview. Each row links to a product detail. An individual product page shows Samcon's corresponding photograph when available and a labelled local concept as its fallback. [Samcon product gallery](https://www.samconcontrolpanel.com/gallery-control-panels.php)
- **Product detail.** Open with the product name, summary, quote action, gallery, and a compact summary of approved key specs. Follow with applications, options, a full specification list or table, related brochure, and relevant projects. Where source material supports it, add a contained dark technical view with a line drawing or orthographic render. Place the dimensions and labels in accessible page content next to the image.
- **Capabilities, projects, and resources.** Alternate clear text columns with wide facility and installation photographs. Give projects an application, supplied equipment, and verified scope. Group resources by document type and show the version or date next to the download link when available.
- **Responsive layout.** Align sections to common outer rules up to 1,536 px wide. On narrow phones, stack the introduction, image, controls and product index in reading order. Give the image controls at least 44 px of touch space. Review at 320 px, 390 px, 768 px and 1,440 px.

### Subtle motion

| Trigger | Motion | Settled state and reduced-motion behavior |
| --- | --- | --- |
| Initial hero render | Keep the headline and quote action visible from first paint. A short 250–350 ms fade on already-loaded media is optional. | The image has a reserved aspect ratio and remains still. Show it immediately with reduced motion. |
| Scroll through hero and desktop product index | Translate the cropped hero image up to 36 px. Keep the index illustration pinned beside its product groups and crossfade when the next group reaches mid-screen. | With reduced motion, keep the hero still and switch index images immediately. Stack the illustration above the list on phones. |
| Visitors select a material study | The previous and next buttons cycle through the three studies. Crossfade the image and update the visible caption and slide count. | Keyboard and touch activate the same buttons. The caption announces each selection and the reduced-motion view switches immediately. |
| Selected below-the-fold sections enter view | One 300–450 ms eased reveal with an 8–12 px rise on supporting media. | Once visible, the media stays in place. Reduced-motion and script-free views show the content immediately. |
| Mobile menu and product image view change | Open or close in about 180–220 ms. Swap already loaded views with a brief crossfade. | Menu focus follows the open state and returns on close. Reduced-motion changes are immediate. |

Keep scrolling native and equipment still by default. Use short, user-controlled changes to communicate interaction state and keep content and navigation usable with `prefers-reduced-motion`. [W3C animation guidance](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions)

## Product research and generated imagery

Nine original 4:3 PNG concept renders are saved in `references/product-concepts/`. The set uses a cool-white studio, satin powder-coated steel, soft grounded shadows, and a distinct configuration for each family. Use these for layout review and crop trials. For the public catalog, use approved photographs or Samcon-reviewed renders where buyers need to identify a particular build. If an AI concept is retained as general marketing illustration, label it as an illustration.

| Family | Buyer purpose and visual direction | Concept | Manufacturer reference |
| --- | --- | --- | --- |
| PCC / MCC | Use the shared page to explain power distribution and motor control separately. Lead with a floor-standing multi-bay lineup, then show the main incoming cabinet and segmented motor feeder sections. | [PCC / MCC](references/product-concepts/pcc-mcc.png) | [PCC / MCC](https://samconcontrolpanel.com/pcc-mcc.php) |
| Distribution Boards | Show enclosed downstream power distribution for outgoing circuits. Use a compact cubicle with feeder doors and a separate cable compartment. | [Distribution Boards](references/product-concepts/distribution-boards.png) | [Distribution Boards](https://samconcontrolpanel.com/distribution-board.php) |
| APFCR Panels | Explain automatic power factor correction and the contactor or thyristor options Samcon documents. Show a ventilated cabinet and organized capacitor bank as the visual identifier. | [APFCR Panels](references/product-concepts/apfcr-panels.png) | [APFCR Panels](https://samconcontrolpanel.com/apfcr-panel.php) |
| Drawout Panels | Explain withdrawable feeder modules and maintenance access. Show one tray partly withdrawn beside the visible stack of closed modules. | [Drawout Panels](references/product-concepts/drawout-panels.png) | [Drawout Panels](https://samconcontrolpanel.com/drawout-panels.php) |
| Solar Panels | Use “Solar distribution panels” as the display label and retain the catalog route. Explain solar PV AC and DC distribution boxes. Show the two enclosure types and a clear cabinet detail. | [Solar Panels](references/product-concepts/solar-panels.png) | [Solar ACDB and DCDB](https://samconcontrolpanel.com/solar-panel.php) |
| AHU Panels | Explain air handling unit fan and HVAC interlock controls, with drive or BMS options where verified. Show the compact controls enclosure and its operator interface. | [AHU Panels](references/product-concepts/ahu-panels.png) | [AHU Panels](https://samconcontrolpanel.com/ahu-panel.php) |
| Outdoor Panels | Show what changes in a configuration intended for outdoor installation. Use a sheltered enclosure silhouette with canopy, closed doors, and a plinth. Confirm enclosure and ingress-protection specifications per model. | [Outdoor Panels](references/product-concepts/outdoor-panels.png) | [Samcon gallery with outdoor cabinets](https://www.samconcontrolpanel.com/gallery-control-panels.php) |
| Intelligent Motor Control Center | Explain motor protection, operating data, and diagnostics. Show an operator interface over modular control sections as an illustration of monitoring. | [Intelligent MCC](references/product-concepts/intelligent-motor-control-center.png) | [Intelligent MCC](https://samconcontrolpanel.com/intelligent-mcc-panel.php) |
| DG Synchronize Panels | Explain paralleling and sharing load across diesel generator sets. Show a control lineup with paired controller and metering areas. | [DG Synchronize Panels](references/product-concepts/dg-synchronize-panels.png) | [DG Synchronize Panels](https://www.samconcontrolpanel.com/DG-synchronize-panel.php) |

For each family collect a signed-off summary, applications, configuration options, product photos, relevant drawings or PDF, and catalogue terminology. Have Samcon verify variant-level ratings, compartment forms, dimensions, cable entry, protection, and applicable standards from current supporting documents. Preserve units and qualifiers. Use approved exterior product photos as the default and an authorized interior photo or drawing where it explains a key difference. For hero art, the PCC/MCC concept establishes the angle and crop. Use a photographed or CAD-rendered production flagship at 2,400 px or greater on the long edge when available.

### High-definition 3D option

Pilot one PCC/MCC lineup. Start from a Samcon-approved STEP/CAD file or dimensioned drawings and multi-angle photos for the exact configuration. Build or clean a high-detail master with accurate silhouette, hinge and door components, cabinet gaps, material finishes, and realistic lighting. Simplify hidden vendor details and share only geometry cleared for the website. Review front, side, and three-quarter stills against the source with Samcon before exporting.

Render a white studio still and a dark background line or orthographic view from the same geometry. Use the still as the product gallery poster. If the optimized GLB performs well, load it after an explicit **View in 3D** action. Scope the pilot to orbit, zoom, and reset with keyboard operation, a static fallback, and no auto-rotation. Test on a mid-range phone and keep the still if the viewer delays access to specifications or enquiries. The nine supplied concept PNGs are raster images. The interactive geometry stage awaits source material. [Khronos glTF](https://www.khronos.org/gltf/) · [Model Viewer](https://modelviewer.dev/)

## Build and migration plan

1. **Review the visual direction and inventory.** Walk through the home and PCC/MCC compositions for desktop and mobile. Confirm which Samcon site will be replaced, the production domain, and who controls DNS and legacy redirects. Gather the approved logo, panel and facility photos, product specs, current PDFs, project copy, and sales details. Inventory legacy URLs and verify the currency and scope of certifications, test ratings, and OEM relationships.
2. **Build the design system and two priority pages.** Generate static pages from shared templates and structured product data. Set up shared navigation, footer, buttons, image wells, cards, spec tables, form controls, and download links. Use the homepage and PCC/MCC detail to check the color balance, type, responsive layout, and motion before applying the system across the catalog. Astro remains an option if future requirements call for a framework with typed content collections and server endpoints. [Astro content collections](https://docs.astro.build/en/guides/content-collections/) · [Astro endpoints](https://docs.astro.build/en/guides/endpoints/)
3. **Migrate content and optimize media.** Store each product's title, slug, summary, applications, verified spec values and units, related PDFs, source references, image rights, image and alt text, and legacy URL together. Build the catalog, capabilities, projects, resources, about, CSR, and contact pages. Deliver responsive AVIF or WebP derivatives, reserve image dimensions, prioritize the hero image, and lazy-load supporting media. Start with transfer budgets of about 350 KB for the desktop hero and 140 KB per card at typical display size, then tune against visual quality and measured performance.
4. **Connect the enquiry flow.** Product pages pass the product identifier into the Contact form, where visitors can review or change it. Ask for name, company, work email, and requirement. Make phone optional. Validate inputs and field lengths on the server, rate-limit submissions, and keep mail credentials server-side. Preserve inputs after a recoverable failure, show clear field errors, and prevent duplicate delivery on retries using a submission ID. Show success after the agreed delivery service accepts the enquiry. Verify delivery to the approved sales inbox using a test enquiry.
5. **Prepare for search and launch.** Add unique page titles and descriptions, canonical URLs, a sitemap, and share previews. Check internal links and current PDFs. Apply permanent redirects where hosting access allows. Coordinate redirects or a replacement link with the operator for externally hosted URLs. Keep a rollback path for a controlled cutover. Check mobile performance before release and monitor LCP, INP, and CLS against the Core Web Vitals targets after representative field data becomes available. [Core Web Vitals](https://web.dev/articles/vitals)

### Initial URL mapping

Legacy paths below are relative to `https://www.sme.in/samconicpl/`. Complete the mapping for the remaining menu links and PDFs during the migration inventory.

| Legacy path | Proposed destination |
| --- | --- |
| Directory root and `index.html` | `/` |
| `about.html` | `/about/` |
| `Core_Values.html` | `/about/#core-values` |
| `Projects1.html` | `/projects/` |
| `PCC_MCC.html` | `/products/pcc-mcc/` |
| `Distribution_Boards.html` | `/products/distribution-boards/` |
| `APFCR_Panel.html` | `/products/apfcr-panels/` |
| `Drawout_Panels.html` | `/products/drawout-panels/` |
| `Solar_Panels.html` | `/products/solar-panels/` |
| `AHU_Panels.html` | `/products/ahu-panels/` |
| `Outdoor_Panels.html` | `/products/outdoor-panels/` |
| `Intelligent_Motor_Control_Center.html` | `/products/intelligent-motor-control-center/` |
| `DG_Synchronize_Panels.html` | `/products/dg-synchronize-panels/` |
| `CNC_Sheet_Metal_Shop.html`, `Electronic_Shop.html`, `Our_Strength.html` | `/capabilities/` |
| `Electrical_Manufacturing.html` | `/capabilities/` |
| `Testing_Equipments.html` | `/capabilities/#testing` |
| `Maintenance_Manual.html`, `Technical_Specification.html` | `/resources/` |
| `pdf/Quality.pdf` | Equivalent approved quality document linked from `/capabilities/` |
| `CSR.html` | `/about/csr/` |
| `contact.html` | `/contact/` |
| `pdf/Samcon_TTA_Brochure.pdf` | Equivalent approved PDF URL linked from `/resources/` |
| `pdf/Samcon_LT_TI_BROCHURE.pdf` | Equivalent approved PDF URL linked from `/resources/` |

## Acceptance checks

- [ ] Review the homepage, catalog, and PCC/MCC detail at 390 px, 768 px, and 1,440 px. Check the white-led 70 / 20 / 10 balance, type hierarchy, image crop, reading order, and visibility of the quote action. Confirm that no page content is clipped on a narrow phone.
- [ ] Review all nine product images and verify each configuration shown, its labels, its crop, and its relationship to the text. Confirm the image rights and approved product specifications before publication.
- [ ] Browse from Home to a catalog category and a product detail. Open the correct brochure and start a quote with the selected product carried through.
- [ ] Test the mobile menu, keyboard navigation, visible focus, contrast, descriptive links, form labels, and accessible error and success messages. Exercise the reduced-motion setting and confirm that content is visible with animations disabled.
- [ ] Exercise a valid enquiry, invalid input, a recoverable delivery failure, and a double submission. Confirm one accepted enquiry reaches the approved inbox and failed submissions retain entered text.
- [ ] Confirm the nine catalog entries, CSR, project content, technical downloads, and verified contact details are reachable. Check mapped legacy URLs and staged metadata on the production host where access allows.
- [ ] If including the 3D pilot, verify that its poster, controls, and static fallback work on mobile and with keyboard interaction. Measure impact on product page load and keep specs and the quote action available immediately.

## Inputs pending

- Approved logo, product and facility photos, current brochures and certificates, and project material cleared for publication. Confirm whether each concept can be replaced with a photo or reviewed for illustrative use.
- Confirmed production domain and hosting, access to any legacy redirects, and approved contact details and enquiry recipient.
- Approved PCC/MCC CAD or dimensioned drawings and multi-angle photos if the optional 3D pilot goes ahead.

## Image generation prompts

The built-in ImageGen tool generated the nine drafts, with a refinement pass for four of them.

<details>
<summary>Studio prompt and product briefs</summary>

Use case: product-mockup. Generate one original high-definition photorealistic 3D-rendered industrial electrical cabinet concept for the Samcon website planning deck. Art direction is precise, quiet engineering and luxury industrial catalog photography. Cool satin powder-coated light gray steel, flush seams, realistically scaled hinges and lock hardware, subtle shadows, cool gray details, clean seamless paper-white to pale cool gray studio, no scenery. Lens is orthographic-like or a mild 65 mm perspective, three-quarter front view showing the front and right side, all cabinet edges within frame. Crisp, high-detail textures and reflections, no distortion or sci-fi styling, minimal hints of royal blue on indicators only where plausible. Make this visibly manufacturer-agnostic. No logos, typography, legible labels, watermark, humans, industrial robots, sparks, or arbitrary holographic overlays. Equipment is de-energized.

- **pcc-mcc**. Primary request: flagship hero and catalog concept for a low-voltage Power Control Centre / Motor Control Centre lineup with four attached floor-standing switchgear bays on a dark shallow plinth. Put two taller full-height incoming cabinet fronts at the left with one restrained compact meter and breaker-handle area, and stacked modular motor feeder compartments and one narrow vertical cable space on the right. Repeated panel seams, compact handles and understated indicator hardware. Wide landscape composition, large coherent precise assembly, reserve only a little breathing room around it for a 4:3 crop.
- **distribution-boards**. Primary request: low-voltage enclosed cubicle distribution board, two compact adjoining floor-standing shallow sheet-steel enclosures, with a clean series of feeder access doors and a narrow adjacent side cable compartment. Make the visual hierarchy straightforward and clearly smaller and shallower than a multi-bay motor control lineup. Doors are closed, with small recessed handles and no prominent HMI. Landscape 4:3 catalog framing.
- **apfcr-panels**. Primary request: automatic power factor correction relay panel concept, single broad industrial cabinet with one hinged door open on a plausible side and a closed narrow companion section. Show several clearly visible identical cylindrical capacitor cans in two organized bottom rows, contained rectangular switching sections above, and believable ventilation grilles. Interior screened parts and nearly no exposed wiring. Make the capacitor bank the focal point. Landscape 4:3 catalog framing.
- **drawout-panels**. Primary request: withdrawable low-voltage motor control switchgear. Show a slim two-bay floor-standing metal assembly with repeated modular drawer fronts, plausible flush locks and indicator apertures, with exactly one upper-middle feeder drawer pulled roughly one third out on straight captive guides. The visible drawer is a simple de-energized steel cassette with a molded dark switch module. All other drawers remain flush. Keep the product silhouette intact and the withdrawn module readable. Landscape 4:3 catalog framing.
- **solar-panels**. Primary request: a pair of compact enclosed electrical distribution/control boxes for a solar PV installation, a small indoor AC distribution box and adjacent larger DC distribution box on a clean cool-white product photography backdrop. One small enclosure closed with a plain dark isolator handle, one door ajar revealing a touch-safe bank of compact breakers and surge protection modules with very little exposed wiring. Make these unmistakably electrical enclosures, no photovoltaic modules, no glass, no glowing energy symbols. Landscape 4:3 catalog framing.
- **ahu-panels**. Primary request: an HVAC air-handling unit control panel, a single compact wall-mount style powder-coated metal enclosure on a minimal studio mount. On its closed front, show a small unbranded drive/control interface and sparingly used fan-control status buttons, with restrained ventilation details. Depict a recognizable control cabinet alone, with no air vents resembling an air conditioner and no HVAC ductwork or rotating machinery. Landscape 4:3 catalog framing.
- **outdoor-panels**. Primary request: an outdoor-use industrial electrical control cabinet, a two-door freestanding coated steel enclosure with believable deep rain canopy, overhanging drip lip, closed weather-sealed doors and a raised dark steel plinth. Minimal exterior hardware, no monitor or uncovered apertures, differentiated from indoor cabinets by canopy and construction. Cool-white product studio, no rain effects. Landscape 4:3 catalog framing.
- **intelligent-motor-control-center**. Primary request: intelligent motor control centre cabinet, a refined two-bay industrial motor starter line-up. On the upper half of one tall main door include one small recessed industrial operator screen showing dim abstract unlabeled status indicators, above neatly repeated modular starter compartment fronts. An adjacent slim bay has clean flush panels. Keep it convincing as precision industrial equipment, no consumer touch screens or glow. Landscape 4:3 catalog framing.
- **dg-synchronize-panels**. Primary request: diesel-generator synchronizing panel lineup as an industrial control cabinet concept. Two broad floor-standing power and controller sections, with two aligned compact synchronizing controller modules on the closed front to suggest two generator sets, restrained rows of metering and breaker controls, and broad modest closed lower doors. Show the electrical cabinets alone. No generator engine, cables on the floor, screen text, or company marks. Landscape 4:3 catalog framing.

**Refinement prompts**

- **drawout-panels**. Retouch the supplied 4:3 industrial catalogue render. Preserve the exact cabinet and inserted subject, every drawer arrangement and the one projecting steel cassette, cabinet silhouette, studio light, scale, camera, image margins and high detail. Remove all legible lettering and all alphanumeric or voltage markings from the header and drawer fronts by replacing printed text with clean unmarked material. Keep blue stripe and actual seams, knobs, and warning-color button hardware. No product labels, values, or logos. Match the light gray metal and studio neutral balance of the original.
- **solar-panels**. Retouch the supplied 4:3 industrial catalogue render of two PV electrical distribution enclosures. Keep both enclosures, handle, opened door, inner hardware, electrical safety icons, high-definition material, studio lighting, margins and framing. Remove all alphanumeric characters and legible text, including the brandlike door plaques, printed values, breaker data on hardware and warning paragraphs. Replace plaques with blank muted surfaces, preserve original material shadows, leave generic geometric safety icons alone where physically plausible. No ratings or fake certification markings. Make no other scene changes.
- **ahu-panels**. Retouch the supplied 4:3 industrial catalogue render of one small metal air-handling-unit electrical control enclosure. Preserve the enclosure, realistic wall-mount tabs, black bezel, buttons, camera angle, exact margins, neutral gray studio lighting and photographic texture. Remove all words, numbers and legible lettering from the front plate, interface, and fan status controls. Replace digits with a dim plain interface and use blank clean metal for printed plaques; leave physical controls and button colors alone. No logos or ratings. Make no other composition changes.
- **intelligent-motor-control-center**. Retouch the supplied industrial catalogue concept of a two-bay enclosed intelligent motor control cabinet. Preserve the cabinet silhouette and the important small operator screen over modular compartments. Replace the visible factory with a clean, seamless pale cool-white studio floor and background with a soft grounded shadow. Give the isolated catalog product a very slight three-quarter view, high-definition cool light gray matte powder-coated metal, and clear even margins on all four edges in 4:3 framing. Make screen artwork abstract, remove any legible numbers or letters, no scenery, logo, readable text, or new controls.

</details>
