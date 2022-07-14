---
title: getNormalizedOptions
---

Função para normalizar options, recebe um array de objetos, uma chave para o `label` e uma para o `value` retornando sempre um array de objetos contendo um label e value.

 ```js
import { getNormalizedOptions } from 'asteroid'

getNormalizedOptions({
  options: [
    { name: 'Test 1', uuid: '1', email: 'example1@email.com' },
    { name: 'Test 2', uuid: '2', email: 'example1@email.com' }
  ],
  label: 'name',
  value: 'uuid'
})

// retorna: [
//   { label: 'Test 1', value: '1', email: 'example1@email.com' },
//   { label: 'Test 2', value: '2', email: 'example1@email.com' }
// ]
```
