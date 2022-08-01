---
title: QasFormGenerator
---

Componente para criação de múltiplos campos dinâmicos a partir do componente `QasField`.

<doc-api file="form-generator/QasFormGenerator" name="QasFormGenerator" />

:::tip
Este componente renderiza componentes dinâmicamente através da prop `fields`, cada field dentro de fields tem um `name`, através dele, você consegue acessar os slots dinâmicos.
:::

:::tip
Para saber mais sobre o **API Design Pattern** clice [aqui](https://www.notion.so/bildvitta/API-Design-Patterns-5c2509b697614bbbac49cbed0aab70a1).
:::

## Uso
<!-- <doc-example file="QasFormGenerator/Basic" title="Básico" /> -->

:::tip
Muitas vezes precisamos adicionar rótulos (label) á determinados blocos de campos para dar mais contexto, com esta propriedade conseguimos fazer isto de uma forma simples, sem a necessidade de abrir um slot para isto.

```js
{
  personalInformation: {
    label: 'Informações pessoais',
    fields: ['name', 'email']
  },

  another: {
    label: 'Outras informações',
    fields: ['phone', 'company']
  }
}
```
:::

<doc-example file="QasFormGenerator/Fieldset" title="Agrupando fields por rótulo (label)" />

<!-- Em alguns casos, queremos acessar todo o conteúdo de um campo especifico para fazer uma logica um pouco mais detalhada, neste caso conseguimos acessar o slot de cada campo individualmente.
<doc-example file="QasFormGenerator/CustomSlot" title="Acessando slots" />

Em muitos casos, você precisa passar alguma prop/evento para um campo, para não precisar abrir um slot, você pode utilizar a prop `fieldsProps` e repassar todas as props/eventos necessários.
<doc-example file="QasFormGenerator/CustomProps" title="Acessando slots" /> -->
