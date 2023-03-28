---
title: QasUploader
---

Componente para upload com auto redimensionamento que implementa o "QField" e "QUploader".

<doc-api file="uploader/QasUploader" name="QasUploader" />

:::danger
Por hora, este componente não funciona na documentação e é preciso testar ele em algum projeto que tenha um bucket para upload.
:::

:::tip
O comportamento padrão do componente **QasUploader** é emitir/receber a `url` de upload do arquivo. Porém, ao utilizar a prop `useObjectModel` o componente começará a emitir/receber o valor como objeto.

O formato padrão do model de objeto é:
```js
{
  format: '.fileFormat',
  url: 'filePath',
  name: 'fileName'
}
```
:::

Agora o componente implementa o `QasGridGenerator` e o `QasFormGenerator`, existem propriedades para cada componente, porém é possível passar uma única propriedade `fields` que é repassado para cada componente caso ambos tenha os mesmos fields.
Com o QasFormGenerator é possível altear o model do `QasUploader`, para isto é necessário usar a propriedade `useObjectModel`.

- Caso a prop `fields` não é repassada e não é passada no `form
## Uso

<doc-example file="QasUploader/Basic" title="Básico" />
<doc-example file="QasUploader/ExUploaderMultiple" title="Múltiplo" />
<doc-example file="QasUploader/ExUploaderMultipleObjectModel" title="Múltiplo com useObjectModel" />
<doc-example file="QasUploader/ExUploaderSingleObjectModel" title="Múltiplo com useObjectModel" />
<doc-example file="QasUploader/ExUploaderMultipleObjectModelGrid" title="Múltiplo com useObjectModel e somente grid" />
