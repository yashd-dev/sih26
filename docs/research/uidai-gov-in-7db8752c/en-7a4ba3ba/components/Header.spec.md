# Header Specification

## Overview
- **Target file:** `components/sites/uidai-gov-in-7db8752c/en-7a4ba3ba/Header.tsx`
- **Screenshot:** `docs/design-references/uidai-gov-in-7db8752c/en-7a4ba3ba/viewport-top.png`
- **Interaction model:** hover-driven nav, fixed overlay

## Computed Styles
- Header: `position: fixed`, `zIndex: 1300`, `height: 192.047px`, `width: 1434px`, `display: flex`, `flexDirection: column`, `backgroundColor: rgb(255,255,255)`, `boxShadow: rgba(0,0,0,0.08) 0px 2px 4px 0px`.
- Font: Noto Sans/Arial fallback, `fontSize: 16px`, `fontWeight: 400`.
- Top strip: dark navy `#171430`, white text, compact 24px height.
- Logo row: white, logo left, search box right, desktop height about 90px.
- Nav row: pale lavender `#f4f2ff`, pill active Home item.

## Text Content
Skip to Main Content, Screen Reader, English, More, Home, My Aadhaar, About UIDAI, Build with Us, Media, Documents, Help.

## Assets
- Logo: `/sites/uidai-gov-in-7db8752c/en-7a4ba3ba/02-logoWithTitle.svg`
- Menu icons: files 05-11.

## Responsive Behavior
- Desktop: full three-row fixed header.
- Mobile: compact top strip, logo, hamburger, hide search and full nav.
