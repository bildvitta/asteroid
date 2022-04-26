---
title: QasActionsMenu
---

<div class="flex q-gutter-x-md">
  <doc-link title="Componente" name="QasDelete" to="/components/delete" />
</div>

Componente para abrir um menu de ação a partir de um botão, muito utilizado em tela de edição.

<doc-api file="actions-menu/QasActionsMenu" name="QasActionsMenu" />


## Uso

:::tip
A prop `list` é um objeto de objetos, que contem os seguintes atributos:

```js
{
  visibility: { // key que será usado para abrir o slot
    label: 'Nome do item',
    icon: 'Icone dentro do item',
    iconSize: 'Tamanho do icone',
    props: {
      // Propriedades do q-item: https://quasar.dev/vue-components/list-and-list-items#api--qitem
    },
    handler: function() {
      // Ação do item disparado após o usuário clicar.
    }
  }
}
```
:::

:::tip
A prop `deleteProps` ativa o componente `QasDelete`, quando é passada o `QasActionsMenu` adiciona a opção de deletar o item como padrão, caso não seja passado, o componente `QasDelete` não é adicionado por padrão.
:::

<doc-example file="QasActionsMenu/Basic" title="Básico" />
<doc-example file="QasActionsMenu/Delete" title="QasDelete como padrão" />
<doc-example file="QasActionsMenu/CustomSlot" title="Templates dinâmicos" />

