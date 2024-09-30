<template>
  <div class="container spaced">
    <qas-header v-bind="headerProps" />
  </div>
</template>

<script setup>
defineOptions({ name: 'HeaderWithFilters' })

const headerProps = {
  filtersProps: {
    entity: 'users'
  },

  labelProps: {
    label: 'Com filtro'
  },

  description: 'lorem ipsum dolor sit amet consectetur adipiscing elit'
}
</script>
