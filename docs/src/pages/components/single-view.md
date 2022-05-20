---
title: QasSingleView
---

Componente para C.R.U.D. responsável pela visualização (Read) ou conhecido também como "show".

<doc-api file="single-view/QasSingleView" name="QasSingleView" />

:::warning
Este componente depende do `Vuex`, utiliza módulos com actions, state e getters para manipular/recuperar os dados. Por exemplo, para você utilizar em uma entidade de show de usuários, você **deve** ter um modulo de `users` e dentro de dele ter os seguinte requisitos:
- state: list.
- getters: list e byId.
- actions: fetchSingle.

Hoje Utilizamos 2 bibliotecas com propósitos diferentes que são compatíveis com o asteroid para lidar com o Vuex, elas são:
[VuexStoreModule](https://github.com/bildvitta/vuex-store-module) e [VuexOffline](https://github.com/bildvitta/vuex-offline).

Para fazer esses exemplos na documentação, estamos utilizando o `VuexOffline`, para saber mais, veja o código fonte da documentação.
:::

:::warning
Estamos utilizando nos exemplos um `custom-id` pois é necessario para conseguir utilizar os mocks de dados, **não** significa que você precisa sempre utiliza-lo para lidar com o id, na verdade na maioria das vezes você não vai precisar do `custom-id`, ele é para quando precisa de um caso de uso mais específico.
:::

:::tip
Este componente serve para lidar com **visualização unica**, se você precisar de um componente para lidar com listagem, use o componente `QasListView`.
:::

:::tip
Em alguns casos você vai precisar de ter uma tela unica por exmplo uma tela de **dashboard** que não existe tela de listagem, edição ou criação. Use este componente para isto! Nestes casos você pode ou não ter um `id`, então pode utilizar a propriedade `url` para definir o endereço da tela.
:::

## Uso
<doc-example file="QasSingleView/Basic" title="Básico" />

Aqui está um exemplo de como normalmente utilizamos este componente, lembrando que isto não é uma regra, porém na maioria das vezes você vai se deparar com códigos semelhantes a este.

<!-- <doc-example file="QasSingleView/CommonUsage" title="Normalmente utilizado" /> -->
