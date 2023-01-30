---
title: QasActionsMenu
---

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
    color: 'grey-9' // propriedade color sobrescreve a propriedade do componente `color` porém só é usada quando existe apenas um item na listagem
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

:::warning
Quando há mais de uma ação proveniente da propriedade `list`, o componente `QasActionsMenu` renderiza um menu dropdown com todas as ações. Quando houver apenas uma ação será renderizado apenas um botão com a ação proveniente.
:::

:::danger
A chave `iconSize` dentro da propriedade `list` foi **removida**, pois sempre os ícones devem ser do tamanho `sm`.
:::

<doc-example file="QasActionsMenu/Basic" title="Básico" />

:::tip
A prop `deleteProps` ativa o componente `QasDelete`, quando é passada o `QasActionsMenu` adiciona a opção de deletar o item como padrão, caso não seja passado, o componente `QasDelete` não é adicionado por padrão.
:::

:::tip
Para receber o evento de sucesso ao deletar, dentro da propriedade `deleteProps` adicione a chave `onSuccess`, por exemplo:

```js
{
  customId: 'meu-id-custom',
  entity: 'users',
  onSuccess: () => alert('Deletado com sucesso.') // aqui você chama sua função
}
```
:::

<doc-example file="QasActionsMenu/Delete" title="QasDelete como padrão" />

<doc-example file="QasActionsMenu/CustomSlot" title="Templates dinâmicos" />

<doc-example file="QasActionsMenu/ExUseLabel" title="Ícone sem label" />
