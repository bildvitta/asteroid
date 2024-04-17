<template>
  <qas-form-view v-model="values" v-model:fields="fields" :cancel-route="cancelRoute" v-bind="formViewProps">
    <template #default>
      <qas-form-generator v-model="values" :fields="formattedFields" />
    </template>
  </qas-form-view>

  <div class="full-width q-my-md">
    <qas-btn label="Mudar título do segundo step" @click="changeStepTitle" />
  </div>

  Payload mergeado com a página 1: <qas-debugger :inspect="[values]" />
</template>

<script setup>
import { ref, inject, computed } from 'vue'

defineOptions({ name: 'SecondStep' })

// Através do inject do stepper, é possível você ter ações que o componente fornece.
const stepper = inject('stepper')

const fields = ref({})

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

const formattedFields = computed(() => {
  if (!Object.keys(fields.value).length) return {}

  const { phone, document } = fields.value

  return { phone, document }
})

// função para voltar para o step anterior.
function cancelRoute () {
  stepper.previous()
}

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
