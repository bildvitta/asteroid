---
title: QasInfiniteScroll
---

Componente de infinite scroll baseado no QInfiniteScroll.

<doc-api file="infinite-scroll/QasInfiniteScroll" name="QasInfiniteScroll" />

:::info
O retorno da API deverá conter a seguinte estrutura:

```json
{
  "status": {
    "code": 200
  },
  "count": 50,
  "results": [...]
}
```

A API também deve aceitar os parâmetros "offset" e "limit".
:::
## Uso

<doc-example file="QasInfiniteScroll/Basic" title="Básico" />
