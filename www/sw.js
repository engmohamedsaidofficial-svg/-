/* ========================================================
   Service Worker — أذكار الصباح والمساء
   ارفع الملف ده جنب index.html على GitHub
   ======================================================== */

self.addEventListener('install', function () {
  self.skipWaiting();
});

self.addEventListener('activate', function (e) {
  e.waitUntil(self.clients.claim());
});

self.addEventListener('message', function (e) {
  if (!e.data || e.data.type !== 'SHOW_NOTIFICATION') return;
  var d = e.data;
  self.registration.showNotification(d.title, {
    body: d.body,
    dir: 'rtl',
    lang: 'ar',
    vibrate: [200, 100, 200],
    tag: d.tag || 'adhkar',
    requireInteraction: false
  });
});

self.addEventListener('notificationclick', function (e) {
  e.notification.close();
  e.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function (cs) {
      if (cs.length) return cs[0].focus();
      return clients.openWindow('./');
    })
  );
});
