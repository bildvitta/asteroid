<template>
  <div class="container q-py-lg">
    <qas-actions-menu color="primary" :delete-props="{ deleteActionParams: { entity: 'users', id: 'my-custom-id' } }" :list="list" split-name="delete" />
  </div>
</template>

<script>
export default {
  computed: {
    list () {
      return {
        visibility: {
          icon: 'sym_r_visibility',
          label: 'Visualizar',
          handler: () => alert('handler ativado')
        },
        user: {
          icon: 'sym_r_person',
          label: 'usuário',
          handler: () => alert('handler ativado')
        },
        edit: {
          icon: 'sym_r_create',
          label: 'deletar',
          handler: () => alert('handler ativado')
        }
      }
    }
  }
}
</script>
