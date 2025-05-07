---
title: useDefaultFilters
---

Composable para recuperar filtros defaults.

```js
import { useDefaultFilters, setDefaultFiltersBeforeEnter } from 'asteroid'
```

O composable `useDefaultFilters` é utilizado no componente `QasSelectFilter` e na função `setDefaultFiltersBeforeEnter`.

### Função `setDefaultFiltersBeforeEnter`

Ao entrar em uma tela onde é necessário adicionar uma query na URL antes da tela ser carregada, utilize a função `setDefaultFiltersBeforeEnter`. Esta função recupera valores de filtros padrão do `localStorage` (chave `defaultFilters`) caso a URL não contenha o filtro previamente selecionado.

Obs: a função fica dentro do arquivo do composable `useDefaultFilters`.

**Definição**
```js
setDefaultFiltersBeforeEnter(to, from, next, queryList = ['company'])

to // rota de destino
from // rota de origem
next // função de redirecionamento
queryList // chaves que será recuperadas dentro de 'defaultFilter' no localStorage (por padrão company incluído).
```

#### Como Utilizar
É recomendado adicionar a função `setDefaultFiltersBeforeEnter` no callback `beforeEnter` da definição de rota.

**Em arquivo de definição de rota (RECOMENDADO)**
```js
// users.js
import { setDefaultFiltersBeforeEnter } from 'asteroid'

export default [
  {
    name: 'UsersList',
    path: '/users',
    component: () => import('pages/users/UsersList.vue'),
    beforeEnter: setDefaultFiltersBeforeEnter
  }
]
```

### Função `onBeforeEach`
Função na qual será utilizada para validar redirecionamentos para mesma rota, sem perder o filtro padrão.

Vamos supor que uma tela utilize o `setDefaultFiltersBeforeEnter`, então ela então sempre irá precisar ter os filtros ao acessar a tela.
Quando já estamos em uma página e tentamos acessar essa mesma página (clicando por exemplo no menu lateral ou breadcrumbs), o callback `beforeEnter` não é chamado, então sendo assim, também não chama o método que seta os filtros padrões da tela.

Para evitar que esses cenários, utilize a função `onBeforeEach`, na qual ela irá validar em casos que vou redirecionar para mesma rota e, irei ter os filtros padrões.

Obs: a função fica dentro do arquivo do composable `useDefaultFilters`.

#### Como Utilizar
**No arquivo de configuração de rotas (normalmente index.js do router)**
```js
// index.js
import { onBeforeEach } from 'asteroid'

export default function () {
  const Router = createRouter({ ... })

  // Adicione o método dentro do beforeEach
  Router.beforeEach(onBeforeEach)

  return Router
}
```

### useDefaultFilters
Composable utilizado para controle interno, e no componente `QasSelectFilter`, utilize somente se necessário.

```js
import { useDefaultFilters } from 'asteroid'

const {
  filterQuery,
  hasFilterQuery,
  getDefaultFiltersFromStorage,
  onDefaultFiltersChange,
  removeOnDefaultFiltersChange,
  setFilterQuery,
  triggerDefaultFiltersChange
} = useDefaultFilters()
```
