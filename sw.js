const CACHE_NAME = "pirate-map-v1";
const ASSETS = [
  "/---/",
  "/---/index.html",
  "/---/map.jpg",
  "/---/lobby.jpeg",
  "/---/1.jpeg",
  "/---/2.jpeg",
  "/---/3.jpeg",
  "/---/4.jpeg",
  "/---/manifest.webmanifest",
  "/---/icon-192.png",
  "/---/icon-512.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.map((k) => (k !== CACHE_NAME ? caches.delete(k) : null)))
    )
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cached) => {
      return cached || fetch(event.request);
    })
  );
});