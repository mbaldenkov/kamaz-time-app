// Обновляем версию кэша при внесении изменений, чтобы сервис‑воркер загружал новый index.html
// Increment the cache version to ensure clients fetch the latest files.
const CACHE_NAME = 'kamaz-time-app-cache-v5';
const urlsToCache = [
  './index.html',
  './manifest.json',
  './',
  'https://cdn.jsdelivr.net/npm/papaparse@5.4.1/papaparse.min.js',
  'https://cdn.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});