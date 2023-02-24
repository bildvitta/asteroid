<template>
  <div class="container q-py-lg">
    <qas-actions-menu color="primary" :list="list" split-name="visibility" @click="teste" />
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
        },
        user: {
          icon: 'sym_r_person',
          label: 'usuário',
          handler: () => alert('handler ativado')
        }
      }
    }
  },

  methods: {
    teste () {
      console.log('PELO LADO DE FORA MANO')
    }
  }
}
</script>
