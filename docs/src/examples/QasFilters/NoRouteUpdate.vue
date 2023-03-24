<template>
  <div class="container spaced">
    <qas-filters :entity="entity" :use-update-route="false" @update:current-filters="onUpdateCurrentFilters" />
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
    onUpdateCurrentFilters (query) {
      // console.log(query)
    }
  }
}
</script>
