<template>
  <div class="container spaced">
    <qas-filters v-model:currentFilters="currentFilters" :entity="entity" :use-update-route="false" />
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
  }
}
</script>
