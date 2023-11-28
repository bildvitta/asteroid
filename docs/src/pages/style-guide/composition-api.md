---
title: Composition API
---

Este **Guia de Estilo** estabelece os padrões que devem ser seguidos ao desenvolver componentes/paginas usando a *Composition API*, abrangendo tanto aplicações que empregam o Asteroid quanto aquelas que não o fazem (Frontend como um todo).

:::danger
Por enquanto, não utilize a Composition API nas aplicações. Estamos atualmente em fase de testes e definição de padrões.
:::

### 1. Composables
Para saber mais sobre composables clique [aqui](https://vuejs.org/guide/reusability/composables.html#composables).

- utilizar prefixo `use`.
- recomendado utilizar apenas 1 parâmetro sendo objeto.
- recomendado utilizar `JSDOC` para documentar o parâmetro para não perder o contexto.
- sempre que for possível, importar ao invés de passar por parâmetro, por exemplo `router`, é possível importar no seu composable ao invés de passar por parâmetro.
- recomendado deixar bem documentado.

```js
import { useRouter } from 'vue-router'

/**
 * @param {{
 *  props: { myProps: {} },
 *  myBooleanComputed: import('vue').ComputedRef<boolean>
 *  myStringRef: import('vue').Ref<string>
 * }} config
 */
export default function useHeader (config = {}) {
  const {
    props,
    myBooleanComputed,
    myStringRef
  } = config

  const router = useRouter()

  return {
    ...
  }
}

```

#### 1.1. Internos
Em determinadas situações, torna-se necessário criar composables dentro de nossos componentes, não com o intuito de reutilização, mas sim para organizar o código, especialmente em componentes com grande quantidade de conteúdo. Essa prática permite uma clara separação da lógica de negócio em diversos "blocos". Se houver a necessidade de criar apenas 1 composable, deve-se fazê-lo dentro do próprio componente. No entanto, se a criação de mais de 1 for exigida, é uma obrigação criar uma pasta chamada composables dentro da raiz do seu componente/página e desenvolver os composables lá.

##### 1.1.1. Paginas
Em paginas, utilizamos o sufixo da pagina para composables especifico da pagina, sendo eles:

- list
- single
- create
- edit
- form
- [custom]

Em casos onde um composable seja usado em mais de uma pagina, por exemplo `list` e `edit`, neste caso não adicionamos nenhum sufixo.

```bash
.
└── pages/
    └── users/
        ├── composables/
        │   ├── use-header-list.js # UsersList
        │   └── use-view-list.js # UsersList
        │   └── use-select-edit.js # UsersEdit
        │   └── use-select.js # UsersEdit e UsersList
        └── UsersList.vue
        └── UsersEdit.vue
```

##### 1.1.2. Componentes
Em components, não utilizamos nenhum sufixo para o composables, sendo o uso direto:

```bash
.
└── components/
    └── app-my-component/
        ├── composables/
        │   ├── use-header.js
        │   └── use-view.js # UsersList
        └── AppMyComponent.vue
```

### 2. ref vs reactive
No Vue, é possível adicionar reatividade de duas maneiras, o que pode parecer um pouco confuso à primeira vista. No entanto, **sempre** dê preferência à utilização de `ref` em vez de reactive, pelos seguintes motivos:

- Não é possível adicionar reatividade a valores primitivos com reactive, como `Boolean`, `String`, `Number`, etc. Nestes casos, apenas ref é capaz de resolver.
- É fácil identificar uma variável reativa mesmo sem o contexto do código, uma vez que um ref sempre terá um `.value`.
- É a forma mais amplamente utilizada pela comunidade.

Reserve o uso de reactive para casos muito específicos, como um objeto que contém várias informações.

### 3. Vue Macros
Sempre utilizar vue macros sem importar do vue.

- `defineOptions({ name: 'AppComponentName' })`
- `defineProps({ ... })`
- `defineEmits([...])`

#### 3.1 defineOptions
- obrigatório utilizar o defineOptions passando um name para o componente (sem quebrar a linha).
  ```html
  <script setup>
  defineOptions({ name: 'AppMyComponentName' })
  </script>
  ```

- quando passar mais de uma propriedade pro defineOptions, quebrar em mais de uma linha.
  ```html
  <script setup>
  defineOptions({
    name: 'AppMyComponentName',
    inheritAttrs: false
  })
  </script>
  ```

#### 3.2 defineProps
- Sempre atribuir uma const `props` ao defineProps, e utiliza-lo mesmo no template.
- Nunca desestruturar o `props`, uma vez que da mais contexto utilizar `props.myProp`.

```html
<template>
  <qas-my-component label="props.label" />
</template>

<script setup>
const props = defineProps({
  label: {
    type: String,
    default: ''
  }
})
</script>
```

### 4. script setup
**Sempre** utilizar `<script setup>` para Composition API.
