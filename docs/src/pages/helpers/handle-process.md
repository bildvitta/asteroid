---
title: handleProcess
---

Função para recuperar o `process.env` mesmo que ele não esteja declarado no `quasar.config.js`, no quasar v2, caso não esteja declarado no quasar.config.js, é disparado um erro.

```js
import { handleProcess } from 'asteroid'

const myEnv = handleProcess(() => process.env.MY_ENV, 'meu-valor-default')
// retorna o valor de "process.env.MY_ENV" caso exista senão retorna "meu-valor-default".
```
