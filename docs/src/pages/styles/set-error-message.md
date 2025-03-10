---
title: set-typography
---

Inclui os estilos mensagem de erro, ex: input, select, etc.

:::warning
Utilize apenas em casos onde precise sobrescrever o css já existente, na maioria dos casos, utilize o componente `QasErrorMessage`, utilize este mixin em casos **muito** específicos.
:::

#### Definição
```scss
@mixin set-error-message ($important: false) {
  @include set-typography($caption, $important);

  padding-top: if($important, var(--qas-spacing-sm) !important, var(--qas-spacing-sm));
  color: if($important, $negative !important, $negative);
}
```

#### Uso
```scss
@include set-error-message;
@include set-error-message(true); // aplica os estilos porém adiciona as propriedades com "!important"
```
