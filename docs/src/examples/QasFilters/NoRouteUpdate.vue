<template>
  <div class="container spaced">
    <qas-filters :entity="entity" search-placeholder="Pesquisar por nome do usuário" :use-update-route="false" @clear="onClear" @filter="onFilter" />
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
    onFilter (query) {
      console.log(query)
    },

    onClear (query) {
      console.log(query)
    }
  }
}
</script>
