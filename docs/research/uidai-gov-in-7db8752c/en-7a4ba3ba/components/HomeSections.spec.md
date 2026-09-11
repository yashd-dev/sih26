# Home Sections Specification

## Overview
- **Target file:** `components/sites/uidai-gov-in-7db8752c/en-7a4ba3ba/HomeSections.tsx`
- **Screenshot:** `docs/design-references/uidai-gov-in-7db8752c/en-7a4ba3ba/desktop-fullpage.png`
- **Interaction model:** mostly static; hover-driven cards/buttons; FAQ visual state.

## Computed Styles
- Main container: `width: 1196px`, `display: flex`, `flexDirection: column`, `alignItems: center`, source starts at y=208 below fixed header.
- Body font: Noto Sans/Arial, `16px`, primary text `rgb(0,0,0)`, headings use Noto Serif/Georgia feel.
- Rounded panels: `borderRadius: 16px`, pale lavender `#f4f2ff` or mint `#eafff6`, subtle borders `#efeef8`.
- Footer computed: `padding: 48px 128px`, `borderRadius: 16px`, `border: 1px solid rgb(239,238,248)`.

## Assets
- Hero visible banner: `15-banner-1_0.webp`; other carousel states `12`, `13`, `14`, `16`, `17`.
- Service icons: `22`, `24`, `25`, `26`, arrow `23`.
- App/QR: `28`, `29`, `30`.
- About image: `31`.
- Work CTA background: `54`; Build CTA background: `55`.
- Video thumbnails: `38`, `40`, `41`; play icon `39`.
- Footer background/logo/social/contact assets: `42`, `43`, `44-51`, `56`.

## Text Content
Use verbatim visible source text from `EXTRACTION.json`: Aadhaar services, About UIDAI paragraph, Updates, dashboard metrics, Work At UIDAI, ecosystem cards, Have Doubts videos/FAQ, footer link columns and contact details.

## Responsive Behavior
- Desktop: centered max width ~1200px, grids of 4/3 columns.
- Tablet: two-column cards.
- Mobile: all sections stack to one column; horizontal hero side peeks removed; footer columns stack.
