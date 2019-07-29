const urlsToCache = ["%URL%"];
const cacheName = "%NAME%";

self.addEventListener('install', function (event) {
	event.waitUntil(
		caches.open(cacheName).then(function (cache) {
			return cache.addAll(urlsToCache);
		})
	);
});

self.addEventListener('fetch', function (event) {
	event.respondWith(
		caches.open(cacheName).then(function (cache) {
			return cache.match(event.request).then(function (response) {
				return response || fetch(event.request).then(function (response) {
					cache.put(event.request, response.clone());
					return response;
				});
			});
		})
	);
});

self.addEventListener('activate', function (event) {
	event.waitUntil(
		caches.keys().then(function (cacheNames) {
			return Promise.all(
				cacheNames.filter(function (cacheName) {
					// Return true if you want to remove this cache,
					// but remember that caches are shared across
					// the whole origin
				}).map(function (cacheName) {
					return caches.delete(cacheName);
				})
			);
		})
	);
});
