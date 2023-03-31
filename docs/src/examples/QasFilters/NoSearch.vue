<template>
  <div class="container spaced">
    <qas-filters :entity="entity" :use-search="false" :use-spacing="false" />
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
