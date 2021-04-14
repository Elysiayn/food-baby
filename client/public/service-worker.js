const CACHE_NAME = 'my-site-cache-v2';
const DATA_CACHE_NAME = 'data-cache-v2';
const FILES_TO_CACHE = [
  '/',
  'client/public/index.html',
  'client/public/favicon.ico',
  'client/public/manifest.json',
  'client/public/app.js',
  'client/src/App.css',
  'client/public/maskable.png',
  'client/public/logo192.png',
  'client/public/logo256.png',
  'client/public/logo384.png',
  'client/public/logo512.png',
  'client/public/images/apple.png',
  'client/public/images/boba.jpg',
  'client/public/images/buns.jpg',
  'client/public/images/chicken-fingers.jpg',
  'client/public/images/chicken-kebabs.png',
  'client/public/images/chocolate-cake.jpg',
  'client/public/images/crab-cakes.jpg',
  'client/public/images/ginger-tea.jpg',
  'client/public/images/loaded-fries.jpg',
  'client/public/images/moonglow.jpg',
  'client/public/images/onion-rings.jpg',
  'client/public/images/owlbear-claws.png',
  'client/public/images/potion.jpg',
  'client/public/images/ramen.jpg',
  'client/public/images/ribs.jpg',
  'client/public/images/scones.jpg',
  'client/public/images/seafood-rice.jpg',
  'client/public/images/sweet-nibbles.jpg',
  'client/public/images/tavern-steak.jpg',
  'client/public/images/tide-me-overs.jpg',
  'client/public/images/travelers-stew.jpg',
  'client/public/images/vanilla-milkshake.jpg',
  'client/public/images/veggie-burger.jpg',
  'client/public/images/versicolor-treat.jpg',
];
// Install the service worker
self.addEventListener('install', function(evt) {
  evt.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('Your files were pre-cached successfully!');
      return cache.addAll(FILES_TO_CACHE);
    })
  );
  self.skipWaiting();
});
// Activate the service worker and remove old data from the cache
self.addEventListener('activate', function(evt) {
  evt.waitUntil(
    caches.keys().then(keyList => {
      return Promise.all(
        keyList.map(key => {
          if (key !== CACHE_NAME && key !== DATA_CACHE_NAME) {
            console.log('Removing old cache data', key);
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});
// Intercept fetch requests
self.addEventListener('fetch', function(evt) {
  if (evt.request.url.includes('/api/')) {
    evt.respondWith(
      caches
        .open(DATA_CACHE_NAME)
        .then(cache => {
          return fetch(evt.request)
            .then(response => {
              // If the response was good, clone it and store it in the cache.
              if (response.status === 200) {
                cache.put(evt.request.url, response.clone());
              }
              return response;
            })
            .catch(err => {
              // Network request failed, try to get it from the cache.
              return cache.match(evt.request);
            });
        })
        .catch(err => console.log(err))
    );
    return;
  }
  evt.respondWith(
    fetch(evt.request).catch(function() {
      return caches.match(evt.request).then(function(response) {
        if (response) {
          return response;
        } else if (evt.request.headers.get('accept').includes('text/html')) {
          // return the cached home page for all requests for html pages
          return caches.match('/');
        }
      });
    })
  );
});