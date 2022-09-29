---
title: filterObject
---

Função para filtrar um objeto, muito utilizado em conjunto com o "QasFormGenerator", por exemplo, a API te retorna vários campos, mas você só precisa mostrar alguns, para isto, você pode utilizar essa função.

```js
const fields = {
  isActive: {
    name: 'isActive',
    label: 'Usuário ativo?',
    type: 'boolean',
    default: false
  },

  company: {
    name: 'company',
    label: 'Empresa',
    type: 'select',
    options: [
      {
        label: 'Empresa 1',
        value: 'empresa-1'
      },
      {
        label: 'Empresa 2',
        value: 'empresa-2'
      },
      {
        label: 'Empresa 3',
        value: 'empresa-3'
      }
    ]
  },

  name: {
    name: 'name',
    label: 'Nome',
    type: 'string'
  },

  email: {
    name: 'email',
    label: 'Email',
    type: 'email'
  },

  document: {
    name: 'document',
    label: 'Documento',
    type: 'string',
    mask: 'document'
  },

  phone: {
    name: 'phone',
    label: 'Telefone',
    type: 'string',
    mask: 'phone'
  }
}

const fieldsToShow = [
  'isActive',
  'company',
  'name'
]

filterObject(fields, fieldsToShow)
// retorna:
// {
//   isActive: {
//     name: 'isActive',
//     label: 'Usuário ativo?',
//     type: 'boolean',
//     default: false
//   },

//   company: {
//     name: 'company',
//     label: 'Empresa',
//     type: 'select',
//     options: [
//       {
//         label: 'Empresa 1',
//         value: 'empresa-1'
//       },
//       {
//         label: 'Empresa 2',
//         value: 'empresa-2'
//       },
//       {
//         label: 'Empresa 3',
//         value: 'empresa-3'
//       }
//     ]
//   },

//   name: {
//     name: 'name',
//     label: 'Nome',
//     type: 'string'
//   }
// }
```
