<template>
  <qas-table-generator :fields :results v-bind="tableGeneratorProps">
    <!-- <qas-table-generator :columns :fields="fields" :fields-props :results="results" row-key="uuid"> -->
    <template #body-cell-name>
      <qas-toggle-visibility data-table-ignore-hover text="64.829.511/0001-01" />
    </template>
  </qas-table-generator>
</template>

<script setup>
import { fields, results } from 'src/mocks/users'

defineOptions({ name: 'Basic' })

const tableGeneratorProps = {
  columns: [{ sortable: false, name: 'isActive' }, 'document', 'createdAt', 'date']
}
</script>
