<template>
  <div class="container q-py-lg">
    <qas-actions-menu color="primary" :delete-props="{ entity: 'users', customId: 'my-custom-id-from-user', }" :list="list" split-name="delete" />
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
        delete: {
          icon: 'sym_r_create',
          label: 'deletar',
          handler: () => alert('handler ativado')
        },
        user: {
          icon: 'sym_r_person',
          label: 'usuário',
          handler: () => alert('handler ativado')
        }
      }
    }
  }
}
</script>
