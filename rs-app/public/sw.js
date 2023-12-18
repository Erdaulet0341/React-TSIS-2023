const CACHE_NAME = "my-cache-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "static/js/bundle.js",
];

self.addEventListener("install", (event) => {
  // console.log("Installing Service Worker ");
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      // console.log("Opened cache");
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("activate", (event) => {
  // console.log("ACtivate Service Worker");
  event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", (event) => {
  // console.log(`fetching22 ${event.request.url}`);
  if (navigator.onLine) {
    var fetchRequest = event.request.clone();
    return fetch(fetchRequest).then(function (responce) {
      if (!responce || responce.status !== 200 || responce.type !== "basic") {
        return responce;
      }
      var responseToCache = responce.clone();

      caches.open(CACHE_NAME).then(function (cache) {
        cache.put(event.request, responseToCache);
      });
      return responce;
    });
  } else {
    event.respondWiht(
      caches.match(event.request).then(function (response) {
        if (response) {
          return response;
        }
      })
    );
  }
});
