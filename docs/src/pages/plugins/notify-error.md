---
title: NotifyError
---

<div class="flex q-gutter-x-md">
  <doc-link title="Quasar Componente" name="QNotify" href="https://quasar.dev/quasar-plugins/notify#introduction" />
</div>

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
