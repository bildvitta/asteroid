---
title: useForm
---

Composable para validação de modo de formulário (criação ou edição).

```js
import { useForm } from 'asteroid'

const { isEditMode, mode } = useForm() // replace (PUT) já é default

isEditMode.value // true | false
mode.value // 'replace' | 'create'

const { isEditMode, mode } = useForm({ editMode: 'update' }) // update (PATCH)

isEditMode.value // true | false
mode.value // 'update' | 'create'
```
