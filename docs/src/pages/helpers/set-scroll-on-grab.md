---
title: setScrollOnGrab
---

Função para setar scroll uma determinada área (elemento) ao "puxar/agarrar" com o mouse/touch.

```js
// Definição
setScrollOnGrab(
  element, // Elemento onde irá ocorrer o scroll
  { // Opções
    onMoveFn: ({ event, element }) => {},
    onGrabFn: ({ grabbing }) => {}
  }
)
```
