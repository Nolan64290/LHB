const CACHE_NAME = 'lasseubehb-cache-v1';
const urlsToCache = [
  '/', // page d'accueil
  '/index.html',
  '/assets/Logo.webp',
  '/assets/instagram.webp',
  '/assets/facebook.webp',
  '/style.css',
  '/style_responsive.css',
  '/script.js'
  // ajoute ici toutes les ressources statiques critiques à mettre en cache au premier chargement
];

// Installation du service worker : on met en cache les fichiers essentiels
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
      .then(() => self.skipWaiting()) // active le SW immédiatement
  );
});

// Activation du service worker : nettoyage des anciens caches si besoin
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames =>
      Promise.all(
        cacheNames.filter(name => name !== CACHE_NAME)
          .map(name => caches.delete(name))
      )
    ).then(() => self.clients.claim())
  );
});

// Fetch network-first (priorité au réseau, fallback cache)
self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request)
      .then(response => {
        // On ne met en cache que les GET
        if (event.request.method === 'GET') {
          return caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, response.clone());
            return response;
          });
        }
        return response;
      })
      .catch(() => caches.match(event.request))
  );
});
