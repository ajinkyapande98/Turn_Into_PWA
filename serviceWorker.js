/* eslint-disable no-restricted-globals */
// serviceWorker.js

// Define the cache name and version
const cacheName = "my-pwa-app-v1";

// Define the files to cache
const filesToCache = [
  "/",
  "/index.html",
  "/manifest.json",
  "/favicon.ico",
  "/logo192.png",
  "/logo512.png",
  "/app.js",
  "/styles.css",
];

// Install the service worker and cache the files
self.addEventListener("install", (event) => {
  console.log("Service worker installing...");
  event.waitUntil(
    caches.open(cacheName).then((cache) => {
      return cache.addAll(filesToCache);
    })
  );
});

// Fetch the cached files when offline
self.addEventListener("fetch", (event) => {
  console.log("Fetching:", event.request.url);
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

// Remove old caches when a new version is activated
self.addEventListener("activate", (event) => {
  console.log("Service worker activating...");
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((name) => {
          if (name !== cacheName) {
            return caches.delete(name);
          }
        })
      );
    })
  );
});
