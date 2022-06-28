---
title: camelizeFieldsName
---

Função recursiva utilizada para transformar a chave "name" dos fields passados à ela em camelCase.
Sempre que existir um `children` dentro de um field, ele vai percorrer recursivamente para alterar o "name".

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

camelizeFieldsName(fields)
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
