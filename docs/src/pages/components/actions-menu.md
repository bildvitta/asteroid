---
title: QasActionsMenu
---

Componente para abrir um menu de ação a partir de um botão, muito utilizado em tela de edição.

<doc-api file="actions-menu/QasActionsMenu" name="QasActionsMenu" />


## Uso

A prop `list` é um objeto de objetos, que contem os seguintos atributos:

```js
{
  delete: { // key que será usado para abrir o slot
    label: 'Nome do item',
    icon: 'Icone dentro do item',
    iconSize: 'Tamanho do icone',
    props: {
      // Propriedades do q-item: https://quasar.dev/vue-components/list-and-list-items#api--qitem
    }
    handler: function() {
      // Ação do item disparado após o usuário clicar.
    }
  }
}
```

<doc-example file="QasActionsMenu/Basic" title="Básico" />

<doc-example file="QasActionsMenu/CustomSlot" title="Templates dinâmicos" />
