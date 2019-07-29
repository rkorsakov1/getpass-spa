// NOTE Add your offline resources here. Also see docs/PWA.md for more info
const urlsToCache = ['/en/']

self.addEventListener('install', function (event) {
	const CACHE_NAME = `cache`;

	event.waitUntil(
		caches.open(CACHE_NAME).then(function (cache) {
			return cache.addAll(urlsToCache);
		})
	);
});

self.addEventListener('fetch', function (event) {
	const CACHE_NAME = `cache`;

	event.respondWith(
		caches.open(CACHE_NAME).then(function (cache) {
			return cache.match(event.request).then(function (response) {
				return (
					response ||
					fetch(event.request)
						.then(function (response) {
							urlsToCache['additional'].forEach(function (cachePath) {
								if (
									cachePath instanceof RegExp &&
									cachePath.test(event.request.url)
								) {
									cache.put(event.request, response.clone());
								} else if (cachePath === event.request.url) {
									cache.put(event.request, response.clone());
								}
							});
							return response;
						})
						.catch(function () {
							return caches.match(`/en/`);
						})
				);
			});
		})
	);
});

self.addEventListener('activate', function (event) {
	const CACHE_NAME = `cache`;

	event.waitUntil(
		caches.keys().then(function (keys) {
			return Promise.all(
				keys.filter(k => CACHE_NAME !== k).map(function (cacheKey) {
					return caches.delete(cacheKey);
				})
			);
		})
	);
});
