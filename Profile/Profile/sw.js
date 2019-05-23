let currentCache = "profile-v1";
let itemsToCache = [
  "./index.html",
  "./css/ProfileStyle.css",
  "./image/face.jpg",
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(currentCache).then(cache => {
      return cache.addAll(itemsToCache);
    })
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.filter(!currentCache)
        .map(cacheNames => caches.delete(cacheNames))
      )}
    )
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.open(currentCache).then(cache => {
      return cache.match(event.request).then(response => {
        return response || fetch(event.request).then(response => {
          cache.put(event.request, response.clone())
          return response;
        })
      })
    })
  );
});