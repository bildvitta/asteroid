---
title: QasField
---

<div class="flex q-gutter-x-md">
  <doc-link title="Componente" name="QasInput" to="/components/input" />
  <doc-link title="Quasar Componente" name="QInput" href="https://quasar.dev/vue-components/input#qinput-api" />
</div>

Componente para criação de campos dinâmicos.

<doc-api file="field/QasField" name="QasField" />

:::tip
Este componente renderiza componentes dinamicamente através do `type` passado no `field` o que significa que você pode utilizar qualquer prop/evento/slot do componente que ele renderizou.
:::

:::tip
A prop `field` é um objeto que contém as propriedades do componente que será renderizado, exemplo:

```js
{
  name: 'email', // chave que identifica o campo
  label: 'E-mail', // label do campo
  type: 'email' // tipo do campo
}
```

Componente renderizado:
<qas-field :field="{ name: 'email', label: 'E-mail', type: 'Email' }" />
:::

:::tip
Para saber mais sobre o **API Design Pattern** clique [aqui](https://www.notion.so/bildvitta/API-Design-Patterns-5c2509b697614bbbac49cbed0aab70a1).
:::

## Uso
<doc-example file="QasField/Basic" title="Text" />
<doc-example file="QasField/Select" title="Select" />
<doc-example file="QasField/TextArea" title="Text Area" />
<doc-example file="QasField/Number" title="Número" />

Este campo fica escondido pois é um `type="hidden"`
<doc-example file="QasField/Hidden" title="Escondido" />

<doc-example file="QasField/Email" title="E-mail" />
<doc-example file="QasField/Password" title="Senha" />
<doc-example file="QasField/Decimal" title="Decimal" />
<doc-example file="QasField/Money" title="Dinheiro" />
<doc-example file="QasField/Percent" title="Percentual" />
<doc-example file="QasField/Date" title="Data" />
<doc-example file="QasField/Time" title="Hora" />
<doc-example file="QasField/DateTime" title="Dara e Hora" />
<doc-example file="QasField/Boolean" title="Booleano (toogle)" />
<doc-example file="QasField/Checkbox" title="Checkbox" />
<doc-example file="QasField/Radio" title="Radio" />
<doc-example file="QasField/Upload" title="Upload" />
<doc-example file="QasField/SignatureUploader" title="Upload de assinatura" />
<doc-example file="QasField/Editor" title="Editor" />
