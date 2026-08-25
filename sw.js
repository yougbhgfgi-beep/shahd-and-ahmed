const CACHE_NAME = 'woo-qalbi-v1';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.jpeg',
  './icon-512.jpeg',
  './assets/media/song.mp3',
  './assets/media/video_new.mp4',
  './assets/media/img1.jpeg',
  './assets/media/img2.jpeg',
  './assets/media/img3.jpeg',
  './assets/media/img4.jpeg',
  './assets/media/img5.jpeg',
  './assets/media/img6.jpeg'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request).then(fetchResponse => {
        return caches.open(CACHE_NAME).then(cache => {
          cache.put(event.request, fetchResponse.clone());
          return fetchResponse;
        });
      });
    }).catch(() => caches.match('./index.html'))
  );
});