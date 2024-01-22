---
title: notifications
---

Boot que controla o sistema de notificação da aplicação, para que este boot funcione, são necessários **3 etapas**:

Após configurar essas etapas, estará disponível os recursos de notificações, que são:

- Tela de listagem de notificações em `/notifications`;
- Toast de notificação em real time;
- Ícone de notificação no menu em real time.

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

##### 2. Criar e configurar uma store `notifications` com as bibliotecas `StoreModule` ou `VuexStoreModule`

Exemplo com `Vuex` e `StoreModule`:

```js
// notifications.js
import storeModule from 'caminho-do-arquivo-store-module.js'

export default storeModule.createStoreModule('notifications')
```

Após isto vamos no arquivo onde foi inicializado o Vuex, vamos importar o notifications.js e adicionar ele dentro de modules:

```js
// index.js
import notifications from 'caminho-do-notifications.js'

export default store(function (/* { ssrContext } */) {
  const Store = createStore({
    modules: {
      notifications // ---------------------- Adicionamos o modulo notifications ----------------------
    },

    strict: false
  })

  return Store
})
```

##### 3. Certifique-se que exista uma rota com name "Root" no main layout da aplicação
Adicionamos dinamicamente uma tela de listagens com o path `/notifications`, como é uma rota dinâmica, precisa ser adicionada como rota filha do layout principal para que seja mantido o header e menu da aplicação, para isto, certifique que seu main layout esteja com o name `Root`.
