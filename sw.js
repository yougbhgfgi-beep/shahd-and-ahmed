// Old SW - self destruct
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(keys.map(k => caches.delete(k)))).then(() => {
      return self.clients.matchAll().then(clients => {
        clients.forEach(client => client.postMessage('sw-updated'));
      });
    })
  );
  self.clients.claim();
});
self.addEventListener('fetch', event => {
  event.respondWith(fetch(event.request));
});
