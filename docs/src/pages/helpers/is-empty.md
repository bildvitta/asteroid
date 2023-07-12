---
title: isEmpty
---

Função para retornar se o valor passado por parâmetro é vazio. É considerado vazio os seguintes valores: `undefined`, `null` e `''`.

```js
isEmpty('')
// Retorna: true

isEmpty(undefined)
// Retorna: true

isEmpty(null)
// Retorna: true

isEmpty('John Doe')
// Retorna: false

isEmpty(0)
// Retorna: false

isEmpty(false)
// Retorna: false
```
