---
title: set-typography
---

Inclui os estilos de tipografia do quasar manualmente ao invés de classe, valores disponíveis:

- $h1
- $h2
- $h3
- $h4
- $h5
- $h6
- $subtitle1
- $subtitle2
- $body1
- $body2
- $overline
- $caption

:::warning
Caso ocorra algum erro ao encontrar este mixin, use uma variável scss comentada no style `"// $"`, por exemplo:

```html
<style lang="scss">
// $

@include set-typography($h1);
</style>
```

Isto é um problema do quasar que só consegue identificar quando existe alguma scss var declarada no arquivo, para saber mais clique <a target="_blank" href="https://quasar.dev/style/sass-scss-variables#caveat">aqui</a>.
:::

:::warning
Use este mixin somente quando aplicar as classes de tipografia não funcionarem.
:::

#### Definição
```scss
@use 'sass:map';

@mixin set-typography($name, $important: false) {
  font-size: if($important, map.get($name, 'size') !important, map.get($name, 'size'));
  font-weight: if($important, map.get($name, 'weight') !important, map.get($name, 'weight'));
  letter-spacing: if($important, map.get($name, 'letter-spacing') !important, map.get($name, 'letter-spacing'));
  line-height: if($important, map.get($name, 'line-height') !important, map.get($name, 'line-height'));
}
```

#### Uso
```scss
@include set-typography($h1); // aplica os estilos da classe "text-h1"
@include set-typography($h1, true); // aplica os estilos da classe "text-h1" porém adiciona as propriedades com "!important"
```
