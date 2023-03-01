<template>
  <div class="container q-py-lg">
    <qas-actions-menu :button-props="{ color2: 'white' }" color="white" :delete-props="{ deleteActionParams: { entity: 'users', id: 'my-custom-id-from-user' } }" :list="list" :use-hover-on-white-color="false" />
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
