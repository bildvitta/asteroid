<template>
  <div class="container spaced">
    <qas-page-header :breadcrumbs="breadcrumbs" title="Nome do usuário" />
  </div>
</template>

<script>
export default {
  name: 'UsersList',

  computed: {
    breadcrumbs () {
      return [
        {
          label: 'Lista de usuários com um nome muito longo',
          route: { path: '/' }
        },
        {
          label: 'Usuário com um nome muito longo',
          route: { path: '/' }
        },
        {
          label: 'Editar usuário',
          route: { path: '/components/page-header' }
        }
      ]
    }
  }
}
</script>
