---
title: QasDate
---

Componente wrapper do [QDate](https://quasar.dev/vue-components/date#introduction), com estilização própria e funcionalidades extras.

<doc-api file="date/QasDate" name="QasDate" />

:::info
- Como este é um componente wrapper que sofre alterações, nem todas funcionalidades podem funcionar, como `range`.
- Props `useUnmaskEvents` e `useUnmaskOptions` só funciona com Array de datas no formato `YYYY-MM-DD`.
- Props são repassadas para o `QDate`, exceto:
  - color
  - minimal
  - textColor
:::

:::info
Possíveis valores para prop `mask`:

```js
const MaskOptions = {
  Dash: 'YYYY-MM-DD',
  Slash: 'YYYY/MM/DD',
  SlashPtBR: 'DD/MM/YYYY',
  SlashDateAndHourPtBR: 'DD/MM/YYYY HH:mm'
}
```
:::


## Uso

<!-- <doc-example file="QasDate/Basic" title="Básico" /> -->
<doc-example file="QasDate/ExDateEvents" title="Com eventos" />
<!-- <doc-example file="QasDate/ExDateNoInactive" title="Sem inativos" />
<doc-example file="QasDate/ExDateNoInactiveEvents" title="Com eventos e sem inativos" />
<doc-example file="QasDate/ExDateMultiple" title="Múltiplo" /> -->
