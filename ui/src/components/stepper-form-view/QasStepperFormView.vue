<template>
  <qas-stepper ref="stepper" v-model="model" :keep-alive-include="[1,2]">
    <template #default>
      <q-step
        v-for="(step, stepIndex) in props.steppers" :key="stepIndex" :done="isDone(stepIndex)"
        :name="stepName(stepIndex)" v-bind="stepPropsList[stepIndex]"
      >
        <component :is="step.component" />
      </q-step>
    </template>
  </qas-stepper>
</template>

<script setup>
import { defineModel, ref, provide, onMounted, computed } from 'vue'

defineOptions({ name: 'QasStepperFormView' })

const props = defineProps({
  steppers: {
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
const next = ref(null)
const previous = ref(null)
const goTo = ref(null)

setStepProps({ payload: [...props.steppers.map(step => step.stepProps)] })

onMounted(() => {
  next.value = stepper.value.next
  previous.value = stepper.value.previous
  goTo.value = stepper.value.goTo
})

const formattedFormViewProps = computed(() => {
  return {
    useBoundary: false,
    useNotifySuccess: false,
    ...props.formViewProps
  }
})

function setStepProps ({ step, payload }) {
  if (!step) {
    stepPropsList.value = payload
  } else {
    stepPropsList.value[step - 1] = payload
  }
}

/*
* - Merge do payload com objetivo de enviar o payload completo de todos steppers no stepper final
* - É possível ir para um step especifico ou somente ir para o próximo.
*/
function nextStep ({ payload = {} }) {
  Object.assign(values.value, payload)

  next.value()
}

function isDone (stepIndex) {
  return model.value > stepIndex + 1
}

function stepName (stepIndex) {
  return stepIndex + 1
}

provide('stepper', {
  currentStep: model,
  formViewProps: formattedFormViewProps,
  goTo: step => goTo.value(step),
  next: nextStep,
  previous: () => previous.value(),
  setStepProps,
  steppersValues: values
})
</script>
