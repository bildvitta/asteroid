---
title: QasTreeGenerator
---

Componente de árvore onde é possível adicionar/editar/excluir sem limites de ramos.

<doc-api file="tree-generator/QasTreeGenerator" name="QasTreeGenerator" />

:::warning
Não é possível testar criação/editação/remoção de nodes na documentação por falta de uma API dedicada para testes, também **não** é possível testar o `use-form-view-edit` e `use-form-view-add`.
:::

:::tip
Para a **adição** de novo nó, o componente renderiza por padrão um `QasNestedField` para adição de múltiplos nós de uma única vez. Para a **edição** ele renderiza um `QasInput` através do `QasField` por padrão.

###### Para adicionar ele vai bater o endpoint POST: `/resource` enviando os parâmetros:

```js
{
  parent: 'uuid-do-nó-pai',
  [this.labelKey]: 'o valor do campo',
  lazy: true
}
```

"this.labelKey" é um valor dinâmico, configurando de acordo com a necessidade.

###### Para editar ele vai bater o endpoint PUT: `/resource/uuid-do-nó-a-ser-editado` enviando os parâmetros:

```js
{
  uuid: 'uuid-do-nó-a-ser-editado',
  [this.labelKey]: 'o novo valor do campo',
  lazy: true
}
```

Ele vai bater um endpoint para cada item dentro no nested, podendo haver múltiplas requisições, "this.labelKey" é um valor dinâmico, configurando de acordo com a necessidade.
:::

##### Propriedade "use-form-view-edit" e "use-form-view-add"
Ao usar esta propriedade toda vez que o botão de editar/adicionar for acionado será carregado um `QasFormView` no dialog, podendo configura-lo através da propriedade `form-view-props` e os seus campos através da propriedade `form-generator-props`.

##### Exemplo de propriedade "nodes"

```js
[
  {
    label: 'Nó pai',
    uuid: 'no-pai',
    lazy: true,
    children: [
      {
        label: 'Nó filho 1',
        uuid: 'no-filho-1',
        lazy: true,
        children: [
          {
            label: 'Nó filho 1.1',
            uuid: 'no-filho-1.1',
            lazy: true,
            children: [
              {
                label: 'Nó filho 1.1.1',
                uuid: 'no-filho-1.1.1',
                lazy: true
              },
              {
                label: 'Nó filho 1.2.1',
                uuid: 'no-filho-1.2.1',
                lazy: true
              },
              {
                label: 'Nó filho 1.3.1',
                uuid: 'no-filho-1.3.1',
                lazy: true
              }
            ]
          },
          {
            label: 'Nó filho 1.2',
            uuid: 'no-filho-1.2',
            lazy: true
          },
          {
            label: 'Nó filho 1.3',
            uuid: 'no-filho-1.3',
            lazy: true
          }
        ]
      },
      {
        label: 'Nó filho 2',
        uuid: 'no-filho-2'
      },
      {
        label: 'Nó filho 3',
        uuid: 'no-filho-3'
      }
    ]
  }
]
```

## Uso

<doc-example file="QasTreeGenerator/Basic" title="Básico" />
<doc-example file="QasTreeGenerator/FormViewMode" title="FormView na adição e edição" />
