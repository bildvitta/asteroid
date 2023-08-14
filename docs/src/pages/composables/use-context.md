---
title: useContext
---

Composable para pegar os dados da query.

```js
import { useContext } from 'asteroid'

const { context } = useContext()

const page = context.value.page
const search = context.value.search
const filters = context.value.filters
```
