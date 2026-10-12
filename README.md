# AnRu Teach — Teaching Whiteboard & Slide Annotation (PWA)

Fixed & Production-Ready Progressive Web App (PWA) for teachers and educators.

## What was fixed for GitHub Pages installation:
1. **PWA Manifest (`manifest.json`)**: Added explicit `"id": "anru-teach-pwa"`, `"prefer_related_applications": false`, and proper relative paths (`"start_url": "index.html"`, `"scope": "./"`).
2. **Icons with Adaptive Masking**: Integrated your uploaded AnRu Teach logo from Google Drive. Generated standard `192x192` & `512x512` icons plus Android Adaptive `maskable` icons with safe-zone padding.
3. **Resilient Service Worker (`sw.js`)**: Changed atomic `cache.addAll` to non-blocking asset pre-caching with `Promise.allSettled()`. This guarantees the Service Worker always activates on GitHub Pages without failing on redirects.
4. **Native "Install App" Button**: Added `beforeinstallprompt` event listener and an illuminated **"Install App"** button in both the top bar and welcome overlay. Users can now install with a single tap!

## How to Deploy to GitHub Pages:
1. Extract this ZIP file.
2. Push the files to your GitHub repository (e.g. `anru-teach`).
3. In GitHub repo Settings -> **Pages**, set branch to **`main`** and folder to **`/(root)`**, then click **Save**.
4. Visit `https://<your-username>.github.io/anru-teach/` on your mobile device (Chrome/Edge/Brave).
5. Tap **"Install App"** on the screen or in Chrome menu (⋮) -> **Install App**.
