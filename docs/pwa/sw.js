self.addEventListener('install', function(e) {
  console.log('[Service Worker] Install');
});

self.addEventListener('fetch', function(e) {
  console.log('[Service Worker] Fetched resource '+e.request.url);
});
self.addEventListener('activate', function() {
	// Delete old asset caches.
	console.log('[Service Worker] activate');
});