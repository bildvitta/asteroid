---
title: constructObject
---

Função para construir objeto de erro no padrão de erro do componente "QasNestedFields".

```js
const errors = {
  'nested.0.name': [
    'O campo documents.0.name é obrigatório.'
  ],
  'nested.1.name': [
    'O campo documents.1.name é obrigatório.'
  ],
  'nested.2.name': [
    'O campo documents.2.name é obrigatório.'
  ],
  'nested.0.email': [
    'O campo documents.0.email é obrigatório.'
  ],
  'nested.1.email': [
    'O campo documents.1.email é obrigatório.'
  ],
  'nested.2.email': [
    'O campo documents.2.email é obrigatório.'
  ]
}

constructObject('nested', errors)
// retorna:
// {
//   '0': {
//     name: [ 'O campo documents.0.name é obrigatório.' ],
//     email: [ 'O campo documents.0.email é obrigatório.' ]
//   },
//   '1': {
//     name: [ 'O campo documents.1.name é obrigatório.' ],
//     email: [ 'O campo documents.1.email é obrigatório.' ]
//   },
//   '2': {
//     name: [ 'O campo documents.2.name é obrigatório.' ],
//     email: [ 'O campo documents.2.email é obrigatório.' ]
//   }
// }
```
