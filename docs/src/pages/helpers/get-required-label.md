---
title: getRequiredLabel
---

Função para retornar label obrigatória normalizada

 ```js
import { getRequiredLabel } from 'asteroid'

getRequiredLabel({ label: 'Minha label obrigatória', required: true }) // Minha label obrigatória*
getRequiredLabel({ label: 'Minha label opcional', required: false }) // Minha label opcional
```
