---
title: QasGalleryCard
---

Componente de card de galeria (utilizado no QasUploader, QasGallery e nos produtos).

<doc-api file="gallery-card/QasGalleryCard" name="QasGalleryCard" />

## Uso

<doc-example file="QasGalleryCard/Basic" title="Básico" />
<doc-example file="QasGalleryCard/ExGridAndActionsMenu" title="Com QasActionsMenu e QasGridGenerator" />

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
<doc-example file="QasGalleryCard/ExDisable" title="Desabilitados" />
