/**
 * Este boot só é adicionado dinamicamente na aplicação caso a opção
 * "asteroidConfig.framework.featureToggle.useNotifications" esteja ativada.
 */

import { onLeaderElection } from '../helpers/channels'
import useNotifications from '@bildvitta/quasar-ui-asteroid/src/composables/use-notifications'
import { setEcho, setEchoListener } from '../helpers/echo'

import { boot } from 'quasar/wrappers'
import { LocalStorage } from 'quasar'

export default boot(() => {
  window.addEventListener('message', ({ data }) => {
    if (data.type !== 'updateUser') return

    const user = data.user
    const accessToken = LocalStorage.getItem('accessToken')

    /**
     * Aqui vamos estabelecer a conexão com o servidor apenas na tab (aba) líder.
     * Vamos escutar por novas notificações, sempre que receber uma notificação,
     * iremos enviar via BroadcastChannel.postMessage().
     */
    onLeaderElection(channel => {
      setEcho(accessToken)
      setEchoListener({ user, channel })
    })

    setNotificationChannelListener()
  })

  /**
   * Aqui fica o controle externo, onde todas as abas (não somente a líder), vão
   * escutar pelas notificações e enviar para a aplicação.
   *
   * Suas responsabilidades:
   * - fazer o hook "onNotifyReceived" do composable "useNotifications" ser ativado.
   * - enviar o "Notify" para a aplicação.
   * - atualizar o contador de notificações não lidas no menu.
   */
  function setNotificationChannelListener () {
    const {
      incrementUnreadNotificationsCount,
      sendNotify,
      triggerNotify
    } = useNotifications()

    const notificationsChannel = new BroadcastChannel('notifications')

    notificationsChannel.onmessage = ({ data: { notification } }) => {
      triggerNotify(notification)
      sendNotify(notification)
      incrementUnreadNotificationsCount()
    }
  }
})
