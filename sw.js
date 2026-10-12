/**
 * AnRu Teach - Service Worker
 * Version: 2.1.0 (GitHub Pages & Android PWA Installation Optimized)
 */

const CACHE_NAME = 'anru-teach-cache-v2.1.0';

const PRECACHE_ASSETS = [
  './',
  'index.html',
  'style.css',
  'app.js',
  'manifest.json',
  'icons/icon-192.png',
  'icons/icon-512.png'
];

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(async (cache) => {
      console.log('[AnRu Teach SW] Pre-caching offline assets...');
      const cachePromises = PRECACHE_ASSETS.map(async (asset) => {
        try {
          const response = await fetch(asset, { cache: 'no-cache' });
          if (response && response.ok) {
            await cache.put(asset, response);
          }
        } catch (err) {
          console.warn('[AnRu Teach SW] Pre-cache fallback for:', asset, err);
        }
      });
      await Promise.allSettled(cachePromises);
      console.log('[AnRu Teach SW] Pre-caching completed.');
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            console.log('[AnRu Teach SW] Removing old cache:', key);
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  // Handle navigation requests
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request).catch(() => {
        return caches.match('index.html') || caches.match('./');
      })
    );
    return;
  }

  // Cache-first strategy with background revalidation
  event.respondWith(
    caches.match(event.request, { ignoreSearch: true }).then((cachedResponse) => {
      if (cachedResponse) {
        fetch(event.request).then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, networkResponse));
          }
        }).catch(() => {});
        return cachedResponse;
      }

      return fetch(event.request).then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200) {
          const responseClone = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, responseClone));
        }
        return networkResponse;
      }).catch(() => {
        if (event.request.destination === 'image') {
          return caches.match('icons/icon-192.png');
        }
      });
    })
  );
});
