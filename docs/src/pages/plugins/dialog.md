---
title: Dialog
---

Plugin que implementa o `QasDialog`.

<doc-api file="dialog/Dialog" type="plugins" name="Dialog" />

## Uso
```js
// fora do arquivo vue
import { Dialog } from 'asteroid'

Dialog('Deu certo!')

// dentro do arquivo vue
this.$qas.dialog('Deu certo!')
```

<doc-example file="Dialog/Basic" title="Básico" />
