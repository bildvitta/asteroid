---
title: QasActionsMenu
---

Componente para abrir um menu de ação a partir de um botão, muito utilizado em tela de edição.

<doc-api file="actions-menu/QasActionsMenu" name="QasActionsMenu" />

## Uso
:::warning
- Propriedade `buttonProps` repassa as propriedades do `QasBtn` exceto:
  - label
  - variant

- Quando há mais de uma ação proveniente da propriedade `list`, o componente `QasActionsMenu` renderiza um menu dropdown com todas as ações. Quando houver apenas uma ação será renderizado apenas um botão com a ação proveniente.

- Quando usado o evento @click no componente, caso esteja habilitado o slit, o @click vai pegar no click do ícone a direita e não no botão a esquerda, caso o slot não esteja habilitado, o @click pega no botão inteiro.
:::

:::tip
- A prop `list` é um objeto de objetos, que contem os seguintes atributos:

  ```js
  {
    visibility: { // key que será usado para abrir o slot
      label: 'Nome do item',
      icon: 'Ícone dentro do item',
      color: 'grey-9' // propriedade color sobrescreve a propriedade do componente `color` porém só é usada quando existe apenas um item na listagem
      props: {
        // Propriedades do q-item: https://quasar.dev/vue-components/list-and-list-items#api--qitem
      },
      handler: function(item) {
        // Ação do item disparado após o usuário clicar.
      }
    }
  }
  ```

- A prop `deleteProps` ativa o componente `QasDelete`, quando é passada o `QasActionsMenu` adiciona a opção de deletar o item como padrão, caso não seja passado, o componente `QasDelete` não é adicionado por padrão.
:::

<doc-example file="QasActionsMenu/Basic" title="Básico" />

<doc-example file="QasActionsMenu/ExWithSplit" title="Usando com split" />


<!-- <doc-example file="QasActionsMenu/Delete" title="QasDelete como padrão" />

<doc-example file="QasActionsMenu/CustomSlot" title="Templates dinâmicos" />

<doc-example file="QasActionsMenu/ExUseLabel" title="Ícone sem label" /> -->
