---
title: useNotifications
---

Composable para notificações da aplicação.

:::info
##### Objeto de notificação

```ts
{
  createdAt: string,
  title: string,
  message: string,
  link: string
}
```
:::

```js
import { useNotifications, onNotificationReceived } from 'asteroid'

const {
  // const
  hasNotifications,

  // computed
  unreadNotificationsCount,

  // functions
  incrementUnreadNotificationsCount,
  sendNotify,
  setUnreadNotificationsCount,
  triggerNotification
} = useNotifications()

// hook que é disparado toda vez que a aplicação envia uma nova notificação.
onNotificationReceived(notification => {})

// retorna se a central de notificação esta ativada na aplicação (referente ao asteroid.config.js).
hasNotifications

// retorna o contador de notificações não lidas.
unreadNotificationsCount.value

// incrementa o contador "unreadNotificationsCount".
incrementUnreadNotificationsCount()

// dispara o "Notify" do Quasar (não dispara nenhum evento, apenas notificação na aba atual).
sendNotify(notification)

// seta o contador "unreadNotificationsCount".
setUnreadNotificationsCount(5)

// aciona o hook "onNotificationReceived".
triggerNotification(notification)
```
