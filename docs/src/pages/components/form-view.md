---
title: QasFormView
---

<div class="flex q-gutter-x-md">
  <doc-link title="Componente" name="QasBtn" to="/components/button" />
  <doc-link title="Componente" name="QasDialog" to="/components/dialog" />
  <doc-link title="Quasar Componente" name="QForm" href="https://quasar.dev/vue-components/form#introduction" />
   <doc-link title="Quasar Componente" name="QInnerLoading" href="https://quasar.dev/vue-components/inner-loading#qinnerloading-api" />
    <doc-link title="Quasar Componente" name="QPage" href="https://quasar.dev/layout/page#qpage-api" />
</div>

Componente para C.R.U.D. responsável pela pela criação (Create) e edição (Update).

<doc-api file="form-view/QasFormView" name="QasFormView" />

:::warning
Este componente depende do `Vuex`, utiliza módulos com actions, state e getters para manipular/recuperar os dados. Por exemplo, para você utilizar em uma entidade de show de usuários, você **deve** ter um modulo de `users` e dentro de dele ter os seguinte requisitos:
- state: list.
- getters: list e byId.
- actions: fetchSingle, create, replace e update.

Hoje Utilizamos 2 bibliotecas com propósitos diferentes que são compatíveis com o asteroid para lidar com o Vuex, elas são:
[VuexStoreModule](https://github.com/bildvitta/vuex-store-module) e [VuexOffline](https://github.com/bildvitta/vuex-offline).

Para fazer esses exemplos na documentação, estamos utilizando o `VuexOffline`, para saber mais, veja o código fonte da documentação.
:::

:::warning
Estamos utilizando nos exemplos um `custom-id` pois é necessário para conseguir utilizar os mocks de dados, **não** significa que você precisa sempre utiliza-lo para lidar com o id, na verdade na maioria das vezes você não vai precisar do `custom-id`, ele é para quando precisa de um caso de uso mais específico.
:::

:::tip
Este componente serve para lidar com **criação** e **edição** de dados.
:::

## Uso
<doc-example file="QasFormView/Basic" title="Básico" />

Aqui está alguns exemplos de como normalmente utilizamos este componente, lembrando que isto não é uma regra, porém na maioria das vezes você vai se deparar com códigos semelhantes a este.

<doc-example file="QasFormView/Create" title="Modo de criação (create)" />

<doc-example file="QasFormView/Edit" title="Modo de edição (replace)" />

:::tip
O callback do `beforeSubmit` recebe 2 parâmetros, `:before-submit="onBeforeSubmit({ payload, resolve })"`

##### payload: `Object` -> { id, payload, url }
Retorna `id`, `payload` e `url` que serão enviados por parâmetros para a action do submit.

##### resolve: `Function` -> resolve({ ...payload })
Função que executa o método `submit` dentro do `QasFormView`, você pode enviar como parâmetro algum payload para ser enviada para a action de submit, adicionando ou sobrescrevendo os parâmetros atuais.
Por exemplo, sobrescrever a url enviada para a action:

```js
resolve({ url: 'minha-url-personalizada' })
```

Agora ao fazer o submit, o valor da url enviada para a action do submit será `minha-url-personalizada`.
:::

<doc-example file="QasFormView/BeforeSubmit" title="Controlando submit" />

:::tip
O callback do `beforeFetch` recebe 2 parâmetros, `:before-submit="onBeforeSubmit({ payload, resolve })"`

##### payload: `Object` -> { id, payload, url }
Retorna `form`, `id`, `url` que serão enviados por parâmetros para a action do `fetchSingle`.

##### resolve: `Function` -> resolve({ ...payload })
Função que executa o método `fetch` dentro do `QasFormView`, você pode enviar como parâmetro algum payload para ser enviada para a action de fetch, adicionando ou sobrescrevendo os parâmetros atuais.
Por exemplo, sobrescrever a url enviada para a action:

```js
resolve({ url: 'minha-url-personalizada' })
```

Agora ao fazer o fetch, o valor da url enviada para a action do fetchSingle será `minha-url-personalizada`.
:::

<doc-example file="QasFormView/BeforeFetch" title="Controlando fetch" />

