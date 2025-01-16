<template>
  <qas-select v-model="internalModel" :label="props.label" :options="props.options" @update:model-value="onUpdateModel" />
</template>

<script setup>
import useFilterSelect from '../../composables/use-filter-select'

import { watch, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'

defineOptions({ name: 'QasSelectFilter' })

const props = defineProps({
  label: {
    type: String,
    default: 'Selecione a empresa'
  },

  name: {
    type: String,
    default: 'company'
  },

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
const router = useRouter()
const route = useRoute()
const { setFilterQuery } = useFilterSelect()

// models
const model = defineModel({ type: String, default: '' })

// refs
const internalModel = ref(route.query[props.name] || model.value)

// watch
watch(() => route.query[props.name], setModels)

// functions
/**
 * Adiciona o valor na URL, atualizando a rota, isto vai fazer com que o componente
 * seja atualizado com o novo valor, pois cai no watch que atualiza o model interno e externo.
 */
function onUpdateModel (value) {
  router.push({ query: { [props.name]: value } })
}

function setModels (value) {
  model.value = value
  internalModel.value = value

  setFilterQuery(value, props.name)
}
</script>
