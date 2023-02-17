---
title: QasTableGenerator
---

Componente para criação de tabela dinâmica usando o `QTable` do Quasar.

<doc-api file="table-generator/QasTableGenerator" name="QasTableGenerator" />

:::tip
Ao utilizar o evento `@row-click` caso tenha algum componente / elemento HTML dentro do slot `body-cell-[field-name]` que queira ignorar, adicione o seguinte evento `@click.stop`.

Exemplo:
```html
<template #body-cell-actions="{ row }">
  <div class="flex justify-end no-wrap q-gutter-x-sm">
    <!-- aqui o @click.stop vai fazer com que este botão não dispare o evento: @row-click -->
    <qas-btn label="alguma ação!" @click.stop="alert('fui clicado')" />
  </div>
</template>
```
:::

:::warning
Este componente repassa **todos** os slots do [QTable](https://quasar.dev/vue-components/table#qtable-api), **exceto** o `body` que é um slot customizado.
:::

:::tip
Componente implementa o `QasBox` repassando todas propriedades.
:::

## Uso

<doc-example file="QasTableGenerator/Basic" title="Básico" />

Este componente renderiza componentes dinamicamente através da prop `fields`, cada field dentro de fields tem um `name`, através dele, você consegue acessar os slots dinâmicos.

<doc-example file="QasTableGenerator/CustomSlot" title="Slots personalizados" />

Também é possível configurar o componente para executar uma ação ao clicar em uma linha, para isso, basta escutar o evento `row-click`.

<doc-example file="QasTableGenerator/ClickableRow" title="Linha clicável" />

Caso queira que ao clicar em uma linha, vá para outra rota, é possível utilizar a prop `row-route-fn` na qual o retorno deve ser um objeto com a estrutura aceita pelo vue-router. Caso precise que a mudança de página seja um link externo, também é possível através da prop `use-external-link` na qual o retorno da prop `row-route-fn` deverá ser um path.

<doc-example file="QasTableGenerator/TableLink" title="Tabela com links" />