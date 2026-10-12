# AnRu Teach — Mobile Teaching Whiteboard & Slide Annotation Web App

**AnRu Teach** is a lightweight, mobile-optimized, standalone Progressive Web App (PWA) designed for teachers, educators, and content creators. It enables real-time drawing and annotation on slides exported from Canva (PNG/JPG) or on a clean blackboard whiteboard.

## Features
- **Modern Dark Glassmorphism Theme**: Sleek `#121212` background, smooth blur effects, and vibrant neon accents (Blue `#00e5ff`, Purple `#b388ff`, Red `#ff334b`, Green `#00e676`).
- **Canva Slide Backgrounds**: Upload multiple PNG/JPG slides at once. Slides fit automatically to 16:9 or custom aspect ratios.
- **Slide Navigation**: Floating Next & Previous controls with current slide indicator. Annotations are saved per slide so switching slides never loses your notes!
- **Interactive Dual-Canvas**: Background slide and annotation layer are decoupled. Erasing drawings will **never** damage the slide background.
- **Fluid Stylus & Touch Support**: Built with Pointer Events and quadratic bezier smoothing for natural handwriting.
- **Teacher's Dockable Toolbar**:
  - Pen Tool (Neon Red, Blue, Green)
  - Highlighter Tool (Translucent Yellow)
  - Pen Thickness Presets & Fine-tuning Slider (2px - 48px)
  - Eraser Tool
  - Clear Current Slide
  - Dock switcher (Bottom Dock <-> Left Side Dock for landscape tablet use)
  - Toolbar Collapse handle
  - Fullscreen Mode Toggle
  - Export Annotated Slide to PNG
  - Multi-level Undo & Redo (Ctrl+Z supported)
- **PWA & Offline Ready**: Service worker caches all core files. Installable on Android (Chrome/Edge/Brave) and iOS (Safari Add to Home Screen).

---

## File Structure
```
anru-teach/
├── index.html       # HTML5 structure & UI elements
├── style.css        # Dark glassmorphic stylesheet & responsive rules
├── app.js           # Slide deck manager & canvas annotation engine
├── manifest.json    # PWA configuration (landscape, standalone)
├── sw.js            # Offline service worker cache
├── README.md        # Documentation & deployment guide
└── icons/
    ├── icon.svg     # Vector icon
    ├── icon-192.png # 192x192 PNG PWA icon
    └── icon-512.png # 512x512 PNG PWA icon
```

---

## How to use with Acode on Android
1. Extract `AnRu-Teach.zip` on your Android device.
2. Open **Acode** app and select **Open Folder**.
3. Choose the extracted `anru-teach` folder.
4. You can preview the app directly in Acode using the built-in browser / live server.
5. Push to GitHub using Git in Termux or upload directly via GitHub mobile / web.

---

## Deploying to GitHub Pages
1. Create a new public repository on GitHub named `anru-teach`.
2. Upload all files from this folder directly into the repository root (`main` or `master` branch).
3. Go to **Repository Settings** > **Pages**.
4. Under **Branch**, select `main` and root (`/`), then click **Save**.
5. Your app will be live at `https://<your-username>.github.io/anru-teach/`.
6. Open the link on your Android phone/tablet in Chrome, tap the 3 dots menu, and select **Install App** or **Add to Home Screen**!
