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

$primary-contrast: #eaeaff;
$secondary-contrast: #bbd3d0;

@include set-brand(primary-contrast, $primary-contrast);
@include set-brand(secondary-contrast, $secondary-contrast);
```
