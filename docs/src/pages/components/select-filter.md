---
title: QasSelectFilter
---

Componente de select que filtra adicionando query na URL, comumente utilizado para seleção de vinculo de empresas..

<doc-api file="select-filter/QasSelectFilter" name="QasSelectFilter" />

:::info
- Empresa default é referente a que estiver na URL.
- Toda vez que seleciona uma nova empresa é adicionado na URL.
- Evento `@update:modelValue` não é disparado no created, apenas quando existe a ação de troca do model.
:::

## Uso
<doc-example file="QasSelectFilter/Basic" title="Básico" />
<doc-example file="QasSelectFilter/WithListView" title="Com list view" />
