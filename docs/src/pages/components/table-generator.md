---
title: QasTableGenerator
---

<div class="flex q-gutter-x-md">
  <doc-link title="Componente" name="QasListView" to="/components/list-view" />
  <doc-link title="Componente" name="QasBtn" to="/components/button" />
  <doc-link title="Componente" name="QasBox" to="/components/Box" />
  <doc-link title="Quasar Componente" name="QTable" href="https://quasar.dev/vue-components/table#qtable-api" />
</div>

Componente para criação de tabela dinâmica usando o `QTable` do quasar.

<doc-api file="table-generator/QasTableGenerator" name="QasTableGenerator" />

:::warning
Este componente repassa **todos** os slots do [QTable](https://quasar.dev/vue-components/table#qtable-api) **exceto** o `body` que é um slot customizado.
:::

:::tip
Este componente renderiza componentes dinamicamente através da prop `fields`, cada field dentro de fields tem um `name`, através dele, você consegue acessar os slots dinâmicos.
:::

:::tip
Componente implementa o `QasBox` repassando todas propriedades.
:::

## Uso
<doc-example file="QasTableGenerator/Basic" title="Básico" />
<doc-example file="QasTableGenerator/CustomSlot" title="Acessando slot" />
