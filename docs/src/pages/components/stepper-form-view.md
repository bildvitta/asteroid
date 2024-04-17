---
title: QasStepperFormView
---

Trocar depois

<doc-api file="stepper-form-view/QasStepperFormView" name="QasStepperFormView" />

## Uso

<doc-example file="QasStepperFormView/Basic" title="Básico" />

:::warning
Siga os exemplos de como utilizar as funções fornecidas pelo componente através do inject.
Os componentes de página estão todos comentados.
:::

Página 1:
```js
<template>
  <qas-form-view v-model="values" v-model:fields="fields" :cancel-route="false" v-bind="formViewProps" @submit-success="onSubmitSuccess">
    <template #default>
      <qas-form-generator v-model="values" :fields="fields" />
    </template>
  </qas-form-view>
</template>

<script setup>
// Através do inject do stepper, é possível você ter ações/atributos fornecidos pelo componente.
const stepper = inject('stepper')

const formViewProps = computed(() => {
  return {
    /* É possível pegar as props passadas para o componente (QasStepperFormView),
    * sendo uma boa prática para pegar propriedades que são comuns entre as páginas (entity, mode, etc)
    */
    ...,
    ...stepper.formViewProps.value
  }
})

function onSubmitSuccess (payload) {
  /* Avança para o próximo step, passando o payload da página, para que
  * na próxima página tenha acesso ao dados para efetuar o merge.
  */
  stepper.next({ payload: payload.data.result })
}
</script>
```

Página 2:
```js
<template>
  <qas-form-view v-model="values" v-model:fields="fields" :cancel-route="cancelRoute" v-bind="formViewProps">
    <template #default>
      <qas-form-generator v-model="values" :fields="fields" />
    </template>
  </qas-form-view>

  <div class="full-width q-my-md">
    <qas-btn label="Mudar título do segundo step" @click="changeStepTitle" />
  </div>

  Payload mergeado com a página 1: <qas-debugger :inspect="[values]" />
</template>

<script setup>
// Através do inject do stepper, é possível você ter ações que o componente fornece.
const stepper = inject('stepper')

/*
* Payload mergeado com a página 1 para ser enviado o payload completo para API.
*/
const values = ref({ ...stepper.steppersValues.value })

const formViewProps = computed(() => {
  return {
    /* É possível pegar as props passadas para o componente (QasStepperFormView),
    * sendo uma boa prática para pegar propriedades que são comuns entre as páginas (entity, mode, etc)
    */
    ...stepper.formViewProps.value
  }
})

// Função para voltar para o step anterior.
function cancelRoute () {
  stepper.previous()
}

// É possível alterar as props de um determinado step através da função "setStepProps".
function changeStepTitle () {
  stepper.setStepProps({
    step: 2,
    payload: {
      title: 'Titulo alterado',
      caption: 'Caption',
      prefix: 2
    }
  })
}
</script>

```