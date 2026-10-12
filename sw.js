/**
 * AnRu Teach - Service Worker
 * Version: 1.0.0
 * Provides offline caching and PWA installation support for Android and mobile browsers.
 */

const CACHE_NAME = 'anru-teach-cache-v1.0.0';

// Core static assets required for full offline operation
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './style.css',
  './app.js',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon.svg'
];

// Install Event: Pre-cache all essential application shell assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[AnRu Teach SW] Caching app shell assets');
      return cache.addAll(ASSETS_TO_CACHE);
    }).then(() => {
      // Activate immediately without waiting for existing clients to close
      return self.skipWaiting();
    })
  );
});

// Activate Event: Clean up legacy caches from previous versions
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('[AnRu Teach SW] Deleting obsolete cache:', cache);
            return caches.delete(cache);
          }
        })
      );
    }).then(() => {
      // Take control of all pages immediately
      return self.clients.claim();
    })
  );
});

// Fetch Event: Cache-First strategy with fallback to Network
self.addEventListener('fetch', (event) => {
  // Only handle GET requests (skip chrome extensions or non-http requests)
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }

      // If not in cache, fetch from network and dynamically cache
      return fetch(event.request).then((networkResponse) => {
        // Check if response is valid
        if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
          return networkResponse;
        }

        const responseToCache = networkResponse.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseToCache);
        });

        return networkResponse;
      }).catch(() => {
        // Offline fallback for HTML requests
        if (event.request.headers.get('accept')?.includes('text/html')) {
          return caches.match('./index.html');
        }
      });
    })
  );
});
