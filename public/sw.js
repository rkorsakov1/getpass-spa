var CACHE = "CACHE-%NAME%"
var PRECACHE = "PRECACHE-%NAME%"

self.addEventListener('install', event => {
	event.waitUntil(
		caches.open(PRECACHE)
			.then(cache => cache.addAll(["%URL%"]))
			.then(self.skipWaiting())
	);
});

self.addEventListener('activate', event => {
	const currentCaches = [CACHE, PRECACHE];
	event.waitUntil(
		caches.keys().then(cacheNames => {
			return cacheNames.filter(cacheName => !currentCaches.includes(cacheName));
		}).then(cachesToDelete => {
			return Promise.all(cachesToDelete.map(cacheToDelete => {
				return caches.delete(cacheToDelete);
			}));
		}).then(() => self.clients.claim())
	);
});


self.addEventListener('fetch', event => {
	if (event.request.url.startsWith(self.location.origin)) {
		event.respondWith(
			caches.match(event.request).then(cachedResponse => {
				if (cachedResponse) {
					//	https://stackoverflow.com/questions/45434470/only-in-chrome-service-worker-a-redirected-response-was-used-for-a-reque
					if (cachedResponse.redirected) {
						const clonedResponse = cachedResponse.clone();

						const bodyPromise = 'body' in clonedResponse ?
							Promise.resolve(clonedResponse.body) :
							clonedResponse.blob();

						return bodyPromise.then((body) => {
							return new Response(body, {
								headers: clonedResponse.headers,
								status: clonedResponse.status,
								statusText: clonedResponse.statusText,
							});
						});
					}

					return cachedResponse;
				}


				return caches.open(CACHE).then(cache => {
					return fetch(event.request).then(response => {
						return cache.put(event.request, response.clone()).then(() => {
							return response;
						});
					});
				});
			})
		);
	}
});
