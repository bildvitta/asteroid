---
title: QasGallery
---

Componente para galeria, mostrando images dentro de um "QasDialog" ao clicar nelas.

:::info
Este componente depende do `Vuex` ou `Pinia`, utiliza módulos com actions. Por exemplo, para você conseguir remover uma imagem da galeria, você precisa ter:
- action: update.

Hoje Utilizamos 2 bibliotecas com propósitos diferentes que são compatíveis com o asteroid para lidar com o Vuex, elas são:
[VuexStoreModule](https://github.com/bildvitta/vuex-store-module), [VuexOffline](https://github.com/bildvitta/vuex-offline) e [StoreModule](https://github.com/bildvitta/store-module).
:::

<doc-api file="gallery/QasGallery" name="QasGallery" />

## Uso

<doc-example file="QasGallery/Basic" title="Básico" />

:::tip
Quando fazemos uma remoção de imagem de um model, `users` por exemplo, estamos na verdade **editando** ele, então é utilizado a action `update`.

Para conseguir **remover** um item você precisa configurar as seguintes propriedades:

```
- custom-id: referente ao model, ex: users/:id, e não ao id da imagem (não obrigatória);
- entity: referente ao model, ex: "users" (obrigatória);
- url: referente ao endpoint que a action "update" irá executar (não obrigatória);
- model-key: referente ao campo que está querendo atualizar, ex: "photos" (obrigatória);
```
:::
<doc-example file="QasGallery/ObjectImages" title="Imagens com nome e opção de remoção" />
