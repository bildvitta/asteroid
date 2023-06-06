<template>
  <div class="container spaced">
    <qas-filters :entity="entity" search-placeholder="Pesquisar por nome do usuário" :use-search-on-type="true" />
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
