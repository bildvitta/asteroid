---
title: useScreen
---

Composable para validação de tamanho de telas e plataforma mobile.

```js
import { useScreen } from 'asteroid'
import { toRefs } from 'vue'

const screen = useScreen()

screen.isSmall // até 599px
screen.isMedium // de 600 até 1023px
screen.isLarge // de 600 até 1023px
screen.untilMedium // de 0 até 599px
screen.untilLarge // de 0 ate 1023px
screen.isMobile // Plataforma

// ou

const {
  isSmall,
  isMedium,
  isLarge,
  untilMedium,
  untilLarge,
  isMobile
} = toRefs(useScreen())
```
