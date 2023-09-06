---
title: queryCache
---

O boot queryCache é implementado com beforeEach do `VueRouter` e é responsável por persistir as queries na sessionStorage.

Persistência das queries é habilitado por padrão e é o comportamento esperado pelo Design System.

O controle é feito pelo meta, sendo configurado nas rotas e podendo ter diferentes configurações por rota.

:::info
`useCache` é `true`, por default.

Os atributos que podem ser repassados para o meta, são:
- `useCache: true | false`: responsável por habilitar a persistência de queries.
- `excludes: string[]`: array de parâmetros que não devem ser persistidos. `page` é excluido por padrão.
- `includes: string[]`: array de parâmetros para ignorar parâmetros passados ao `excludes`.
:::

:::tip
- Pode passar `useCache: false`, caso queira desabilitar o uso do cache em alguma rota específica.
- `useCache` pode ser passado na rota raiz para refletir em todas as rotas filhas.
- Utilize `includes` em rotas filhas para ignorar o `excludes` da rota pai.
:::

:::danger
A persistência de filtros é por aba do navegador, pois utiliza a sessionStorage. Ler mais em [sessionStorage](https://developer.mozilla.org/pt-BR/docs/Web/API/Window/sessionStorage).
Sempre é dado preferência à query da rota em vez do cache.
:::

### Uso
```javascript
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    meta: { requiresAuth: true, excludes: ['isActive'] },
    children: [
      {
        path: '',
        name: 'Root',
        component: () => import('pages/IndexPage.vue'),
        redirect: { name: 'CustomersList' }
      },
      {
        path: 'customers',
        name: 'CustomersList',
        component: () => import('pages/customers/CustomersList.vue'),
        meta: { includes: ['isActive'] } // a rota filho tem precedência sobre a rota pai, então "isActive" será persistido.
      },
      {
        path: 'customers/new',
        name: 'CustomersCreate',
        component: () => import('pages/customers/CustomersForm.vue'),
        meta: { useCache: false } // a rota não irá persistir nenhum parâmetro.
      },
    ]
  }
]

```
