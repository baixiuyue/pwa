const CACHE_NAME_SPACE = "cache_v9";

var cacheList = [
    '/',
    '/app/home',
    '/main.css',
    '/register_sw.js',
    '/manifest.json',
    "/e.png"
  ]

self.addEventListener('install', async event => {
    const cache = await caches.open(CACHE_NAME_SPACE);
    await cache.addAll(cacheList);
    await self.skipWaiting();
});

self.addEventListener('activate', async event => {
    // 清楚旧缓存
    const keys = await caches.keys();
    keys.forEach(key=>{
        if(key !== CACHE_NAME_SPACE) {
            caches.delete(key)
        }
    });
    await self.clients.claim();
});

self.addEventListener('fetch', async event => {
    const req = event.request;
    // const url = new URL(req.url);
    // // 判断是否同源请求
    // if(url.origin !== self.origin) {
    //     return 
    // }
    // event.respondWith(networkFirst(req));
    event.respondWith(
        caches.match(req).then(function(response) {
          if (response != null) {
            return response
          }
          return fetch(req.url)
        })
      )
});


// 网络优先
async function networkFirst(req) {
    const cache = await caches.open(CACHE_NAME_SPACE);
    // 先从网络中获取
    try {
        const fresh = await fetch(req);
        // 把相应的数据备份，保证断网时取到的缓存是最后一次有网络时候的数据
        cache.put(req, fresh.clone());
        return fresh;
    } catch (e) {
        // 去缓存中获取
        const cached = await cache.match(req);
        return cached;
    }
}

// 缓存优先
async function cacheFirst(req) {
    const cache = await caches.open(CACHE_NAME_SPACE);
    const cached = await cache.match(req);
    if(cached) {
        return cached;
    } else {
        const fresh = fetch(req);
        return fresh;
    }
}