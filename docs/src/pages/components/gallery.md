---
title: QasGallery
---

Componente para galeria, mostrando images dentro de um "QasDialog" ao clicar nelas.

<doc-api file="gallery/QasGallery" name="QasGallery" />

## Uso

<doc-example file="QasGallery/Basic" title="Básico" />

:::tip
Para conseguir **remover** um item você precisa configurar as seguintes propriedades:

```
- custom-id: referente ao model, ex: users/:id, e não ao id da imagem (não obrigatória);
- entity: referente ao model, ex: "users" (obrigatória);
- url: referente ao endpoint que a action "update" irá executar (não obrigatória);
- model-key: referente ao campo que está querendo atualizar, ex: "photos" (obrigatória);
```
:::
<doc-example file="QasGallery/ObjectImages" title="Imagens com nome e opção de remoção" />
