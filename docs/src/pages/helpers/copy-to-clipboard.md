---
title: copyToClipboard
---

Função para copiar um texto simulando um "ctrl + c" que dispara um notify de sucesso/erro após a execução.

```js
import { copyToClipboard } from 'asteroid'

copyToClipboard('Meu texto a ser copiado!', isCopying /* true | false */ => {
  /*
  * - callback que retorna um boolean true/false caso esteja sendo copiado o texto
  * - este callback executa um setTimeout de duração de 500ms
  */
})

```
