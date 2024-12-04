const CACHE_NAME = "produtos-perigosos-cache-v1";
const urlsToCache = [
  "./index.html",
  "./script.js",
  "./style.css",
  "./manifest.json",
  "./icons/icon-192x192.png",
  "./icons/icon-512x512.png"
];

// Instalar o Service Worker e adicionar arquivos ao cache
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log("Arquivos em cache adicionados.");
      return cache.addAll(urlsToCache);
    })
  );
});

// Ativar o Service Worker e remover caches antigos
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(cacheNames =>
      Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log("Cache antigo removido:", cacheName);
            return caches.delete(cacheName);
          }
        })
      )
    )
  );
});

// Interceptar requisições e retornar do cache (offline)
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
