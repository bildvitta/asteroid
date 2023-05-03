<template>
  <div class="container spaced">
    <qas-filters :entity="entity" :fields-props="fieldsProps" search-placeholder="Pesquisar por nome do usuário" />
  </div>
</template>

<script>
export default {
  computed: {
    entity () {
      return 'users'
    },

    fieldsProps () {
      return {
        company: {
          label: 'Alterado label pelo fieldsProps!'
        }
      }
    }
  }
}
</script>
