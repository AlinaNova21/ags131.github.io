self.token = '';
self.addEventListener('push', function(event) {  
	console.log('Received a push message', event);

	var title = 'Yay a message.';  
	var body = 'We have received a push message.';  
	var icon = '/images/icon-192x192.png';  
	var tag = 'simple-push-demo-notification-tag';

	event.waitUntil(
		fetchMessages().then(function(res){
			console.log(res);
			self.registration.showNotification(title, {
				body: body + ' ' + self.token + ' ' + JSON.stringify(res), 
				icon: icon,  
				tag: tag  
			}) 
		})
	);  
});

self.addEventListener('fetch',function(event){
	var token = event.request.headers['x-token']
	console.log('fetch',token)
	if(token)
		self.token = token;
	event.respondWith(fetch(event.request))
})

self.addEventListener('message',function(event){
	var token = event.data.token
	console.log('message',token)
	if(token)
		self.token = token;
})

function fetchMessages(){
	console.log('fetchMessages')
	return fetch('https://192.168.0.119/push.php',{
		method: 'post',
		headers: {
			'Accept': 'application/json',
			'Content-type': 'application/json'
		},
		body: JSON.stringify({
			mode: 'fetch',
			token: self.token
		}).then(function(res){ return res.json() })
	})
}