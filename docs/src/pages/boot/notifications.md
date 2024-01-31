---
title: notifications
---

Boot que controla a central de notificação da aplicação, para que este boot funcione, são necessários **3 etapas**. Após configurar essas etapas, estará disponível os recursos de notificações, que são:

- Item de notificação no menu do `QasAppMenu`;
- Toast de notificação em real time;
- Ícone de notificação no menu em real time.

É utilizado o *pattern* de [leader election](https://en.wikipedia.org/wiki/Leader_election), após eleger uma aba como líder, apenas esta aba irá fazer a conexão com o servidor *websocket*, a comunicação entre outras abas será feita via [BroadcastChannel](https://developer.mozilla.org/en-US/docs/Web/API/Broadcast_Channel_API), o motivo desta implementação é para economia de recursos, uma vez que estamos utilizando um serviço pago, o [Ably](https://ably.com/).

#### Mapeamento de arquivos que lidam com notificações:
- `/app-extension/src/boot/notifications.js`;
- `/ui/src/components/app-user/QasAppUser.vue`;
- `/ui/src/components/layout/QasLayout.vue`;
- `/ui/src/components/layout/private/PvLayoutNotificationCard.vue`;
- `/ui/src/components/layout/private/PvLayoutNotificationsDrawer.vue`.

#### Etapas
##### 1. Habilitar no `asteroid.config.js`
```js
// asteroid.config.js
{
  framework: {
    featureToggle: {
      useNotifications: true
    }
  }
}
```

##### 2. Configure a env `ABLY_KEY` no `quasar.config.js`
É necessário configurar a env para que funcione em `development` e `production`, não é necessário configurar para `localhost`, uma vez que neste caso é utilizado o [soketi](https://docs.soketi.app/) como servidor de *websocket* local.

##### 3. Certifique-se que exista o evento "updateUser" no window
Este evento dispara toda vez que a aplicação é iniciada e exista um `user` setado no *localStorage*, assim garante que o usuário esteja logado, e após isto, é feito todo o controle de notificações.
A biblioteca [@bildvitta/hub](https://github.com/bildvitta/quasar-app-extension-hub) já implementa por padrão estes eventos, caso não esteja utilizando a mesma, será necessário implementar manualmente este evento.

**Exemplo de como a central de notificações escuta por este evento**:
```js
window.addEventListener('message', ({ data }) => {
  if (data.type === 'updateUser') { ... } // aqui é o evento de updateUser
})
```
