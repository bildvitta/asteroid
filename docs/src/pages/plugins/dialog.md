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

É possível passar um componente para a descrição, caso precise que a descrição seja diferente do padrão.

:::warning
Isso foi desenvolvido para utilizar em casos muitos específicos, não é recomendado o uso dessa funcionalidade com frequência.
:::
<doc-example file="Dialog/DialogWithDescriptionComponent" title="Descrição sendo um componente" />