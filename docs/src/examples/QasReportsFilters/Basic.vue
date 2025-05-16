<template>
  <div class="container spaced">
    <qas-reports-filters
      v-model="filtersModel"
      v-bind="reportsFiltersProps"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'

defineOptions({ name: 'Basic' })

const filtersModel = ref({})

const reportsFiltersProps = {
  entity: 'users',
  label: 'Titulo do filtro',
  description: 'Descrição do filtro',
  url: 'users'
}
</script>
