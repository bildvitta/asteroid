---
title: QasBtnDropdown
---

Componente semelhante ao QBtnDropdown porém utilizando o QasBtn e QSeparator.

<doc-api file="btn-dropdown/QasBtnDropdown" name="QasBtnDropdown" />

:::danger
Este é um componente puro de dropdown, é utilizado para situações especificas, na maioria dos casos é **recomendado** a utilização do `QasActionsMenu` que implementa este componente e adiciona recursos a mais, utilize este componente com atenção!
:::

:::warning
- quando utilizado o componente junto a propriedade `useSplit` não é possível passar a propriedade `iconRight`, pois ícone a direita é para casos onde existe uma ação secundaria, e nestes casos sempre vai ser uma ação primaria.
- quando utilizado o componente sem a propriedade `useSplit` não é possível passar a propriedade `icon`.
- no mobile sempre o botão a esquerda é removido ficando somente o `dropdownIcon`.
:::

## Uso

<doc-example file="QasBtnDropdown/Basic" title='Básico' />
<doc-example file="QasBtnDropdown/ExWithSplit" title='Uso com divisão' />
<doc-example file="QasBtnDropdown/ExWithMenuPadding" title='Uso com padding no dropdown menu' />
<doc-example file="QasBtnDropdown/ExWithLeftButtonSlot" title='Uso do slot do botão a esquerda' />
<doc-example file="QasBtnDropdown/ExWithClickEvent" title='Uso do evento de click' />
