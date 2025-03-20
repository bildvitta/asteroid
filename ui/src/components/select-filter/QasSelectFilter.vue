<template>
  <qas-select v-model="internalModel" :label="props.label" :multiple="props.multiple" :options="props.options" use-filter-mode @update:model-value="onUpdateModel" />
</template>

<script setup>
import useDefaultFilters from '../../composables/use-default-filters'

import { extend } from 'quasar'
import { watch, ref, nextTick } from 'vue'
import { useRouter, useRoute } from 'vue-router'

defineOptions({ name: 'QasSelectFilter' })

const props = defineProps({
  label: {
    type: String,
    default: 'Selecione uma empresa vinculada'
  },

  name: {
    type: String,
    default: 'company'
  },

  options: {
    type: Array,
    default: () => []
  },

  multiple: {
    type: Boolean,
    default: true
  }
})

// composables
const router = useRouter()
const route = useRoute()
const { setFilterQuery, triggerDefaultFiltersChange, filterQuery } = useDefaultFilters()

console.log('CHAMADO AQUI 12')

// models
const model = defineModel({ type: [String, Array], default: '' })

// refs
const internalModel = ref(route.query[props.name] || model.value)
console.log('TCL: internalModel 2', internalModel)

// watch
watch(() => route.query[props.name], setModels)

// functions
/**
 * Adiciona o valor na URL, atualizando a rota, isto vai fazer com que o componente
 * seja atualizado com o novo valor, pois cai no watch que atualiza o model interno e externo.
 */
function onUpdateModel (value) {
  const { ...query } = route.query

  router.push({ query: { ...query, [props.name]: value } })
}

function setModels (value) {
  model.value = value
  internalModel.value = value

  const oldFilters = extend(true, {}, filterQuery.value)

  setFilterQuery(value, props.name)
  nextTick(() => triggerDefaultFiltersChange(filterQuery.value, oldFilters))
}
</script>
