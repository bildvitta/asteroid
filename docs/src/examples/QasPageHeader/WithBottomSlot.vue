<template>
  <div class="container spaced">
    <qas-page-header :breadcrumbs="breadcrumbs" title="Nome do usuário">
      <template #bottom>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Unde vel voluptatum quasi ab, temporibus recusandae aut natus magni mollitia ad cupiditate sapiente modi commodi, qui eveniet, incidunt deserunt delectus tempora.
      </template>
    </qas-page-header>
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
    }
  }
}
</script>
