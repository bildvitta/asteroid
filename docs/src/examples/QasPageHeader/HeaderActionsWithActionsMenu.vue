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
        text: 'Algum texto de exemplo para ficar ao lado do botão de adicionar.',
        actionsMenuProps: {
          deleteProps: {
            entity: 'users'
          },
          list: {
            add: {
              label: 'Novo usuário',
              icon: 'sym_r_add'
            }
          }
        }
      }
    }
  }
}
</script>
