---
title: QasLazyLoadingComponent
---

Componente de para carregar somente os componentes visiveis.

<doc-api file="lazy-loading-component/QasLazyLoadingComponent" name="QasLazyLoadingComponent" />

:::info
Para visualizar melhor o comportamento do lazy loading, abra o DevTools e inspecione os elementos enquanto rola a página. Você verá os placeholders sendo substituídos pelos componentes reais conforme entram no viewport.
:::

:::info
É possível adicionar um atributo "data-placeholder-height" pra caso queira sobrepor a prop "placeholder-height" pra algum elemento filho.
:::

## Uso
<doc-example file="QasLazyLoadingComponent/Basic" title="Básico" />
<doc-example file="QasLazyLoadingComponent/DynamicItems" title="Elementos dinâmicos" />
