---
title: QasBtnDropdown
---

Componente semelhante ao QBtnDropdown porém utilizando o QasBtn e QSeparator.

<doc-api file="btn-dropdown/QasBtnDropdown" name="QasBtnDropdown" />

:::warning
- Quando utilizado o componente sem passar a propriedade `split`, não é possível passar a propriedade `iconRight` dentro de `buttonProps`, para controlar o ícone a direita, utilize a propriedade `dropdownIcon`.
- Quando utilizado o componente sem passar a propriedade `split`, e sem passar o `label` para o `buttonProps` não é possível passar as propriedade `iconRight` e `icon` já que ficaria 2 ícones, para controlar o ícone de dropdown, utilize a propriedade `dropdownIcon`.
:::

## Uso

<doc-example file="QasBtnDropdown/Basic" title='Básico' />
<doc-example file="QasBtnDropdown/ExWithSplit" title='Uso com divisão' />
<doc-example file="QasBtnDropdown/ExWithMenuPadding" title='Uso com padding no dropdown menu' />
<doc-example file="QasBtnDropdown/ExWithLeftButtonSlot" title='Uso do slot do botão a esquerda' />
<doc-example file="QasBtnDropdown/ExWithClickEvent" title='Uso do evento de click' />
