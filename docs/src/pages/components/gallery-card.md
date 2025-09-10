---
title: QasGalleryCard
---

Componente de card de galeria (utilizado no QasUploader, QasGallery e nos produtos).

<doc-api file="gallery-card/QasGalleryCard" name="QasGalleryCard" />

## Uso

<doc-example file="QasGalleryCard/Basic" title="Básico" />
<doc-example file="QasGalleryCard/WithError" title="Com erro ao carregar imagem" />
<doc-example file="QasGalleryCard/ErrorSlot" title="Slot image-error-container" />

:::info
Existem alguns casos onde precisa carregar alguns arquivos sem ser ser uma imagem, e nestes casos é exibido com um fundo diferente e o tipo como conteúdo.

Tipos de arquivos aceitos:
- doc
- docx
- pdf
- xlsx
- xls
- csv
:::
<doc-example file="QasGalleryCard/PdfFile" title="Carregando arquivos sem ser imagem." />
<doc-example file="QasGalleryCard/WithVideo" title="Com vídeo" />
<doc-example file="QasGalleryCard/Box" title="Com box" />
<doc-example file="QasGalleryCard/ExGridAndActionsMenu" title="Com QasActionsMenu e QasGridGenerator" />

:::info
Caso não queria que o `QasActionsMenu` seja desabilitado pode enviar a prop `disable: false` por exemplo:
```js
{
  actionsMenuProps: {
    buttonProps: {
      disable: false
    }
  }
}
```
:::
<doc-example file="QasGalleryCard/ExDisable" title="Desabilitados" />
