---
title: QasDelete
---

Componente para C.R.U.D. responsável por deletar (Delete), que implementa o plugin `Delete`.


<doc-api file="delete/QasDelete" name="QasDelete" />

:::warning
Este componente depende do `Vuex`, utiliza módulos com actions, state e getters para manipular/recuperar os dados. Por exemplo, para você utilizar em uma entidade de show de usuários, você **deve** ter um modulo de `users` e dentro de dele ter os seguinte requisitos:
- actions: destroy.

Hoje Utilizamos 2 bibliotecas com propósitos diferentes que são compatíveis com o asteroid para lidar com o Vuex, elas são:
[VuexStoreModule](https://github.com/bildvitta/vuex-store-module) e [VuexOffline](https://github.com/bildvitta/vuex-offline).

Para fazer esses exemplos na documentação, estamos utilizando o `VuexOffline`, para saber mais, veja o código fonte da documentação.
:::

:::warning
Estamos utilizando nos exemplos um `custom-id` pois é necessário para conseguir utilizar os mocks de dados, **não** significa que você precisa sempre utiliza-lo para lidar com o id, na verdade na maioria das vezes você não vai precisar do `custom-id`, ele é para quando precisa de um caso de uso mais específico.
:::

:::tip
- É recomendado utilizar o plugin `Delete` ao invés do componente `QasDelete`.
- Este componente serve para lidar com **delete**.
- Este componente renderiza componentes dinamicamente através da prop `tag` o que significa que você pode utilizar qualquer prop/evento/slot do componente que você utilizou, por exemplo:
No exemplo abaixo estamos renderizando um `QasBtn` (que é o valor default da prop `tag`), com isto podemos utilizar todas as prop/evento/slot que este componente tem.
:::

## Uso
<doc-example file="QasDelete/Basic" title="Básico" />
