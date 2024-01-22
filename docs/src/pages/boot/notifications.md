---
title: notifications
---

Boot que controla o sistema de notificação da aplicação, para que este boot funcione, são necessários **2 etapas**:

##### 1. Habilitar no `asteroid.config.js`:
```js
// asteroid.config.js
{
  featureToggle: {
    useNotifications: true
  }
}
```

##### 2. Criar e configurar uma store `notifications` com as bibliotecas `StoreModule` ou `VuexStoreModule`:

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

