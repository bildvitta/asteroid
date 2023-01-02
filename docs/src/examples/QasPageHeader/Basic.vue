<template>
  <div class="container spaced">
    <qas-page-header :breadcrumbs="breadcrumbs" :button-props="addButton" title="Nome do usuário" />
  </div>
</template>

<script>
export default {
  name: 'UsersList',

  computed: {
    breadcrumbs () {
      return [
        {
          label: 'Lista de usuários',
          route: { path: '/' }
        },
        {
          label: 'Usuário',
          route: { path: '/' }
        },
        {
          label: 'Nome do usuário',
          route: { path: '/components/page-header' }
        }
      ]
    },

    addButton () {
      return {
        icon: 'o_add',
        label: 'Novo usuário'
      }
    }
  }
}
</script>
