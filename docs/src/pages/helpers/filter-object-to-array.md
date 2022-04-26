---
title: filterObjectToArray  
---

Função para filtrar um objeto, transformando cada chave em um item do array caso o valor referente a chave seja true.

```js
filterObjectToArray(
  {
    item1: true,
    item2: false,
    item3: '',
    item4: 'str',
  }
) 
// retorna: ['item1', 'item4']
 ```