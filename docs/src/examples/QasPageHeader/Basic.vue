<template>
  <div class="container spaced">
    <qas-page-header :breadcrumbs="breadcrumbs" title="Meu título!">
      <!-- <qas-btn icon="o_add" label="Alguma ação!" :use-label-on-small-screen="false" /> -->
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
          label: 'Algum caminho',
          route: { path: '/' }
        },
        {
          label: 'Algum caminho',
          route: { path: '/' }
        },
        {
          label: 'Algum caminho',
          route: { path: '/styles/background' }
        },
        {
          label: 'Page header',
          route: { path: '/components/page-header' }
        }
      ]
    }
  }
}
</script>
