# Border

### Direction
Define qual direção será criado uma borda.

| **Nome da Classe** |          **Descrição**               |      **Adiciona**        |
|--------------------|--------------------------------------|--------------------------|
|`border-top`        | Cria uma borda no topo do objeto     |`border-top-width: 1px`   |
|`border-bottom`     | Cria uma borda na base do objeto     |`border-bottom-width: 1px`|
|`border-left`       | Cria uma borda na esquerda do objeto |`border-left-width: 1px`  |
|`border-right`      | Cria uma borda na direita do objeto  |`border-right-width: 1px` |

### Colors

Define uma cor para a borda de acordo com o padrão adotado no Design system nas variáveis `$primary` `$secondary`
|     **Nome da Classe**    |                       **Descrição**                        |            **Adiciona**             |
|---------------------------|------------------------------------------------------------|-------------------------------------|
|`border-primary`           | Cria uma Borda com a cor da variável `$primary`            |`border: 0 solid $primary`           |
|`border-primary-contrast`  | Cria uma Borda com a cor da variável `$primary-contrast`   |`border: 0 solid $primary-contrast`  |
|`border-secondary`         | Cria uma Borda com a cor da variável `$secondary`          |`border: 0 solid $secondary`         |
|`border-secondary-contrast`| Cria uma Borda com a cor da variável `$secondary-contrast` |`border: 0 solid $secondary-contrast`|

<!-- // Colors
%border-color {
  &:not(.border-top):not(.border-left):not(.border-bottom):not(.border-right) {
    border-width: 1px !important;
  }
}

@mixin set-border-color($name, $color) {
  .border-#{$name} {
    border: 0 solid $color !important;

    @extend %border-color;
  }
}

@include set-border-color(primary, $primary);
@include set-border-color(primary-contrast, $primary-contrast);
@include set-border-color(secondary, $secondary);
@include set-border-color(secondary-contrast, $secondary-contrast); -->
