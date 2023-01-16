<template>
  <div class="container q-py-lg">
    <qas-actions-menu :delete-props="{ entity: 'users', customId: 'my-custom-id-from-user', onSuccess: onDeleteSuccess }" :use-label="false" />
  </div>
</template>

<script>
export default {
  methods: {
    onDeleteSuccess () {
      this.$qas.success('fui deletado com sucesso!')
    }
  }
}
</script>
