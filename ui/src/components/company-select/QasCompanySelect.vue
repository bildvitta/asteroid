<template>
  <qas-select v-model="company" label="Selecione a empresa" :options="props.options" @update:model-value="setCompany" />
</template>

<script>
export default {
  beforeRouteEnter: (to, from, next) => {
    console.log('TCL: beforeRouteEnter -> to', to)
    // ...

    // next({ query: { test: 'eao' } })
  },
  created () {
    console.log('TCL: created -> this.$route.query', this.$route.query)
  }
}
</script>

<script setup>
import useCompany from '../../composables/use-company'

import { watch, onBeforeMount } from 'vue'
// import { computed, watch, onBeforeMount } from 'vue'

defineOptions({ name: 'QasCompanySelect' })

const props = defineProps({
  options: {
    type: Array,
    default: () => [
      {
        label: 'Empresa 1',
        value: '1'
      },
      {
        label: 'Empresa 2',
        value: '2'
      },
      {
        label: 'Empresa 3',
        value: '3'
      },
      {
        label: 'Empresa 4',
        value: '4'
      },
      {
        label: 'Empresa 5',
        value: '5'
      }
    ]
  }
})

// composables
const { company, setCompany, setCompanyInStorage, onCompanyChange } = useCompany()

// models
const model = defineModel({ type: String, default: '' })

// emits
const emits = defineEmits(['company-change'])

// watch
watch(() => props.options, setDefaultValue, { immediate: true, deep: true })

// hooks
onBeforeMount(() => {
  const defaultValue = company.value || props.options[0]?.value

  if (defaultValue) {
    model.value = defaultValue
  }
})

// custom hook
onCompanyChange(company => {
  model.value = company

  emits('company-change', company)
})

// computed
// const firstOptionValue = computed(() => props.options[0]?.value)

// functions
function setDefaultValue (options) {
  if (!options.length || company.value) return

  model.value = props.options[0]?.value
  company.value = props.options[0]?.value

  setCompanyInStorage(props.options[0]?.value)
}
</script>
