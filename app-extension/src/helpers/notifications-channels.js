import useNotifications from '@bildvitta/quasar-ui-asteroid/src/composables/use-notifications'

export function setNotificationsChannelListener () {
  const {
    incrementUnreadNotificationsCount,
    sendNotify,
    triggerNotification
  } = useNotifications()

  const notificationsChannel = new BroadcastChannel('notifications')

  notificationsChannel.onmessage = ({ data: { notification } }) => {
    triggerNotification(notification)
    sendNotify(notification)
    incrementUnreadNotificationsCount()
  }
}

export function setNotificationsUtilsChannel () {
  const { setUnreadNotificationsCount } = useNotifications()

  const notificationsUtilsChannel = new BroadcastChannel('notifications--utils')

  notificationsUtilsChannel.onmessage = ({ data: { type } }) => {
    if (type === 'markAllAsRead') setUnreadNotificationsCount(0)
  }
}
