<template>
  <div class="container spaced">
    <qas-page-header :breadcrumbs="breadcrumbs" title="Meu título!">
      <qas-btn hide-mobile-label icon="o_add" label="Alguma ação!" />
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
          label: 'Início',
          route: { path: '/' }
        },
        {
          label: 'Algum caminho',
          route: { path: '/' }
        },
        {
          label: 'Users'
        }
      ]
    }
  }
}
</script>
