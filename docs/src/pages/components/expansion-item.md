---
title: QasExpansionItem
---

Componente de card expansivo, wrapper do QExpansionItem(https://quasar.dev/vue-components/expansion-item)

<doc-api file="expansion-item/QasExpansionItem" name="QasExpansionItem" />

:::info
- Quando usado QasExpansionItem dentro de QasExpansionItem, o componente já lida com isto internamente alterando o estilo dos QasExpansionItem interno.
- O componente repassa todos os eventos do [QExpansionItem](https://quasar.dev/vue-components/expansion-item#usage).
- Usar o "disable-button" em casos onde não existe previamente o conteúdo para o slot `content`, e o "disable" para quando de fato o componente precisa estar "desabilitado".
:::

:::warning
- Não recomendamos o uso de nested de 3 níveis (QasExpansionItem dentro de QasExpansionItem dentro de QasExpansionItem).
- O separador no header funciona de forma automática, porém em alguns casos é necessário forçar aparecer/remover, use a propriedade "useHeaderSeparator" nestes casos específicos.
:::

## Uso
<doc-example file="QasExpansionItem/Basic" title="Básico" />
<doc-example file="QasExpansionItem/WithMaxContentHeight" title="Com limite de altura no conteúdo" />
<doc-example file="QasExpansionItem/Slot" title="Slot" />
<doc-example file="QasExpansionItem/Nested" title="Nested" />
<doc-example file="QasExpansionItem/HeaderBottomSlot" title="HeaderBottomSlot" />
<doc-example file="QasExpansionItem/Error" title="Com erro" />
<doc-example file="QasExpansionItem/WithBox" title="Dentro de um QasBox" />
<doc-example file="QasExpansionItem/Disable" title="Desabilitado" />
<doc-example file="QasExpansionItem/Group" title="Agrupamento" />
