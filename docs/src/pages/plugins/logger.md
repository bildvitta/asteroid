---
title: Logger
---

Plugin para adicionar loggers, contendo funções.

<doc-api file="logger/Logger" type="plugins" name="Logger" />

## Uso

### group
```js
// fora do arquivo .vue
import { Logger } from 'asteroid'

// definição
Logger().group(
  message, // Mensagem agrupada do console.group
  payload = [], // conteúdo dentro do grupo
  isErrorType // grupo com estilo de erro
)

Logger().group('Minha informação agrupada', [
  ['informação que vai aparecer dentro do grupo'],
  { test: true }
])

// erro
Logger().group('Minha informação agrupada de erro',
  ['informação que vai aparecer dentro do grupo'],
  true
)

// dentro de arquivo .vue
this.$qas.logger.group('Minha informação agrupada', [
  ['informação que vai aparecer dentro do grupo'],
  { test: true }
])

// erro
this.$qas.logger.group('Minha informação agrupada de erro',
  ['informação que vai aparecer dentro do grupo'],
  true
)
```

### Info
```js
// fora do arquivo .vue
import { Logger } from 'asteroid'

// definição
Logger().info(
  message // mensagem do console.info
)

Logger().info('Apenas uma mensagem')

// dentro de arquivo .vue
this.$qas.logger.info('Apenas uma mensagem')
```


### Error
```js
// fora do arquivo .vue
import { Logger } from 'asteroid'

// definição
Logger().error(
  message // mensagem do console.info
)

Logger().error('Apenas uma mensagem de erro')

// dentro de arquivo .vue
this.$qas.logger.error('Apenas uma mensagem de erro')
```

<doc-example file="Logger/Basic" title="Básico" />
