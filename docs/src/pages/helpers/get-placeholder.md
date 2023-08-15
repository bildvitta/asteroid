---
title: getPlaceholder
---

Função para retornar um placeholder de acordo com o tipo do campo ou sua máscara.

 ```js
import { getPlaceholder } from 'asteroid'

getPlaceholder('email')
// retorna: 'seuemail@exemplo.com'

getPlaceholder('personal-document')
// retorna: '000.000.000-00'

// Caso não encontre o placeholder, retorna o valor default:
getPlaceholder('xpto')
// retorna: 'Digite aqui...'

// É possível passar um valor default caso necessário:
getPlaceholder('xpto', 'Preencha o campo xpto')
// retorna: 'Preencha o campo xpto'
```
