---
title: container
---

### Definição
```js
.container,
.container-xs,
.container-sm,
.container-md,
.container-lg,
.container-xl {
  margin-left: auto;
  margin-right: auto;
  max-width: 1280px;
  width: calc(100% - 80px);

  &.spaced {
    padding-bottom: 20px;
    padding-top: 20px;
  }

  @media (max-width: $breakpoint-xs) {
    width: calc(100% - 20px);
  }
}

.container-xs {
  max-width: $breakpoint-xs !important;
}

.container-sm {
  max-width: $breakpoint-sm !important;
}

.container-md {
  max-width: $breakpoint-md !important;
}

.container-lg {
  max-width: $breakpoint-lg !important;
}
```

### Uso
```
<div class="container spaced">...</div>

<div class="container-sm spaced">...</div>
```