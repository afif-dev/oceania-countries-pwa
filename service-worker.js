// Choose a cache name
const cacheName = "oceania-site-v1";
// List the files to precache
const precacheResources = [
  "/",
  "/index.html",
  "/maps.html",
  "/australia.html",
  "/new-zealand.html",
  "/css/uikit.min.css",
  "/css/flags32-both.css",
  "/css/styles.css",
  "/js/uikit.min.js",
  "/js/uikit-icons.min.js",
  "/js/main.js",
  "/data/oceania.json",
  "/data/au.json",
  "/data/nz.json",
  "/img/flags/flags32.png",
  "/img/mp-1.jpg",
  "/img/hs-1.jpg",
  "/img/hs-2.jpg",
  "/img/hs-3.jpg",
  "/img/hs-4.jpg",
  "/img/hs-5.jpg",
  "/img/hs-6.jpg",
  "/img/hs-7.jpg",
  "/img/hs-8.jpg",
];
const now = new Date();

// When the service worker is installing, open the cache and add the precache resources to it
self.addEventListener("install", (event) => {
  console.log("Service worker install event!", now.toUTCString());
  event.waitUntil(caches.open(cacheName).then((cache) => cache.addAll(precacheResources)));
});

self.addEventListener("activate", (event) => {
  // when this SW becomes activated, we claim all the opened clients
  // they can be standalone PWA windows or browser tabs
  event.waitUntil(clients.claim());
  console.log("Service worker activate event!", now.toUTCString());
});

// When there's an incoming fetch request, try and respond with a precached resource, otherwise fall back to the network
self.addEventListener("fetch", (event) => {
  console.log("Fetch intercepted for:", event.request.url);
  // console.log("Service worker fetch event!", now.toUTCString());
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(event.request);
    })
  );
});
