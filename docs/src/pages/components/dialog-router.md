---
title: QasDialogRouter
---

Componente que abre uma pagina dentro de um "QasDialog", porém se você recarregar a pagina, ela é iniciada na pagina que foi carregada inicialmente dentro do QasDialog.

<doc-api file="dialog-router/QasDialogRouter" name="QasDialogRouter" />

:::danger
Por hora, este componente não funciona na documentação e é preciso testar ele em algum projeto que tenha um bucket para upload.
:::

:::warning
Este componente implementa o [QUploader](https://quasar.dev/vue-components/uploader#usage) e o [QField](https://quasar.dev/vue-components/field#introduction), o que significa que ele repassa  props e eventos para os componentes.
:::

## Uso

<doc-example file="QasDialogRouter/Basic" title="Básico" />
