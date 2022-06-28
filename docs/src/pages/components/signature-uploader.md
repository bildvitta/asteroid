---
title: QasSignatureUploader
---

<div class="flex q-gutter-x-md">
  <doc-link title="Componente" name="QasUploader" to="/components/uploader" />
  <doc-link title="Componente" name="QasSignaturePad" to="/components/signature-pad" />
  <doc-link title="Componente" name="QasDialog" to="/components/dialog" />
  <doc-link title="Componente" name="QasBtn" to="/components/button" />
</div>

Componente que implementa o "QasUploader" e "QasSignaturePad" para fazer upload de assinatura.

<doc-api file="signature-uploader/QasSignatureUploader" name="QasSignatureUploader" />

:::danger
Por hora, este componente não funciona na documentação e é preciso testar ele em algum projeto que tenha um bucket para upload.
:::

:::warning
Este componente implementa o `QasUploader`, o que significa que ele repassa props e eventos para os componentes.
:::

## Uso

<doc-example file="QasSignatureUploader/Basic" title="Básico" />
