<template>
  <div class="container spaced">
    <qas-filters v-model:current-filters="currentFilters" :entity="entity" search-placeholder="Pesquisar por nome do usuário" :use-update-route="false" />
  </div>
</template>

<script>
export default {
  data () {
    return {
      currentFilters: {}
    }
  },

  computed: {
    entity () {
      return 'users'
    }
  },

  watch: {
    currentFilters (query) {
      // console.log(query)
    }
  }
}
</script>
