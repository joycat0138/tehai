const CACHE='tehai-v1';
const ASSETS=["./", "index.html", "manifest.webmanifest", "icon-192.png", "icon-512.png", "apple-touch-icon.png", "tiles/Chun.svg", "tiles/Haku.svg", "tiles/Hatsu.svg", "tiles/Man1.svg", "tiles/Man2.svg", "tiles/Man3.svg", "tiles/Man4.svg", "tiles/Man5.svg", "tiles/Man6.svg", "tiles/Man7.svg", "tiles/Man8.svg", "tiles/Man9.svg", "tiles/Nan.svg", "tiles/Pei.svg", "tiles/Pin1.svg", "tiles/Pin2.svg", "tiles/Pin3.svg", "tiles/Pin4.svg", "tiles/Pin5.svg", "tiles/Pin6.svg", "tiles/Pin7.svg", "tiles/Pin8.svg", "tiles/Pin9.svg", "tiles/Shaa.svg", "tiles/Sou1.svg", "tiles/Sou2.svg", "tiles/Sou3.svg", "tiles/Sou4.svg", "tiles/Sou5.svg", "tiles/Sou6.svg", "tiles/Sou7.svg", "tiles/Sou8.svg", "tiles/Sou9.svg", "tiles/Ton.svg"];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET')return;
  e.respondWith(caches.match(e.request,{ignoreSearch:true}).then(hit=>hit||fetch(e.request).then(res=>{
    if(res&&(res.ok||res.type==='opaque')){const copy=res.clone();caches.open(CACHE).then(c=>c.put(e.request,copy))}
    return res;
  }).catch(()=>caches.match('index.html'))));
});
