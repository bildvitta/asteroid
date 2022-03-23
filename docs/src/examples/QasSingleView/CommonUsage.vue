<template>
  <qas-single-view v-model:fields="fields" v-model:result="result" :custom-id="customId" :entity="entity">
    <template #header>
      <qas-page-header :breadcrumbs="breadcrumbs" title="Lista de materiais" />
    </template>

    <template #default>
      <div>
        <qas-grid-generator :fields="fields" :result="result" />
      </div>
    </template>
  </qas-single-view>
</template>

<script>
export default {
  name: 'UsersList',

  data () {
    return {
      fields: {},
      errors: {},
      result: [],
      metadata: {}
    }
  },

  computed: {
    entity () {
      return 'users'
    },

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
    },

    // USAR SOMENTE SE NECESSARIO, AQUI PEGAMOS O ID DO USUARIO NO NOSSO MOCK DE DADOS
    customId () {
      return '31362c39-2cb5-4fe2-982a-c270f88d2462'
    }
  }
}
</script>
