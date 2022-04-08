---
title: getSlotChildrenText
---

Função recursiva para recuperar todos os textos dentro de um slot.

```js
const text = getSlotChildrenText(this.$slots.default())
// retorna um array de strings, dependendo dos textos que estiverem dentro do slot default (que foi passado como parâmetro, mas pode ser qualquer children node).
```
