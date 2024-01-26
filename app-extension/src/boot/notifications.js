// import asteroidConfig from 'asteroid-config'

import { boot } from 'quasar/wrappers'

import useNotifications from '@bildvitta/quasar-ui-asteroid/src/composables/use-notifications'

// TODO: precisa adc essa logica no boot do `app-extension`

export default boot(({ router }) => {
  const { triggerNotify, sendNotify, incrementUnreadNotificationsCount } = useNotifications()

  window.notify = ({ link }) => {
    const notification = {
      uuid: 'a4c4d47c-3c57-4357-a0db-50ab19058481233as' + Math.random(),
      title: 'Nova notificação',
      message: 'Você tem uma nova notificação',
      link: 'http://reis.com.br/quis-autem-voluptatem-nihil-rerum-impedit-beatae-enim',
      created_at: '2024-01-25T18:21:20.108000Z',
      is_read: false
    }

    triggerNotify(notification)
    incrementUnreadNotificationsCount()

    sendNotify(notification)
  }
})
