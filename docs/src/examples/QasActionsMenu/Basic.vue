<template>
  <div class="container q-py-lg">
    <qas-actions-menu :list="list" />
  </div>
</template>

<script>
export default {
  computed: {
    list () {
      return {
        visibility: {
          icon: 'o_visibility',
          label: 'Visualizar',
          handler: () => alert('handler ativado')
        }
      }
    }
  }
}
</script>
