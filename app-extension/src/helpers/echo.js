import Echo from 'laravel-echo'
import Pusher from 'pusher-js'

import { camelizeKeys } from 'humps'

export function setEcho (accessToken) {
  // necessário para o Echo funcionar.
  window.Pusher = Pusher

  window.Echo = new Echo({
    broadcaster: 'pusher',
    key: 'app-key',
    wsHost: 'localhost',
    wsPort: 6001,
    wssPort: 6001,
    forceTLS: false,
    disableStats: true,
    encrypted: true,
    cluster: 'mt1',
    authEndpoint: `${process.env.SERVER_BASE_URL}/broadcasting/auth`,
    // authEndpoint: 'http://localhost:8000/broadcasting/auth',
    auth: {
      headers: {
        Authorization: accessToken
      }
    }
  })
}

export function setEchoListener ({ user, channel } = {}) {
  window.Echo.private(`notifications.${user.uuid}`).listen('.notification', message => {
    const notification = camelizeKeys(message)

    channel.postMessage({ notification })
  })
}
