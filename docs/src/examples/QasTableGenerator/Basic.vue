<template>
  <qas-table-generator :columns :fields :results />
</template>

<script setup>
import { fields, results } from 'src/mocks/users'

defineOptions({ name: 'Basic' })

const columns = [{ sortable: false, name: 'isActive' }, 'name', 'createdAt', 'date']
</script>
