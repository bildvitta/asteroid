---
title: QasFilters
---

Componente para criação de filtros dinâmicos.

<doc-api file="filters/QasFilters" name="QasFilters" />

:::warning
Este componente depende do `Vuex`, utiliza modulos com actions, state e getters para manipular/recuperar os dados. Por exemplo, para você utilizar em uma entidade de listagem de usuários, você **deve** ter um modulo de `users` e dentro de dele ter os seguinte requisitos:
- state: filters.
- getters: filters.
- actions: fetchFilters (que vai popular o state de filters).

Hoje Utilizamos 2 bibliotecas com propósitos diferentes que são compativeis com o asteroid para lidar com o Vuex, elas são:
[VuexStoreModule](https://github.com/bildvitta/vuex-store-module) e [VuexOffline](https://github.com/bildvitta/vuex-offline).

Para fazer esses exemplos na documentação, estamos utilizando o `VuexOffline`, para saber mais, veja o código fonte da documentação.
:::

:::tip
Este componente serve para lidar com **filtros dinâmicos**, e normalmente utilizado dentro do `QasListView`.
:::

## Uso
<doc-example file="QasFilters/Basic" title="Básico" />

Normalmente este componente é utilizando junto ao `QasListView` para filtrar os dados.

<doc-example file="QasFilters/CommonUsage" title="Normalmente utilizado" />

<doc-example file="QasFilters/CustomFilter" title="Usando slot default com funções 'filter' e 'removeFilter'" />

