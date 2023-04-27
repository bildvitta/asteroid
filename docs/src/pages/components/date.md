---
title: QasDate
---

Componente wrapper do [QDate](https://quasar.dev/vue-components/date#introduction), com estilização própria e funcionalidades extras.

<doc-api file="date/QasDate" name="QasDate" />

:::info
- Como este é um componente wrapper que sofre alterações, nem todas funcionalidades podem funcionar, como `range`.
- Prop "mask" só aceita 2 tipos: `YYYY-MM-DD` (default e recomendado) e `YYYY/MM/DD`.
- Props são repassadas para o `QDate`, exceto:
  - color
  - minimal
  - textColor
:::

## Uso

<doc-example file="QasDate/Basic" title="Básico" />
<doc-example file="QasDate/ExDateEvents" title="Com eventos" />
<doc-example file="QasDate/ExDateNoInactive" title="Sem inativos" />
<doc-example file="QasDate/ExDateNoInactiveEvents" title="Com eventos e sem inativos" />
<doc-example file="QasDate/ExDateMultiple" title="Múltiplo" />
