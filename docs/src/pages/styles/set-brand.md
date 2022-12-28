---
title: set-brand
---

Inclui uma nova Brand

```
@mixin set-brand($name, $color) {
  :root {
    --q-#{$name}: #{$color};
  }

  .text-#{$name} {
    color: $color !important;
    color: var(--q-#{$name}) !important;
  }

  .bg-#{$name} {
    background: $color !important;
    background: var(--q-#{$name}) !important;
  }
}

$primary-contrast: #002E6C;
$secondary-contrast: #90CAF9;

@include set-brand(primary-contrast, $primary-contrast);
@include set-brand(secondary-contrast, $secondary-contrast);
```
