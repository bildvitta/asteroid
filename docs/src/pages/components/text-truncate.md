---
title: QasTextTruncate
---

Trunca um texto baseado no tamanho do elemento pai e adiciona um rotulo "ver mais" que quando clicado mostra um dialog com o texto original completo (sem ser truncado).

<doc-api file="text-truncate/QasTextTruncate" name="QasTextTruncate" />

## Uso

<doc-example file="QasTextTruncate/Basic" title="Básico" />

<doc-example file="QasTextTruncate/InsideTable" title="Dentro da tabela" />

<doc-example file="QasTextTruncate/WithCounter" title="Com contador" />

:::warning
Quando for utilizar por slot, não pode haver nenhum elemento englobando o texto.
:::

<doc-example file="QasTextTruncate/DefaultSlot" title="Slot default" />

:::info
- Quando utilizar com badge, é necessário utilizar junto com a propriedade "useObjectList".
- Só são repassados para o QasBadge props que o mesmo aceite.
- Utilize a propriedade "useWrapBadge" quando utilizar fora de tabela em casos que precise quebrar as badges em mais linhas.
:::
<doc-example file="QasTextTruncate/WithBadge" title="Uso com badges" />
