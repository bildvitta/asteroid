<template>
  <div class="container q-py-lg">
    <qas-actions-menu :delete-props="{ entity: 'users', customId: 'my-custom-id-from-user', onSuccess: onDeleteSuccess }" />
  </div>
</template>

<script>
export default {
  methods: {
    onDeleteSuccess () {
      alert('fui deletado com sucesso!')
    }
  }
}
</script>
