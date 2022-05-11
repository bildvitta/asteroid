---
title: Usando
---

Para a instalação do Asteroid é bem simples, em sua aplicação `Quasar` abra o terminal na raiz do projeto e digite:

```bash
quasar ext add @bildvitta/asteroid
```

Este comando além de instalar o Asteroid, também vai criar um arquivo `quasar.variables.scss`, normalmente este arquivo já existe no projeto, então vai perguntar se deseja sobrescrever o arquivo, você **deve** sobrescrever o arquivo.

O arquivo gerado deve conter as seguintes informações:

```css
// Quasar SCSS (& Sass) Variables - Asteroid
// --------------------------------------------------
// NÃO MODIFIQUE ESTE ARQUIVO COM AS CONFIGURAÇÕES DO ASTEROID PRÉ DEFINIDAS!

@import '~@bildvitta/quasar-ui-asteroid/src/index';

$primary   : #00527A;
// TODO: No futuro a ideia é não ter uma cor secundária.
// TODO: Por hora vamos usar a mesma de $primary-contrast.
$secondary : #B8D3E0A3;
$tertiary  : #c7ceff;
$accent    : #00365280;
$dark      : #1d1d1d;
$positive  : #21ba45;
$negative  : #c10015;
$info      : #31ccec;
$warning   : #f2c037;

// Asteroid
$primary-contrast: $secondary;
$secondary-contrast: #3691BF80;

@include set-brand(primary-contrast, $primary-contrast);
@include set-brand(secondary-contrast, $secondary-contrast);
```