---
title: QasChartView
---

Componente responsável pela renderização de gráficos. Esse componente utiliza como base a biblioteca [vue-chartjs](https://vue-chartjs.org/).

<doc-api file="chart-view/QasChartView" name="QasChartView" />

:::info
Este componente depende do `Vuex` ou `Pinia`, ele utiliza módulos com actions e state para manipular/recuperar os dados. Por exemplo, para você utilizar o componente `qas-chart-view`, você **deve** ter um módulo com o nome da entidade e dentro desse módulo seguir os requisitos:
- state: list
- actions: fetchList (que vai popular o state de list).

Hoje Utilizamos 3 bibliotecas com propósitos diferentes que são compatíveis com o asteroid para lidar com o Vuex, elas são:
- [StoreModule](https://github.com/bildvitta/store-module) (recomendado)
- [VuexStoreModule](https://github.com/bildvitta/vuex-store-module)
- [VuexOffline](https://github.com/bildvitta/vuex-offline).

Para fazer esses exemplos na documentação, estamos utilizando o `VuexOffline`, para saber mais, veja o código fonte da documentação.
:::

:::info
O retorno da API deverá conter a seguinte estrutura:

```json
{
  "status": {
    "code": 200
  },
  "count": 1,
  "fields": {
    "label": {
      "name": "label",
      "type": "text",
      "label": "Label"
    },
    "data": {
      "name": "data",
      "type": "nested",
      "label": "Data",
      "children": {
        "x": {
          "name": "x",
          "type": "text",
          "label": "Eixo x"
        },
        "y": {
          "name": "y",
          "type": "number",
          "label": "Eixo y"
        },
        "tooltip": {
          "name": "tooltip",
          "type": "text",
          "label": "Tooltip customizado (opcional)"
        },
      }
    }
  },
  "results": [
    {
      "label": "Título do gráfico (ex: Número de contatos por dia)",
      "data": [
        {
          "x": "03/06",
          "y": 5
        },
        {
          "x": "04/06",
          "y": 10
        },
        {
          "x": "05/06",
          "y": 8
        },
        {
          "x": "06/06",
          "y": 12
        },
        {
          "x": "07/06",
          "y": 4
        },
        {
          "x": "08/06",
          "y": 5
        },
        {
          "x": "09/06",
          "y": 11
        }
      ]
    }
  ]
}
```
:::

## Uso
<doc-example file="QasChartView/Bar" title="Gráfico de barra" />
<doc-example file="QasChartView/Doughnut" title="Gráfico de rosquinha" />
<doc-example file="QasChartView/Line" title="Gráfico de linha" />

:::info
- Para renderizar múltiplos gráficos, é necessário retornar mais de um resultado no array de `results` da API.
- No gráfico abaixo, ao realizar o hover na coluna "Presencial", você verá que há um texto do tooltip customizado. Para conseguir esse resultado, é necessário passar juntamente ao objeto `data` uma chave `tooltip` com o texto customizado. Essa chave é opcional, portanto só utilize-a caso necessário.
:::
<doc-example file="QasChartView/MultipleResults" title="Múltiplos gráficos" />

:::info
O gráfico pode ser aprimorado ao incluir um título (title) e um subtítulo (subtitle) para fornecer uma descrição clara dos dados apresentados.
:::
<doc-example file="QasChartView/WithHeader" title="Com título e subtítulo" />

:::info
Para utilizar o filtro dos dados do gráfico, utilize a propriedade `useFilterButton` com o valor `true`. O filtro permite aos usuários personalizar a visualização dos dados, oferecendo uma experiência interativa e flexível.
:::
<doc-example file="QasChartView/WithFilter" title="Com filtro" />
