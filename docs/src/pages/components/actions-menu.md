---
title: QasActionsMenu
---

Componente wrapper do `QasBtnDropdown` e `QasBtn` que também implementa o plugin `Delete.js`.
Caso a prop `list` contenha **apenas 1** item dentro, ele renderiza um `QasBtn`, se tiver **mais de 1** item, renderiza o `QasBtnDropdown`.

<doc-api file="actions-menu/QasActionsMenu" name="QasActionsMenu" />

## Uso
:::warning
- Propriedade `buttonProps` repassa as propriedades do `QasBtn` quando existe apenas 1 item na prop list, exceto:
  - label
  - variant

- Propriedade `buttonProps` é repassada para a propriedade `buttonProps` do `QasBtnDropdown` quando existe mais de 1 item na prop list, então ela respeita as regras do `QasBtnDropdown`.

- Quando há mais de uma ação proveniente da propriedade `list`, o componente `QasActionsMenu` renderiza um menu dropdown com todas as ações. Quando houver apenas uma ação será renderizado apenas um botão com a ação proveniente.

- Quando usado o evento @click no componente, caso esteja habilitado o useSplit, o @click vai pegar no click do botão a esquerda e não no botão de dropdown, caso o useSplit não esteja habilitado, o @click pega no botão inteiro.

- A prop `deleteProps` ativa o plugin `Delete.js`, quando é passada o `QasActionsMenu` adiciona a opção de deletar o item como padrão, caso não seja passado, o plugin `Delete.js` não é adicionado por padrão.
:::

:::info
- A prop `list` é um objeto de objetos, que contem os seguintes atributos:

  ```js
  {
    visibility: { // key que será usado para abrir o slot
      label: 'Nome do item',
      icon: 'sym_r_visibility', // este ícone tem prioridade ao ícone passado através da prop "buttonProps".
      color: 'grey-10' // propriedade color sobrescreve a propriedade do componente `color` porém só é usada quando existe apenas um item na listagem
      props: {
        // Propriedades do q-item: https://quasar.dev/vue-components/list-and-list-items#api--qitem
      },
      handler: function(item) {
        // Ação do item disparado após o usuário clicar.
      }
    }
  }
  ```
:::

:::info
###### Tooltip
- O `tooltip` ira aparecer o caso ele respeite as regras:
  - Propriedade `useLabel` for `false`.
  - Propriedade `useTooltip` for `true`.
  - O componente QasActionsMenu tenha apenas 1 opção (Modo QasBtn e não QasBtnDropdown).
- A label do tooltip vai ser a label do item dentro do `list`.
:::

<doc-example file="QasActionsMenu/Basic" title="Básico" />
<doc-example file="QasActionsMenu/ExWithSplit" title="Usando com split" />
<doc-example file="QasActionsMenu/Delete" title="QasDelete como padrão" />
<doc-example file="QasActionsMenu/CustomSlot" title="Templates dinâmicos" />
<doc-example file="QasActionsMenu/ExUseLabel" title="Ícone sem label" />
<doc-example file="QasActionsMenu/ExUseTooltip" title="Com tooltip" />
