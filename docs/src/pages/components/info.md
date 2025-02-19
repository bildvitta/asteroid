---
title: QasInfo
---

Componente para informações.

<doc-api file="info/QasInfo" name="QasInfo" />

:::info
Quando a propriedade "useRegex" for "true", todo texto da propriedade "text" que estiver dentro de `[]` será substituído pelos componentes:
  - RouterLink (se existir a propriedade `routerLinkProps`).
  - QasBtn (se existir a propriedade `buttonProps`).
:::

## Uso

<doc-example file="QasInfo/Basic" title="Básico" />
<doc-example file="QasInfo/Button" title="Com botão" />
<doc-example file="QasInfo/ExternalLink" title="Link externo" />
<doc-example file="QasInfo/NoAction" title="Sem ação" />
