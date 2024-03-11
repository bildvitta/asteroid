/**
 * Este boot só é adicionado dinamicamente na aplicação caso a opção
 * "asteroidConfig.framework.featureToggle.useNotifications" esteja ativada.
 */

import onLeaderElectionChannel from '../helpers/on-leader-election-channel'
import { setLaravelEcho, setLaravelEchoListener } from '../helpers/laravel-echo'
import { setNotificationsChannelListener, setNotificationsUtilsChannel } from '../helpers/notifications-channels'

import { LocalStorage } from 'quasar'
import { boot } from 'quasar/wrappers'

export default boot(() => {
  window.addEventListener('message', ({ data }) => {
    console.log('passou aqui xddd')
    if (data.type !== 'updateUser') return

    const user = data.user
    const accessToken = LocalStorage.getItem('accessToken')

    const hasBearerPrefix = accessToken.startsWith('Bearer ')
    const userToken = hasBearerPrefix ? accessToken : `Bearer ${accessToken}`

    /**
     * Aqui vamos estabelecer a conexão com o servidor apenas na tab (aba) líder.
     * Vamos escutar por novas notificações, sempre que receber uma notificação,
     * iremos enviar via BroadcastChannel.postMessage().
     */
    onLeaderElectionChannel(channel => {
      setLaravelEcho(userToken)
      setLaravelEchoListener({ user, channel })
    })

    /**
     * Controle de notificações por comunicação entre abas (BroadcastChannel).
     */
    setNotificationsChannelListener()
    setNotificationsUtilsChannel()
  })
})
