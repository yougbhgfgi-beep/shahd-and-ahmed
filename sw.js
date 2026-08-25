const CACHE_NAME = 'nabd-alqalb-v3';
const BASE = 'https://yougbhgfgi-beep.github.io/shahd-and-ahmed/';
const urlsToCache = [
  BASE,
  BASE + 'index.html',
  BASE + 'manifest.json',
  BASE + 'assets/media/img1.jpeg',
  BASE + 'assets/media/img2.jpeg',
  BASE + 'assets/media/img3.jpeg',
  BASE + 'assets/media/img4.jpeg',
  BASE + 'assets/media/img5.jpeg',
  BASE + 'assets/media/img6.jpeg',
  BASE + 'assets/media/song.mp3',
  BASE + 'assets/media/video_new.mp4'
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
    }).catch(() => caches.match(BASE + 'index.html'))
  );
});
