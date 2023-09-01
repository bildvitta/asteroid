---
title: queryCache
---

O boot queryCache é implementado com beforeEach do `VueRouter` e é responsável por persistir as queries na sessionStorage.

O controle é feito pelo meta, sendo configurado nas rotas e podendo ter diferentes configurações por rota.

:::info
Os atributos que podem ser repassados para o meta, são:
- `useCache: true | false`: responsável por habilitar a persistência de queries.
- `excludes: string[]`: array de parâmetros que não devem ser persistidos.
- `includes: string[]`: array de parâmetros para ignorar parâmetros passados ao `excludes`.
:::

:::tip
- Pode passar `useCache: false`, caso queira desabilitar o uso do cache em alguma rota específica.
- `useCache` pode ser passado na rota raiz para refletir em todas as rotas filhas.
- Utilize `includes` em rotas filhas para ignorar o `excludes` da rota pai.
:::

:::warning
É necessário repassar os parâmetros do `excludes` da rota pai, caso precise utilizar `excludes` em alguma rota filho. Pois não é feito o merge do array.
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
    meta: { requiresAuth: true, useCache: true, excludes: ['page', 'isActive'] },
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
        meta: { excludes: ['ordering', 'isActive'], includes: ['page'] } // a rota filho tem precedência sobre a rota pai, então "page" será persistido e é necessário repassar os parâmetros que não deseja persistir.
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
