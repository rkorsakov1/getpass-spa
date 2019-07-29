var CACHE = "%NAME%"

self.addEventListener('install', function(evt) {
  evt.waitUntil(precache())
})

self.addEventListener('fetch', function(evt) {
  evt.respondWith(fromCache(evt.request))
  evt.waitUntil(update(evt.request))
})

function precache() {
  return caches.open(CACHE).then(function (cache) {
    return cache.addAll(["%URL%"])
  })
}

function fromCache(request) {
  return caches.open(CACHE).then(function (cache) {
    return cache.match(request).then(function (matching) {
      return matching || null;
      });
  });
}

function update(request) {
  return caches.open(CACHE).then(function (cache) {
    return fetch(request).then(function (response) {
      return cache.put(request, response)
    })
  })
}
