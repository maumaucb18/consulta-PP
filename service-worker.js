const CACHE_NAME = "produtos-perigosos-cache-v1";
const urlsToCache = [
  "./index.html",
  "./main.js",
  "./styles.css",
  "./Relacao_de_Produtos_Perigosos.json",
  "./manifest.json",
  "./icons/icon-192x192.png",
  "./icons/icon-512x512.png"
];

// Instalar Service Worker
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache).catch(err => {
        console.error("Erro ao adicionar ao cache:", err);
      });
    })
  );
});

// Ativar Service Worker
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

// Interceptar Fetch para usar o Cache
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      // Retorna do cache ou faz requisição à rede
      return response || fetch(event.request);
    })
  );
});