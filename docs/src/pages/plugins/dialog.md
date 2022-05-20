---
title: Dialog
---

<div class="flex q-gutter-x-md">
  <doc-link title="Quasar Componente" name="QNotify" href="https://quasar.dev/quasar-plugins/notify#introduction" />
</div>

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
