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

$primary   : #004198;
$secondary : #1565C0;
$tertiary  : #c7ceff;
$accent    : rgba(33, 33, 33, 10%);
$dark      : #424242;
$positive  : #212121;
$negative  : #D40000;
$info      : #31ccec;
$warning   : #f2c037;

// Asteroid
$primary-contrast: #002E6C;
$secondary-contrast: #90CAF9;

@include set-brand(primary-contrast, $primary-contrast);
@include set-brand(secondary-contrast, $secondary-contrast);
```

## Variáveis de ambiente
Abaixo temos uma lista de variáveis de ambiente, as que estão marcadas como `obrigatório` precisa ser adicionadas no `quasar.config.js`

| Variável | Descrição |
| ------------ | ------------ |
| `BUCKET_URL` * | Endereço de hospedagem dos arquivos **(OBRIGATÓRIO)** |
| `SERVER_BASE_URL` * | Endereço base de acesso do servidor **(OBRIGATÓRIO)** |
| `DEBUGGING` * | Habilita os loggers dos componentes **(OBRIGATÓRIO)** |
| `MAPS_API_KEY` * | Key do google maps **(OBRIGATÓRIO)** |
| `SERVER_TIMEOUT` * | Tempo que a API vai tentar finalizar até dar timeout **(OBRIGATÓRIO)** |
