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
<!-- <doc-example file="QasTableGenerator/WithHeader" title="Com header" />
<doc-example file="QasTableGenerator/HeaderSlot" title="Acessando slot do header" />
<doc-example file="QasTableGenerator/NoBox" title="Sem box" /> -->

Este componente renderiza componentes dinamicamente através da prop `fields`, cada field dentro de fields tem um `name`, através dele, você consegue acessar os slots dinâmicos.

<!-- <doc-example file="QasTableGenerator/CustomSlot" title="Slots personalizados" /> -->

Também é possível configurar o componente para executar uma ação ao clicar em uma linha, para isso, basta escutar o evento `row-click`.

<!-- <doc-example file="QasTableGenerator/ClickableRow" title="Linha clicável" /> -->

Caso queira que ao clicar em uma linha vá para outra rota, é possível utilizar a prop `row-route-fn` na qual o retorno deve ser com a estrutura aceita pelo vue-router.(a linha passa ser um `<a>` internamente, habilitando a opção de abrir em uma nova aba)

:::tip
Caso precise que a mudança de página seja um link externo, é possível utilizando a prop `use-external-link`, na qual o retorno da prop `row-route-fn` é esperado que seja um path.

Exemplo:
```html
<qas-table-generator :row-route-fn="rowExternalRouteFn" use-external-link />
```

```js
rowExternalRouteFn () {
  return 'https://asteroid.nave.dev/'
}
```
:::

<!-- <doc-example file="QasTableGenerator/TableLink" title="Tabela com links" /> -->

Funcionalidade que permite que o cabeçalho da tabela permaneça visível na parte superior enquanto o usuário faz rolagem do conteúdo da tabela. Para utilizar atribua a prop `use-sticky-header`.

:::tip
É possível alterar a altura máxima da tabela utilizando a prop `max-height`.
:::

<!-- <doc-example file="QasTableGenerator/StickyHeader" title="Header fixo" /> -->

:::warning
O virtual scroll renderiza dinamicamente as linhas a serem exibidas na tabela.
Apenas utilize virtual scroll quando realmente houver comportamentos no qual não se pode ter paginação e tiver muitos dados na tabela.
:::
<!-- <doc-example file="QasTableGenerator/WithVirtualScroll" title="Com virtual scroll" /> -->
