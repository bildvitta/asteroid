---
title: AddCounterSuffix
---

Função para adicionar um contador como sufixo, caso exista.

```js
const labelWithSuffix = addCounterSuffix('Minha label', 2)
// retorna: 'Minha label 2'

const labelWithNoSuffix = addCounterSuffix('Minha label', 0)
// retorna: 'Minha label'
```
