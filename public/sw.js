self.addEventListener('install', e => {
  e.waitUntil(caches.open('twsb-v1').then(c => c.addAll(['/'])));
});
