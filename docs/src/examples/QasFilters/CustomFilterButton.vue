<template>
  <div class="container spaced">
    <qas-filters :entity="entity">
      <template #filter-button="{ filter }">
        <qas-btn label="Filtrar" @click="filter({ name: 'John Doe' })" />
      </template>
    </qas-filters>
  </div>
</template>

<script>
export default {
  computed: {
    entity () {
      return 'users'
    }
  }
}
</script>
