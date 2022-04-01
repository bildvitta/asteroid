---
title: QasSortable
---

Componente para reordenar items em uma lista e salvar após isto.

<doc-api file="sortable/QasSortable" name="QasSortable" />

:::danger
O método `replace` dentro do componente ainda não foi testado.
:::

:::warning
Este componente depende do `Vuex`, utiliza módulo com action `replace` para salvar ordenação:
- actions: replace.
:::

:::tip
Este componente usa a biblioteca [sortablejs](https://github.com/SortableJS/Sortable]).
:::

## Uso

<doc-example file="QasSortable/Basic" title="Básico" />
