---
title: destroyNestedChildrenByKey
---

Função recursiva que procura dentro dos `children` e vai removendo todo o objeto caso exista uma flag, por exemplo `destroyed: true`.

#### Definição
```js
destroyNestedChildrenByKey(
  nested = [], // array de objeto contendo chave "children" recursivamente
  destroyedKey = 'destroyed' // chave que ele ira procurar para poder remover
)
```

#### Uso
```js
import { destroyNestedChildrenByKey } from 'asteroid'

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

const normalizedNestedList = destroyNestedChildrenByKey(
  nestedList,
  'destroyed' // já é o default
)
// retorna:
// [
//   {
//     label: 'nível 1',
//     uuid: '1',
//     children: [
//       {
//         label: 'nível 1.2',
//         uuid: '1.2',
//         children: [
//           {
//             label: 'nível 1.2.1',
//             uuid: '1.2.1',
//             children: []
//           }
//         ]
//       }
//     ]
//   }
// ]
```
