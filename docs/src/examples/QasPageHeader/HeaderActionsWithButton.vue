<template>
  <div class="container spaced">
    <qas-page-header :breadcrumbs="breadcrumbs" :header-actions-props="headerActionsProps" title="Nome do usuário" />
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

    headerActionsProps () {
      return {
        description: 'Algum texto de exemplo para ficar ao lado do botão de adicionar.',
        buttonProps: {
          icon: 'o_add',
          label: 'Novo usuário'
        }
      }
    }
  }
}
</script>
