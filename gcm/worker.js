self.addEventListener('push', function(event) {  
	console.log('Received a push message', event);

	var title = 'Yay a message.';  
	var body = 'We have received a push message.';  
	var icon = '/images/icon-192x192.png';  
	var tag = 'simple-push-demo-notification-tag';

	event.waitUntil(  
		self.registration.showNotification(title, {  
			body: body + ' ' + localStorage.gcmtoken,  
			icon: icon,  
			tag: tag  
		})  
	);  
});

self.addEventListener('fetch',function(event){
	var token = event.request.headers['x-token']
	if(token)
		localStorage.gcmtoken = token;
	event.respondWith(fetch(event.request))
})