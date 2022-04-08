---
title: isLocalDevelopment
---

Função para retornar se você está em localhost.

:::danger
Esta função **não cobre todos** os cenário de desenvolvimento, muito cuidado ao usar.
Utilize apenas quando não comprometer dados sensíveis ou quando não for comprometer funcionalidades cruciais do sistema.
:::

```js
// Considerando que você está em um hostname "localhost" ou "127.0.0.1"
const isLocal = isLocalDevelopment()
// retorna: true
```
