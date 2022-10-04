/*
 *  Web Push PROD by Inngage - Mohamed Ali Nakouri
 *  https://www.inngage.com.br/
 */

'use strict';

let notificationUrl = '';
let not_id = '';

self.addEventListener('push', function (event) {
    let _data = event.data ? JSON.parse(event.data.text()) : {};
    notificationUrl = _data.url;
    not_id = _data['not_id'];
    const options = {
        title: _data['title'],
        body: _data['message'],
        icon: _data['icon'],
        tag: 'inngage',
        data: {
            url: _data['url']
        },
        webpush: {
            headers: {
              image: _data['image']
            }
        }
    };
    console.log("evento push - "+options);
    console.log("evento push - url redirect " + notificationUrl);
    event.waitUntil(self.registration.showNotification(options.title,options));
});

self.addEventListener('notificationclick', function (event) {
    console.log("evento notificationclick - url redirect " + notificationUrl);

    if (clients.openWindow) {
        event.notification.close();
    }

    event.waitUntil(clients.matchAll({type: 'window'}).then(function () {
                var jsonData;

                jsonData = JSON.stringify({
                    notificationRequest: {
                        id: not_id
                    }});
                fetch("https://api.inngage.com.br/v1/notification/", {
                    dataType: "json",
                    contentType: "application/json",
                    method: "POST",
                    body: jsonData,
                }).then(async function(response) {
                console.log("evento notificationclick - then result - "+response);

                    await response.json();
                });
                if (clients.length > 0) {
                    // if you have multiple clients, decide
                    // choose one of the clients here
                    const someClient = clients[0]
                    return someClient.navigate(notificationUrl)
                      .then(client => client.focus());
                } else {
                    // if you don't have any clients
                    return clients.openWindow(notificationUrl);
                }
        })
    );
});
