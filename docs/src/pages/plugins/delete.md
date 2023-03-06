---
title: Delete
---

Plugin que implementa a action `destroy` do `StoreModule` adicionando comportamento de confirmação antes de excluir, este mesmo plugin é utilizado no componente `QasDelete`.

<doc-api file="delete/Delete" type="plugins" name="Delete" />

:::tip
Para utilização do plugin **fora** de um componente `vue`, você precisa importar sua action `destroy` e enviar como parâmetro de configuração do `deleteAction`.

**Exemplo com pinia:**
```js
import { Delete } from 'asteroid'
import { useUsersStore } from 'algum-caminho.js'

const usersStore = useUsersStore()

Delete({
  deleteActionParams: {
    id: 'uuid-do-user-a-ser-excluido',
    entity: 'users'
  },

  deleteAction: params => usersStore.destroy(params)
})
```

**Exemplo com vuex:**
```js
import { Delete } from 'asteroid'
import store from 'algum-caminho.js'

const usersStore = useUsers()

Delete({
  deleteActionParams: {
    id: 'uuid-do-user-a-ser-excluido',
    entity: 'users'
  },

  deleteAction: params => store.dispatch('users', params)
})
```
:::

## Uso
```js
// fora do arquivo vue
import { Delete } from 'asteroid'

Delete({
  deleteActionParams: {
    id: 'uuid-do-user-a-ser-excluido',
    entity: 'users'
  },

  // neste exemplo useUsers é uma store do pinia que tem uma action chamada "destroy".
  deleteAction: params => useUsers.destroy(params)
})

// dentro do arquivo vue
this.$qas.delete({
  deleteActionParams: {
    id: 'uuid-do-user-a-ser-excluido',
    entity: 'users'
  }
})
```

<doc-example file="Delete/Basic" title="Básico" />
