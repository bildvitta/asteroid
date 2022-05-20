---
title: QasUploader
---

<div class="flex q-gutter-x-md">
  <doc-link title="Componente" name="QField" href="https://quasar.dev/vue-components/field#introduction" />
  <doc-link title="Quasar Componente" name="QUploader" href="https://quasar.dev/vue-components/uploader#usage" />
  <doc-link title="Biblioteca" name="Pica" href="https://github.com/nodeca/pica" />
</div>

Componente para upload com auto redimensionamento que implementa o "QField" e "QUploader".

<doc-api file="uploader/QasUploader" name="QasUploader" />

:::danger
Por hora, este componente não funciona na documentação e é preciso testar ele em algum projeto que tenha um bucket para upload.
:::

:::warning
Este componente implementa o [QUploader](https://quasar.dev/vue-components/uploader#usage) e o [QField](https://quasar.dev/vue-components/field#introduction), o que significa que ele repassa  props e eventos para os componentes.
:::

## Uso

<doc-example file="QasUploader/Basic" title="Básico" />
