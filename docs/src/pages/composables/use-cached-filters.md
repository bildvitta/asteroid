---
title: useCachedFilters
---

Composable para gerenciar a persistência de filtros através da `seassonStorage`.

```js
import { useCachedFilters } from 'asteroid'

const cachedFilters = useCachedFilters('users') // recebe a entidade da página.

const filters = { search: 'Jhon Snow', isActive: true } // representação do objeto de filtros que será repassado para addMany().

cachedFilters.addOne({ label: 'isActive', value: true }) // adiciona um novo filtro ao cache.
cachedFilters.addMany(filters) // adiciona vários filtros sobreescrevendo os existentes.
cachedFilters.findOne('isActive') // busca o filtro com base na chave.
cachedFilters.findAll() // busca todos os filtros da entidade.
cachedFilters.clearOne('isActive') // remove um filtro da entidade com base na chave.
cachedFilters.clearAll({ exclude: ['search'] }) // remove todos os filtros da entidade, menos os passados para a chave exclude, que é opcional.

const cachedFilters = useCachedFilters('users')
cachedFilters.init() // faz a inicialização do cache, adicionando os à variável reativa interna e populando a query. Utilizado nas páginas de listView.
```
