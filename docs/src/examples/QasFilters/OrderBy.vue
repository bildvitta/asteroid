<template>
  <div class="container spaced">
    <qas-filters v-bind="filtersProps" />
  </div>
</template>

<script setup>
defineOptions({ name: 'OrderBy' })

const filtersProps = {
  entity: 'users',

  orderByOptions: [
    {
      label: 'Mais recentes',
      value: 'created_at_desc'
    },
    {
      label: 'Mais antigos',
      value: 'created_at_asc'
    }
  ],

  fieldsProps: {
    company: {
      label: 'Alterado label pelo fieldsProps!'
    }
  }
}
</script>
