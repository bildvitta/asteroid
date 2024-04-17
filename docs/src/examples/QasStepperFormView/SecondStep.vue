<template>
  <qas-form-view v-model="values" v-model:fields="fields" v-bind="formViewProps" :before-submit="beforeSubmit" :cancel-route="cancelRoute">
    <template #default>
      <qas-form-generator v-model="values" :fields="formattedFields" />
    </template>
  </qas-form-view>

  <div class="full-width q-my-md">
    <qas-btn label="Mudar título do segundo step" @click="changeStepTitle" />
  </div>

  <qas-box v-if="isFormSubmitted">
    Payload mergeado com a página 1 para o envio para API: <qas-debugger :inspect="[values]" />
  </qas-box>
</template>

<script setup>
import { ref, inject, computed } from 'vue'

defineOptions({ name: 'SecondStep' })

/*
 * Através do inject do stepper, é possível você ter ações que o componente fornece.
 */
const stepper = inject('stepper')

const fields = ref({})
const values = ref({})
const isFormSubmitted = ref(false)

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

/*
 * Função para voltar para o step anterior.
 */
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

function beforeSubmit () {
  /*
   * Precisou do destruction pq por ser mesmo formulario com mesmos fields,
   * a segunda página estava sobrepondo os valores do fields da primeira página.
   * Mas na prática irá ser spread com o "stepper.steppersValues.value".
   */
  const { phone, document } = values.value
  const { company, name } = stepper.stepsValues.value

  values.value = {
    phone,
    document,
    company,
    name
  }

  isFormSubmitted.value = true
}
</script>
