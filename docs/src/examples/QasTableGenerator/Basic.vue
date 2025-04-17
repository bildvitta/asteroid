<template>
  <qas-table-generator :fields :results v-bind="tableGeneratorProps" />
</template>

<script setup>
import { fields, results } from 'src/mocks/users'

defineOptions({ name: 'Basic' })

const tableGeneratorProps = {
  columns: [{ sortable: false, name: 'isActive' }, 'name', 'createdAt', 'date']
}
</script>
