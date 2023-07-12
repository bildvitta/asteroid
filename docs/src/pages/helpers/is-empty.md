---
title: isEmpty
---

Função para retornar se o valor passado por parâmetro é vazio. É considerado vazio os seguintes valores: `undefined`, `null` e `''`.

```js
isEmpty({ value: undefined })
// Retorna: true

isEmpty({ value: null })
// Retorna: true

isEmpty({ value: '' })
// Retorna: true

isEmpty({ value: 'foo' })
// Retorna: false

isEmpty({ value: 0 })
// Retorna: false

isEmpty({ value: false })
// Retorna: false
```
