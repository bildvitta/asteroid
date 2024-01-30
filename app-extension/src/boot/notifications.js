/**
 * Este boot só é adicionado dinamicamente caso a opção
 * "asteroidConfig.framework.featureToggle.useNotifications" esteja ativada.
 */

import useNotifications from '@bildvitta/quasar-ui-asteroid/src/composables/use-notifications'
import onLeaderElection from '../helpers/on-leader-election'

import { boot } from 'quasar/wrappers'

export default boot(({ router }) => {
  /**
   * Aqui vamos estabelecer a conexão com o servidor apenas na tab (aba) líder.
   * Vamos escutar por novas notificações, sempre que receber uma notificação,
   * iremos enviar via BroadcastChannel.postMessage().
   */
  onLeaderElection(channel => {
    console.log(router, '>>> router')
    setTimeout(() => {
      channel.postMessage('Nova notificação recebida!')
      document.title = 'LÍDER'
    }, 1000)
  })

  const { triggerNotify, sendNotify, incrementUnreadNotificationsCount } = useNotifications()

  window.notify = ({ link }) => {
    const notification = {
      uuid: 'a4c4d47c-3c57-4357-a0db-50ab19058481233as' + Math.random(),
      title: 'Nova notificação',
      message: 'Você tem uma nova notificação.',
      link: 'http://reis.com.br/quis-autem-voluptatem-nihil-rerum-impedit-beatae-enim',
      created_at: '2024-01-25T18:21:20.108000Z',
      is_read: false
    }

    triggerNotify(notification)
    incrementUnreadNotificationsCount()

    sendNotify(notification)
  }
})
