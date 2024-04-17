<template>
  <qas-stepper ref="stepper" v-model="model" :keep-alive-include="stepsList">
    <template #default>
      <q-step v-for="(step, stepIndex) in props.steps" :key="stepIndex" :done="isDone(stepIndex)" :name="getStepName(stepIndex)" v-bind="stepPropsList[stepIndex]">
        <component :is="step.component" />
      </q-step>
    </template>
  </qas-stepper>
</template>

<script setup>
import { defineModel, ref, provide, computed } from 'vue'

defineOptions({ name: 'QasStepperFormView' })

const props = defineProps({
  steps: {
    type: Array,
    required: true
  },

  formViewProps: {
    type: Object,
    default: () => ({})
  }
})

const model = defineModel({ type: [String, Number] })

const values = ref({})

const stepPropsList = ref([])

const stepper = ref(null)

setStepProps({ payload: [...props.steps.map(step => step.stepProps)] })

const formattedFormViewProps = computed(() => {
  return {
    useBoundary: false,
    useNotifySuccess: false,
    ...props.formViewProps
  }
})

const stepsList = computed(() => props.steps.map((_, stepIndex) => stepIndex + 1))

function setStepProps ({ step, payload }) {
  if (step) {
    stepPropsList.value[step - 1] = payload
  } else {
    stepPropsList.value = payload
  }
}

/*
* - Merge do payload com objetivo de enviar o payload completo de todos steps no stepper final
* - É possível ir para um step especifico ou somente ir para o próximo.
*/
function nextStep ({ payload = {} }) {
  Object.assign(values.value, payload)

  stepper.value.next()
}

function isDone (stepIndex) {
  return model.value > stepIndex + 1
}

function getStepName (stepIndex) {
  return stepIndex + 1
}

provide('stepper', {
  currentStep: model,
  formViewProps: formattedFormViewProps,
  goTo: step => stepper.value.goTo(step),
  next: nextStep,
  previous: () => stepper.value.previous(),
  setStepProps,
  stepsValues: values
})
</script>
