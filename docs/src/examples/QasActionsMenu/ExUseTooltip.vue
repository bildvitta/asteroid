<template>
  <div class="container q-py-lg">
    <qas-actions-menu :delete-props="{ deleteActionParams: { entity: 'users', id: 'my-custom-id-from-user', onDeleteSuccess } }" :use-label="false" use-tooltip />
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
