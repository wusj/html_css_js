var cacheStatusValue = [];
cacheStatusValue[0] = 'uncached';
cacheStatusValue[1] = 'idle';
cacheStatusValue[2] = 'checking';
cacheStatusValue[3] = 'downloading';
cacheStatusValue[4] = 'updateready';
cacheStatusValue[5] = 'obsolete';

var cache = window.applicationCache;
cache.addEventListener('cached', logEvent, false);
cache.addEventListener('checking', logEvent, false);
cache.addEventListener('downloading', logEvent, false);
cache.addEventListener('error', logEvent, false);
cache.addEventListener('noupdate', logEvent, false);
cache.addEventListener('obsolete', logEvent, false);
cache.addEventListener('progress', logEvent, false);
cache.addEventListener('updateready', logEvent, false);

function logEvent(e) {
  var online, status, type, message;
  online = (navigator.onLine) ? 'yes' : 'no';
  status = cacheStatusValue[cache.status];
  type = e.type;
  message = 'online: ' + online;
  message += ', event: ' + type;
  message += ', status: ' + status;
  if (type == 'error' && navigator.onLine) {
    message += ' (prolly a syntax error in manifest)';
  }
  console.log(message);
}

window.applicationCache.addEventListener(
  'updateready',
  function() {
    window.applicationCache.swapCache();
    console.log('swap cache has been called');
  },
  false
);

setInterval(function() { cache.update() }, 10000);
