---
title: QasListView
---

Componente para C.R.U.D. responsável pela parte de listagem (Read).

<doc-api file="list-view/QasListView" name="QasListView" />

:::warning
Este componente depende do `Vuex`, utiliza módulos com actions, state e getters para manipular/recuperar os dados. Por exemplo, para você utilizar em uma entidade de listagem de usuários, você **deve** ter um modulo de `users` e dentro de dele ter os seguinte requisitos:
- state: list e totalPages.
- getters: list e totalPages.
- actions: fetchList (que vai popular o state de list e totalPages).

Hoje Utilizamos 2 bibliotecas com propósitos diferentes que são compatíveis com o asteroid para lidar com o Vuex, elas são:
[VuexStoreModule](https://github.com/bildvitta/vuex-store-module) e [VuexOffline](https://github.com/bildvitta/vuex-offline).

Para fazer esses exemplos na documentação, estamos utilizando o `VuexOffline`, para saber mais, veja o código fonte da documentação.
:::

:::tip
Este componente serve para lidar com **listagem**, se você precisar de um componente para lidar com um item unitário, como por exemplo, um unico usuário, use o componente `QasSingleView`.
:::

## Uso
<!-- <doc-example file="QasListView/Basic" title="Básico" /> -->

Aqui está um exemplo de como normalmente utilizamos este componente, lembrando que isto não é uma regra, em muitos casos por exemplo precisamos utilizar cards ao invés do `QasTable`, porém na maioria das vezes você vai se deparar com códigos semelhantes a este.

<doc-example file="QasListView/CommonUsage" title="Normalmente utilizado" />

Para usar `QasFilters` você não precisa fazer nada! Porém, em alguns casos, você pode precisar de algum filtro especifico ou alguma outra customização, para isto você pode usar o slot `filter`.

<!-- <doc-example file="QasListView/CustomFilter" title="Com filtro customizado" /> -->

:::tip
O callback do `beforeFetch` recebe 2 parâmetros, `:before-submit="onBeforeSubmit({ payload, resolve, done })"`

##### payload: `Object` -> { id, payload, url }
Retorna `form`, `id`, `url` que serão enviados por parâmetros para a action do `fetchList`.

##### resolve: `Function` -> resolve({ ...payload })
Função que executa o método `fetch` dentro do `QasFormView`, você pode enviar como parâmetro algum payload para ser enviada para a action de fetch, adicionando ou sobrescrevendo os parâmetros atuais.
Por exemplo, sobrescrever a url enviada para a action:

##### resolve: `Function` -> done()
Função que para a execução do callback da propriedade `beforeFetch`, fazendo com que o método `fetchList` seja executado automaticamente quando a `rota` é atualizada.

```js
resolve({ url: 'minha-url-personalizada' })
```

Agora ao fazer o fetch, o valor da url enviada para a action do fetchList será `minha-url-personalizada`.
:::

<!-- <doc-example file="QasListView/BeforeFetch" title="Controlando fetch" /> -->
