<template>
  <div class="container spaced">
    <qas-filters :entity="entity">
      <template #right-side>
        Seção direita
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
