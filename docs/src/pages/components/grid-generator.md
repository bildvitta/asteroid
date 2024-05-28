---
title: QasGridGenerator
---

Componente para criação de textos dinâmicos.

<doc-api file="grid-generator/QasGridGenerator" name="QasGridGenerator" />

:::info
Caso os breakpoints dos campos sejam todos iguais, exemplo:
- Possuo os campos name e phone, e ambos precisam ter os breakpoints `{ xs: 12, lg: 6 }`.

É possível passar o `columns` sem especificar os fields, somente um objeto com os breakpoints, mas
é necessário utilizar a prop `use-common-columns` para que isso funcione.
:::

:::info
Ao utilizar a prop `useInline`, o gutter passa a ter o valor `md`.
:::

## Uso
<doc-example file="QasGridGenerator/Basic" title="Básico" />
<doc-example file="QasGridGenerator/ExGridCommonColumns" title="Common Columns" />
<doc-example file="QasGridGenerator/Slots" title="Slots" />
<doc-example file="QasGridGenerator/UseInline" title="Inline" />
