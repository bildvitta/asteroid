# filter-object-to-array  
  
  Função para filtrar um objeto, transformando cada chave em um item do array caso
  o valor referente a chave seja true.
 
 ```js
export default function (object = {}) {
  const list = []

  for (const key in object) {
    if (object[key]) {
      list.push(key)
    }
  }

  return list
}
```
  ### Exemplo
```
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

