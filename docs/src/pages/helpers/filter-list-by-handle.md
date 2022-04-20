---
title: filter-list-by-handle
--- 
Função para filtrar um array de objeto, usando a lógica na propriedade `handle` e adicionando o que tem dentro da propriedade `item`.

 ```js
filterListByHandle (
  [
    {
      handle: true,
      item: 'item 1'
    },
    {
      handle: false,
      item: 'item 2'
    }
  ]
)
// retorna ['item 1']
```