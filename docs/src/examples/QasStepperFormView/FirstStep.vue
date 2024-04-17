<template>
  <qas-form-view v-model="values" v-model:fields="fields" :before-submit="onBeforeSubmit" :cancel-route="false" v-bind="formViewProps">
    <template #default>
      <qas-form-generator v-model="values" :fields="formattedFields" />
    </template>
  </qas-form-view>

  v-model: <qas-debugger :inspect="[values]" />
</template>

<script setup>
import { ref, inject, computed } from 'vue'

defineOptions({ name: 'FirstStep' })

const fields = ref({})
const values = ref({})

/*
 * Através do inject do stepper, é possível você ter ações que o componente fornece.
 */
const stepper = inject('stepper')

const formattedFields = computed(() => {
  if (!Object.keys(fields.value).length) return {}

  const { company, name } = fields.value

  return { company, name }
})

const formViewProps = computed(() => {
  return {
    /* É possível pegar as props passadas para o componente (QasStepperFormView),
     * sendo uma boa prática para pegar propriedades que são comuns entre as páginas (entity, mode, etc)
     */
    ...stepper.formViewProps.value
  }
})

/*
 * O correto seria usar no submit-success, porém para
 * simulação na documentação foi feito dessa forma.
 */
function onBeforeSubmit ({ payload }) {
  /* Avança para o próximo step, passando o payload da página, para que
   * na próxima página tenha acesso ao dados para efetuar o merge.
   */
  stepper.next({ payload: payload.payload })
}
</script>
