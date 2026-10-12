# AnRu Teach — Teaching Whiteboard & Slide Annotation (PWA)

## Installation Fixes applied:
1. **Root Icon Placement**: Icons `icon-192.png`, `icon-512.png`, and `favicon.png` are placed directly in the root directory AND in `icons/` folder. This guarantees that uploading files individually on GitHub web or Acode will never miss the icons.
2. **Immediate Service Worker Registration**: Service Worker now registers immediately on app start without relying on `window.onload` race conditions.
3. **Resilient Pre-caching**: `sw.js` caches assets independently so no single network redirect can abort installation.
4. **Android Native Install Button**: Tapping **"Install App"** inside the top bar or welcome card invokes the native Android install prompt directly.
