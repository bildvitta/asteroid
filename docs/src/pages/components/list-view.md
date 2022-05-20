---
title: QasListView
---

<div class="flex q-gutter-x-md">
  <doc-link title="Componente" name="QasDebugger" to="/components/debugger" />
  <doc-link title="Componente" name="QasSingleView" to="/components/single-view" />
  <doc-link title="Componente" name="QasFilters" to="/components/filters" />
</div>

Componente para C.R.U.D. responsável pela parte de listagem (Read).

<doc-api file="list-view/QasListView" name="QasListView" />

:::warning
Este componente depende do `Vuex`, utiliza módulos com actions, state e getters para manipular/recuperar os dados. Por exemplo, para você utilizar em uma entidade de listagem de usuários, você **deve** ter um modulo de `users` e dentro de dele ter os seguinte requisitos:
- state: list e totalPages.
- getters: list e totalPages.
- actions: fetchList (que vai popular o state de list e totalPages).

Hoje Utilizamos 2 bibliotecas com propósitos diferentes que são compatíveis com o asteroid para lidar com o Vuex, elas são:
[VuexStoreModule](https://github.com/bildvitta/vuex-store-module) e [VuexOffline](https://github.com/bildvitta/vuex-offline).

Para fazer esses exemplos na documentação, estamos utilizando o `VuexOffline`, para saber mais, veja o código fonte da documentação.
:::

:::tip
Este componente serve para lidar com **listagem**, se você precisar de um componente para lidar com um item unitário, como por exemplo, um unico usuário, use o componente `QasSingleView`.
:::

## Uso
<doc-example file="QasListView/Basic" title="Básico" />

Aqui está um exemplo de como normalmente utilizamos este componente, lembrando que isto não é uma regra, em muitos casos por exemplo precisamos utilizar cards ao invés do `QasTable`, porém na maioria das vezes você vai se deparar com códigos semelhantes a este.

<doc-example file="QasListView/CommonUsage" title="Normalmente utilizado" />

Para usar `QasFilters` você não precisa fazer nada! Porém, em alguns casos, você pode precisar de algum filtro especifico ou alguma outra customização, para isto você pode usar o slot `filter`.

<doc-example file="QasListView/CustomFilter" title="Com filtro customizado" />
