---
title: downloadFile
---

Função utilizada para fazer download de arquivos como por exemplo imagens / pdf / docx.

#### Definição
```js
downloadFile({
  url, // A URL do arquivo a ser baixado.
  name // O nome do arquivo a ser salvo no disco local.
})
```

#### Uso
```js
import { downloadFile } from 'asteroid'

downloadFile({
  url: 'minha-url-para-download',
  name: 'nome-do-meu-arquivo-ao-ser-baixado'
})
```
