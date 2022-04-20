# filter-list-by-handle

 Função para filtrar um array de objeto, usando a lógica na propriedade `handle`
 e adicionando o que tem dentro da propriedade `item`.
 
 ```js
export default function (list = []) {
  const formattedList = []

  list.forEach(itemList => {
    if (itemList.handle) {
      formattedList.push(itemList.item)
    }
  })

  return formattedList
}
```

 ### Exemplo
 ```
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


