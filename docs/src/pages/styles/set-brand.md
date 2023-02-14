---
title: set-brand
---

Inclui uma nova Brand

:::warning
Caso ocorra algum erro ao encontrar este mixin, use uma variável scss comentada no style `"// $"`, por exemplo:

```html
<style lang="scss">
// $

@include set-brand(primary-contrast, $primary-contrast);
</style>
```

Isto é um problema do quasar que só consegue identificar quando existe alguma scss var declarada no arquivo, para saber mais clique <a target="_blank" href="https://quasar.dev/style/sass-scss-variables#caveat">aqui</a>.
:::

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
