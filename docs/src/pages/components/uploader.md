---
title: QasUploader
---

Componente para upload com auto redimensionamento que implementa o "QField" e "QUploader".

<doc-api file="uploader/QasUploader" name="QasUploader" />

:::danger
Por hora, este componente não funciona na documentação e é preciso testar ele em algum projeto que tenha um bucket para upload.
:::

:::warning
Este componente implementa o [QUploader](https://quasar.dev/vue-components/uploader#usage) e o [QField](https://quasar.dev/vue-components/field#introduction), o que significa que ele repassa  props e eventos para os componentes.
:::

:::tip
O comportamento padrão do componente **QasUploader** é emitir/receber a `url` de upload do arquivo. Porém, ao utilizar a prop `useObjectModel` o componente começará a emitir/receber o valor como objeto.

O formato padrão do model de objeto é: 
```js
{ format: '.fileFormat', url: 'filePath', name: 'fileName' }
```

Ao utilizar essa propriedade, é necessário que a API esteja pronta para receber o objeto acima invés da URL. E caso o **QasUploader** seja do tipo múltiplo (quando há a propriedade `multiple`), a API deverá estar pronta para receber um array deste objeto.
:::

## Uso

<doc-example file="QasUploader/Basic" title="Básico" />
