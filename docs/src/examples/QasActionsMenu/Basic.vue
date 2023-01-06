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
          icon: 'sym_r_visibility',
          label: 'Visualizar',
          handler: () => alert('handler ativado')
        },
        edit: {
          icon: 'sym_r_create',
          label: 'Editar',
          handler: () => alert('handler ativado')
        }
      }
    }
  }
}
</script>
