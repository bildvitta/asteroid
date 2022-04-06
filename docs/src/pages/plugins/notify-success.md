---
title: NotifySuccess
---

Plugin que implementa o [QNotify](https://quasar.dev/quasar-plugins/notify#introduction) do quasar, para notificações de sucesso.

<doc-api file="notify-success/NotifySuccess" type="plugins" name="NotifySuccess" />

## Uso
```js
// fora do arquivo vue
import { NotifySuccess } from 'asteroid'

NotifySuccess('Deu certo!')

// dentro do arquivo vue
this.$qas.success('Deu certo!')
```

<doc-example file="NotifySuccess/Basic" title="Básico" />
