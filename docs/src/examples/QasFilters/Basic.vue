<template>
  <div class="container spaced">
    <qas-filters :entity="entity" />
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
