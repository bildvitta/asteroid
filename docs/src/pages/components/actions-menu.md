---
title: QasActionsMenu
---

Componente wrapper do `QasBtnDropdown` que implementa regras de negocio.

<doc-api file="actions-menu/QasActionsMenu" name="QasActionsMenu" />

## Comportamento
- Quando utilizado com `splitName`:
  - com 1 item na lista mostra o botão direto.
  - com 2 itens na lista mostra um botão ao lado do outro.
  - com 3+ itens na lista mostra o botão primário e todo o restante dentro do dropdown.
- Sem `splitName`: Sempre mostra o botão "Opções".
- No mobile toda a lista é sempre dentro do dropdown.
- Use a prop `useLabel: false` para remover todas labels dos botões **fora** do dropdown.
-  Use a prop `useTooltip: true` para mostrar tooltip das labels dos botões **fora** do dropdown quando a prop `useLabel` for `false`.

## Uso
:::info
- Propriedade `buttonProps` é usada para quando o botão esta no modo "Opções" (não existe a prop `splitName`) ou o botão está no mobile.

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
      disable: true, // desabilita o botão e quando ele esta dentro do dropdown (QItem).
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
- As labels dos tooltips vão ser as labels dentro da prop `list`.
:::

<doc-example file="QasActionsMenu/Basic" title="Básico" />
<doc-example file="QasActionsMenu/ExSplit" title="Split de 2 itens" />
<doc-example file="QasActionsMenu/ExMultipleSplit" title="Split de vários itens" />
<doc-example file="QasActionsMenu/ExDisable" title="Desabilitado" />
<doc-example file="QasActionsMenu/ExOptions" title="Opções" />
<doc-example file="QasActionsMenu/ExDelete" title="Com deleção" />
<doc-example file="QasActionsMenu/ExNoLabel" title="Sem label" />
<doc-example file="QasActionsMenu/ExTooltip" title="Sem label" />
