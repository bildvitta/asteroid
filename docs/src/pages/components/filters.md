---
title: QasFilters
---

Componente para criação de filtros dinâmicos.

<doc-api file="filters/QasFilters" name="QasFilters" />

:::warning
Este componente depende do `Vuex`, utiliza módulos com actions, state e getters para manipular/recuperar os dados. Por exemplo, para você utilizar em uma entidade de listagem de usuários, você **deve** ter um modulo de `users` e dentro de dele ter os seguinte requisitos:
- state: filters.
- getters: filters.
- actions: fetchFilters (que vai popular o state de filters).

Hoje Utilizamos 2 bibliotecas com propósitos diferentes que são compatíveis com o asteroid para lidar com o Vuex, elas são:
[VuexStoreModule](https://github.com/bildvitta/vuex-store-module) e [VuexOffline](https://github.com/bildvitta/vuex-offline).

Para fazer esses exemplos na documentação, estamos utilizando o `VuexOffline`, para saber mais, veja o código fonte da documentação.
:::

:::warning
O componente irá filtrar somente campos com valores que sejam diferente de **null** ou **undefined**, caso contrário ao filtrar o campo irá ser removido da query.
:::

:::warning
- O componente irá persistir os filtros somente se `use-cached-filters` e `use-update-route` forem **true**.

- É utilizado `seassionStorage` para não perder os dados em memória mesmo que a página seja atualizada. Ao abrir uma nova aba/página é gerada uma nova sessão não compartilhando os filtros entre páginas.

- O componente controla apenas a adição e remoção dos filtros através do composable, não fazendo nenhum tipo de requisição.
:::

:::tip
Este componente serve para lidar com **filtros dinâmicos**, e normalmente utilizado dentro do `QasListView`.
:::

## Uso
<doc-example file="QasFilters/Basic" title="Básico" />
<doc-example file="QasFilters/ExNoUseSearchOnType" title="Sem pesquisa automática ao digitar" />

Normalmente este componente é utilizando junto ao `QasListView` para filtrar os dados.

<doc-example file="QasFilters/CommonUsage" title="Normalmente utilizado" />

<doc-example file="QasFilters/NoSearch" title="Sem o campo de busca" />

:::warning
Ao utilizar a propriedade `:use-update-route="false"`, a leitura dos filtros assim como a escrita na rota não acontecerá.
:::

<doc-example file="QasFilters/NoRouteUpdate" title="Não realizando a atualização padrão da rota" />

<doc-example file="QasFilters/CustomFilter" title="Usando slot default com funções 'filter' e 'removeFilter'" />

<doc-example file="QasFilters/CustomFilterButton" title="Usando slot filter-button com a função 'filter'" />

<doc-example file="QasFilters/RightSide" title="Usando o slot right-side" />
