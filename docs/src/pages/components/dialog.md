---
title: QasDialog
---

Componente de dialog.

<doc-api file="dialog/QasDialog" name="QasDialog" />

:::info
Recomendamos a utilização do evento `@ok|onOk` e `@cancel|onCancel` ao invés de utilizar diretamente o `onClick` na prop `ok` e `cancel`.
:::

## Uso

<doc-example file="QasDialog/Basic" title="Básico" />
<doc-example file="QasDialog/ExDialogCancelAndOk" title="Eventos Ok e Cancel" />
<doc-example file="QasDialog/ExWithActions" title="Com ações" />
<doc-example file="QasDialog/ExWithSingleAction" title="Com uma única ação" />

É possível passar um componente para a descrição, caso precise que a descrição seja diferente do padrão.

:::warning
Isso foi desenvolvido para utilizar em casos muitos específicos, não é recomendado o uso dessa funcionalidade com frequência.
Um caso onde a exclusão desse item é de alto impacto, onde devemos ter informações a mais do que somente a descrição padrão.

Exemplo: Tenho um item onde está vinculado a vários empreendimentos, e deverá ser exibido quais empreendimentos estão vinculados mostrando o impacto da exclusão do mesmo.
:::
<doc-example file="QasDialog/DialogWithDescriptionComponent" title="Descrição sendo um componente" />
