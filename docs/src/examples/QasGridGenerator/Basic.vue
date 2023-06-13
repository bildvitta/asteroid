<template>
  <!-- Usando qas-single-view apenas para recuperar os dados -->
  <qas-single-view v-model:fields="fields" v-model:result="result" :custom-id="customId" :entity="entity">
    <template #default>
      <div>
        <qas-grid-generator :fields="fields" :gutter="gutter" :result="result" :use-empty-result="false" />
      </div>

      <q-btn @click="gutter = 'xl'" />
    </template>
  </qas-single-view>
</template>

<script>
export default {
  name: 'UsersList',

  data () {
    return {
      gutter: 'sm',
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

    // USAR SOMENTE SE NECESSÁRIO, AQUI PEGAMOS O ID DO USUÁRIO NO NOSSO MOCK DE DADOS
    customId () {
      return '3102fad5-f14c-45d4-98e9-46ef0aa9580e'
    }
  }
}
</script>
