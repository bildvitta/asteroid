---
title: camelizeFields
---

Função utilizada para transformar a chave "name" dos fields passados à ela em camelCase.

```js
const fields = {
  isActive: {
    name: 'is_active',
    label: 'Usuário ativo?',
    type: 'boolean',
    default: false
  },

  users: {
    name: 'users',
    type: 'nested',
    label: 'Usuários',
    children: {
      userName: {
        name: 'user_name',
        type: 'text',
        label: 'Nome'
      },

      userEmail: {
        name: 'user_email',
        type: 'text',
        label: 'E-mail'
      }
    }
  }
}

camelizeFields(fields)
// retorna:
// {
//   isActive: {
//     name: 'isActive',
//     label: 'Usuário ativo?',
//     type: 'boolean',
//     default: false
//   },

//   users: {
//     name: 'users',
//     type: 'nested',
//     label: 'Usuários',
//     children: {
//       userName: {
//         name: 'userName',
//         type: 'text',
//         label: 'Nome'
//       },

//       userEmail: {
//         name: 'userEmail',
//         type: 'text',
//         label: 'E-mail'
//       }
//     }
//   }
// }
```
