const staticCacheName = 'site-static-v1.3';

const assets = [
    'assets/images/germlogo.png',
    'assets/js/game.js',
    'index.html',
    'game.html',
    'splashscreens/ipad_splash.png',
    'splashscreens/ipadpro1_splash.png',
    'splashscreens/ipadpro2_splash.png',
    'splashscreens/iphone5_splash.png',
    'splashscreens/iphone6_splash.png',
    'splashscreens/iphoneplus_splash.png',
    'splashscreens/iphonex_splash.png',
    '/assets/css/font-awesome.min.css',
    'assets/images/universe.jpg'
];

self.addEventListener('fetch', evt => {
  evt.respondWith(
    caches.match(evt.request).then(cacheRes => {
      return cacheRes || fetch(evt.request);
    })
  );
});

self.addEventListener('install', evt => {
  self.skipWaiting();
  evt.waitUntil(
    caches.open(staticCacheName).then((cache) => {
      console.log('caching shell assets');
      cache.addAll(assets);
    })
  );
});

self.addEventListener('activate', evt => {
  evt.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(keys
        .filter(key => key !== staticCacheName)
        .map(key => caches.delete(key))
      );
    })
  );
});