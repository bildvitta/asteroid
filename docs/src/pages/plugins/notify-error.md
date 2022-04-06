---
title: NotifyError
---

Plugin que implementa o [QNotify](https://quasar.dev/quasar-plugins/notify#introduction) do quasar, para notificações de erro.

<doc-api file="notify-error/NotifyError" type="plugins" name="NotifyError" />

## Uso
```js
// fora do arquivo vue
import { NotifyError } from 'asteroid'

NotifyError('Deu erro!')

// dentro do arquivo vue
this.$qas.error('Deu erro!')
```

<doc-example file="NotifyError/Basic" title="Básico" />
