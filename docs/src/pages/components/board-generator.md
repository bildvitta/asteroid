---
title: QasBoardGenerator
---

Componente usado para board de colunas.

<doc-api file="board-generator/QasBoardGenerator" name="QasBoardGenerator" />

## Uso

:::info
Caso precise manipular os dados do model das colunas em camadas mais profundas, use a prop "use-mark-raw" como false.
:::

:::info
Utilize a prop "lazy-loading-fields-keys" para caso você tenha campos que são lazy loading e o back retorna somente 
as options usadas no results atual. É feito um tratamento interno onde mergeamos as options, evitando duplicidade e 
perca de dados com base nas buscas anteriores.

Exemplo de cenário:
- É feita uma busca para a página 1 onde o campo "realEstateDevelopment" possui as options [1, 2, 3, 4].
- É feita uma busca para a página 2, onde o campo "realEstateDevelopment" possui as options [4, 5, 6]
- Os itens da página 1 irá ter a perca de dados, já que não houve o merge das options, sendo necessário passar para o 
componente a prop lazy-loading-fields-keys="['realEstateDevelopment']" para o componente cuidar do merge do campo 
passado.
- Passando a prop o resultado será [1, 2, 3, 4, 5, 6]
:::

<doc-example file="QasBoardGenerator/Basic" title="Básico" />
