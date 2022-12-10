---
title: QasNestedFields
---

Componente para gerar dinamicamente campos nested.

<doc-api file="nested-fields/QasNestedFields" name="QasNestedFields" />

:::tip
A propriedade `field` deve respeitar a seguinte estrutura:

```js
{
  name: 'nested', // pode ser qualquer coisa
  type: 'nested',
  label: 'Meu nested',
  children: { // aqui dentro vai todos os os campos nested, abaixo apenas um exemplo de como pode ser
    name: {
      name: 'name',
      type: 'text',
      label: 'Nome'
    },
    email: {
      name: 'email',
      type: 'email',
      label: 'E-mail'
    },
    cities: {
      name: 'cities',
      type: 'select',
      options: [
        {
          label: 'Cidade 1',
          value: 1
        },
        {
          label: 'Cidade 2',
          value: 2
        },
        {
          label: 'Cidade 3',
          value: 3
        }
      ]
    }
  }
}
```
:::

:::tip
A propriedade `rowObject` é usado para definir quais os valores **default** de cada campo na linha, por exemplo se você quiser que sempre que adicionar uma nova linha o campo de cidades já venha selecionado você poderia fazer desta forma:

```js
{
  name: '',
  email: '',
  cities: [1], // aqui o valor default para este campo é 1
  select: ''
}
```
:::

:::tip
Para saber mais sobre o **API Design Pattern** clice [aqui](https://www.notion.so/bildvitta/API-Design-Patterns-5c2509b697614bbbac49cbed0aab70a1).
:::

:::warning
A propriedade `fieldsEvents` não existe mais, para passar eventos para os campos basta passar dentro de `fieldsProps`, já que tudo que é referente a eventos está dentro de `$attrs` no vue 3, por exemplo:

```js
{
  name: {
    // no template se recuperaria: @update:model-value porem no script é desta forma:
    'onUpdate:modelValue': () => alert('Campo alterado')
  }
}
```

Para saber mais clique [aqui](https://v3-migration.vuejs.org/breaking-changes/listeners-removed.html).
:::

## Uso

<doc-example file="QasNestedFields/Basic" title="Básico" />
<doc-example file="QasNestedFields/StartsEmptyFalse" title="Começando com formulário" />
<doc-example file="QasNestedFields/DisabledRows" title="Linhas desabilitadas" />
<doc-example file="QasNestedFields/InlineActions" title="Propriedade useInlineActions" />
<doc-example file="QasNestedFields/SlotDynamic" title="Slot field-[nome-da-chave]" />
<doc-example file="QasNestedFields/SlotFields" title="Slot fields" />
<doc-example file="QasNestedFields/SlotAddInput" title="Slot add-input" />
