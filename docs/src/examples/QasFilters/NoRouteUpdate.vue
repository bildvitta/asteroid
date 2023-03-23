<template>
  <div class="container spaced">
    <qas-filters :entity="entity" search-placeholder="Pesquisar por nome do usuário" :use-update-route="false" @update="onFilterUpdate" />
  </div>
</template>

<script>
export default {
  computed: {
    entity () {
      return 'users'
    }
  },

  methods: {
    onFilterUpdate (query) {
      console.log(query)
    }
  }
}
</script>
