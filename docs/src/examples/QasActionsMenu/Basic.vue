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
        delete: {
          icon: 'o_delete',
          label: 'Delete',
          handler: () => alert('handler ativado')
        }
      }
    }
  }
}
</script>
