---
title: QasTableGenerator
---

Componente para criação de tabela dinâmica usando o `QTable` do quasar.

<doc-api file="table-generator/QasTableGenerator" name="QasTableGenerator" />

:::warning
Este componente repassa **todos** os slots do [QTable](https://quasar.dev/vue-components/table#qtable-api) **exceto** o `body` que é um slot customizado.
:::

:::tip
Este componente renderiza componentes dinâmicamente através da prop `fields`, cada field dentro de fields tem um `name`, através dele, você consegue acessar os slots dinâmicos.
:::

## Uso
<doc-example file="QasTableGenerator/Basic" title="Básico" />
<doc-example file="QasTableGenerator/CustomSlot" title="Acessando slot" />
