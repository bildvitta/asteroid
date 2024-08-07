<template>
  <div class="container spaced">
    <qas-page-header :breadcrumbs="breadcrumbs" :header-props="headerProps" title="Nome do usuário" />
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

    headerProps () {
      return {
        text: 'Algum texto de exemplo para ficar ao lado do botão de adicionar.',
        buttonProps: {
          icon: 'sym_r_add',
          label: 'Novo usuário'
        }
      }
    }
  }
}
</script>
