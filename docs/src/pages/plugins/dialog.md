---
title: Dialog
---

Plugin que implementa o [QNotify](https://quasar.dev/quasar-plugins/notify#introduction) do quasar, para notificações de sucesso.

<doc-api file="dialog/Dialog" type="plugins" name="Dialog" />

## Uso
```js
// fora do arquivo vue
import { Dialog } from 'asteroid'

Dialog('Deu certo!')

// dentro do arquivo vue
this.$qas.success('Deu certo!')
```

<doc-example file="Dialog/Basic" title="Básico" />
