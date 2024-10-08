---
title: QasSingleView
---

Componente para C.R.U.D. responsável pela visualização (Read) ou conhecido também como "show".

<doc-api file="single-view/QasSingleView" name="QasSingleView" />

:::danger
#### useStore
- Utilize esta propriedade como "false" apenas em casos específicos como quando precisar utilizar este componente dentro de um dialog.
- Caso esteja usando "useStore" como "false", e esteja passando a propriedade "entity", o componente tentará criar uma url automaticamente transformando entity em `kebab-case` e concatenando com o id da URL caso exista, é possível sobrescrever passando a prop "url".
:::

:::warning
Este componente depende do `Vuex` ou `Pinia` caso esteja utilizando a propriedade `useStore: true`, utiliza módulos com actions, state e getters para manipular/recuperar os dados. Por exemplo, para você utilizar em uma entidade de show de usuários, você **deve** ter um modulo de `users` e dentro de dele ter os seguinte requisitos:
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

:::warning
Devido este componente estar em Composition API, foi necessário definir quais métodos estarão expostos para se utilizar com [Template Refs](https://vuejs.org/guide/essentials/template-refs.html). Os métodos expostos foram:
- fetchSingle
- fetchHandler
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

<doc-example file="QasSingleView/CommonUsage" title="Normalmente utilizado" />

:::tip
O callback do `beforeFetch` recebe 2 parâmetros, `:before-submit="onBeforeSubmit({ payload, resolve, done })"`

##### payload: `Object` -> { id, payload, url }
Retorna `form`, `id`, `url` que serão enviados por parâmetros para a action do `fetchSingle`.

##### resolve: `Function` -> resolve({ ...payload })
Função que executa o método `fetch` dentro do `QasFormView`, você pode enviar como parâmetro algum payload para ser enviada para a action de fetch, adicionando ou sobrescrevendo os parâmetros atuais.
Por exemplo, sobrescrever a url enviada para a action:

##### resolve: `Function` -> done()
Função que para a execução do callback da propriedade `beforeFetch`, fazendo com que o método `fetchSingle` seja executado automaticamente quando a `rota` é atualizada.

```js
resolve({ url: 'minha-url-personalizada' })
```

Agora ao fazer o fetch, o valor da url enviada para a action do fetchSingle será `minha-url-personalizada`.
:::

<doc-example file="QasSingleView/BeforeFetch" title="Controlando fetch" />
