---
title: findChildrenByKey
---

Função recursiva que procura dentro dos `children` e retorna um children especifico de acordo com a key passada.

#### Definição
```js
findChildrenByKey(
  nested = [], // array de objeto contendo chave "children" recursivamente
  key, // chave que ele ira procurar
  value // valor que deve conter na chave "key" para poder procurar
)
```

#### Uso
```js
import { findChildrenByKey } from 'asteroid'

const nestedList = [
  {
    label: 'nível 1',
    uuid: '1',
    children: [
      {
        label: 'nível 1.1',
        uuid: '1.1',
        destroyed: true,
        children: [
          {
            label: 'nível 1.1.1',
            uuid: '1.1.1',
            children: []
          }
        ]
      },
      {
        label: 'nível 1.2',
        uuid: '1.2',
        children: [
          {
            label: 'nível 1.2.1',
            uuid: '1.2.1',
            children: []
          }
        ]
      }
    ]
  }
]

const children = findChildrenByKey(
  nestedList,
  'uuid', // vai procurar pela chave "uuid"
  value: '1.2' // o valor procurado será "1.2"
) // vai procurar pelo primeiro children que tenha a chave "uuid" com o valor "1.2"

// retorna:
// {
//   label: 'nível 1.2',
//   uuid: '1.2',
//   children: [
//     {
//       label: 'nível 1.2.1',
//       uuid: '1.2.1',
//       children: []
//     }
//   ]
// }
```
