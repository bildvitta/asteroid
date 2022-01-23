---
title: QasBreakline
---

Permite encapsular quebra de linhas `\n` de um texto em uma tag HTML ou componente Vue.

<doc-api file="breakline/QasBreakline" name="QasBreakline" />

Em algumas situações, você pode receber um texto com caracteres de quebra de linha, porém gostaria que ele fosse renderizado como HTML, envolvendo cada parágrafo em uma tag de sua preferência, como `div`, `p` ou `span`.

No exemplo abaixo podemos observar três parágrafos separados por quebra de linha.

```
(1) Lorem ipsum dolor sit amet consectetur adipisicing elit.
(2) Impedit, commodi? Quisquam inventore cum nam excepturi.
(3) Temporibus repellendus ea veritatis id eius blanditiis eaque quas rerum, magnam, sit excepturi provident numquam.
```

Este componente permite gerar o resultado abaixo.

```html
<div>(1) Lorem ipsum dolor sit amet consectetur adipisicing elit.</div>
<div>(2) Impedit, commodi? Quisquam inventore cum nam excepturi.</div>
<div>(3) Temporibus repellendus ea veritatis id eius blanditiis eaque quas rerum, magnam, sit excepturi provident numquam.</div>
```

## Uso

### Básico

<doc-example file="QasBreakline/Basic" title="Básico" />

### Slots

<doc-example file="QasBreakline/Slots" title="Slots" />

::: warning
Caso não esteja utilizando o _Asteroid App Extension_, será necessário configurar o Vue para preservar os espaços em branco, assim como relatado [aqui](https://github.com/vuejs/core/pull/1600) e [aqui](https://stackoverflow.com/q/70819018/977687).
:::

### Estilos

Repare que os estilos são aplicados em cada tag de cada quebra de linha. Então, se você possuir três quebras de linhas e adicionar `class` e/ou `style` ao componente, estes serão replicados três vezes.

<doc-example file="QasBreakline/Styles" title="Estilos" />

::: tip
Para evitar repetição, envolva o componente em um elemento HTML que contenha `class` e/ou `style`.

```html
<div class="text-bold">
  <qas-breakline text="..." />
</div>
```
:::
