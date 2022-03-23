---
title: QasFormView
---

Componente para C.R.U.D. responsável pela pela criação (Create) e edição (Update).

<doc-api file="form-view/QasFormView" name="QasFormView" />

:::warning
Este componente depende do `Vuex`, utiliza modulos com actions, state e getters para manipular/recuperar os dados. Por exemplo, para você utilizar em uma entidade de show de usuários, você **deve** ter um modulo de `users` e dentro de dele ter os seguinte requisitos:
- state: list.
- getters: list e byId.
- actions: fetchSingle, create, replace e update.

Hoje Utilizamos 2 bibliotecas com propósitos diferentes que são compativeis com o asteroid para lidar com o Vuex, elas são:
[VuexStoreModule](https://github.com/bildvitta/vuex-store-module) e [VuexOffline](https://github.com/bildvitta/vuex-offline).

Para fazer esses exemplos na documentação, estamos utilizando o `VuexOffline`, para saber mais, veja o código fonte da documentação.
:::

:::warning
Estamos utilizando nos exemplos um `custom-id` pois é necessario para conseguir utilizar os mocks de dados, **não** significa que você precisa sempre utiliza-lo para lidar com o id, na verdade na maioria das vezes você não vai precisar do `custom-id`, ele é para quando precisa de um caso de uso mais específico.
:::

:::tip
Este componente serve para lidar com **criação** e **edição** de dados.
:::

## Uso
<doc-example file="QasFormView/Basic" title="Básico" />

Aqui está alguns exemplos de como normalmente utilizamos este componente, lembrando que isto não é uma regra, porém na maioria das vezes você vai se deparar com códigos semelhantes a este.

<doc-example file="QasFormView/Create" title="Modo de criação (create)" />

<doc-example file="QasFormView/Edit" title="Modo de edição (replace)" />
