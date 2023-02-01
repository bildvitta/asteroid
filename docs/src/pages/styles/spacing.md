---
title: spacing
---

Tamanho dos espaçamentos paras classes `q-p[n]-[n]`, `q-m[n]-[n]` e `q-col-[n]-gutter-[n]`.
Aqui alteramos tamanho default do quasar e criamos nossos próprios tamanhos.

:::tip
`Tokens adicionais` são novas classes que são criadas internamente e **não** existem no quasar.

Atualmente existem:
- 2xl
:::


#### Definição
```scss
@use 'sass:map';

$space-base   : 16px;
$space-x-base : $space-base; // 16px
$space-y-base : $space-base; // 16px

$space-none : (
  x: 0,
  y: 0
);

$space-xs: (
  x: ($space-x-base * 0.25), // 4px
  y: ($space-y-base * 0.25) // 4px
);

$space-sm: (
  x: ($space-x-base * 0.5), // 8px
  y: ($space-y-base * 0.5) // 8px
);

$space-md: (
  x: $space-x-base, // 16px
  y: $space-y-base // 16px
);

$space-lg: (
  x: ($space-x-base * 1.5), // 24px
  y: ($space-y-base * 1.5) // 24px
);

// O tamanho original seria "16px * 3" ou "48px", alterado para ter "32px"
$space-xl: (
  x: ($space-x-base * 2), // 32px
  y: ($space-y-base * 2) // 32px
);

$space-2xl: (
  x: ($space-x-base * 3), // 48px
  y: ($space-y-base * 3) // 48px
);

$spaces: (
  none: $space-none, // 0px
  xs: $space-xs, // 4px
  sm: $space-sm, // 8px
  md: $space-md, // 16px
  lg: $space-lg, // 24px
  xl: $space-xl, // 32px
  2xl: $space-2xl // 48px
);

$flex-gutter-xs : map.get($space-xs, 'x');
$flex-gutter-sm : map.get($space-sm, 'x');
$flex-gutter-md : map.get($space-md, 'x');
$flex-gutter-lg : map.get($space-lg, 'x');
$flex-gutter-xl : map.get($space-xl, 'x');
$flex-gutter-2xl : map.get($space-2xl, 'x');

$flex-gutter: (
  none: 0, // 0px
  xs: $flex-gutter-xs, // 4px
  sm: $flex-gutter-sm, // 8px
  md: $flex-gutter-md, // 16px
  lg: $flex-gutter-lg, // 24px
  xl: $flex-gutter-xl, // 32px
  2xl: $flex-gutter-2xl // 48px
);

:root {
  @each $key, $space in $spaces {
    --qas-spacing-#{$key}: #{map.get($space, 'x')};
  }
}
```

#### Tamanhos
| token | tamanho | css var
| ------------ | ------------ | ------------ |
| xs | 4px | --qas-spacing-xs |
| sm | 8px | --qas-spacing-sm |
| md | 16px | --qas-spacing-md |
| lg | 24px | --qas-spacing-lg |
| xl | 32px | --qas-spacing-xl |
| 2xl `adicional` | 48px | --qas-spacing-2xl |
