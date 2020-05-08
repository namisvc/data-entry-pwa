self.addEventListener('install', function(e) {
 e.waitUntil(
   caches.open('namis-data').then(function(cache) {
     return cache.addAll([
       '/',
	   '/index.md',
       '/index.html',
       '/css/style.css',
	   '/css/materialize.css',
	   '/css/materialize.min.css',
       '/js/materialize.min.js',
	   '/js/materialize.js',
	   '/js/init.js',
	   '/js/crops.js',
      ]);
   })
 );
});


self.addEventListener('fetch', function(event) {
 console.log(event.request.url);

 event.respondWith(
   caches.match(event.request).then(function(response) {
     return response || fetch(event.request);
   })
 );
});
