<template>
  <div>
    <div class="q-pa-xl text-center">
      <qas-btn @click="resolve">Clique aqui para fazer o fetch!</qas-btn>
    </div>
    <qas-single-view v-model:fields="fields" v-model:result="result" :before-fetch="onBeforeFetch" :custom-id="customId" :entity="entity">
      <template #header>
        <qas-page-header :breadcrumbs="breadcrumbs" title="Lista de materiais" />
      </template>

      <template #default>
        <div>
          <qas-grid-generator :fields="fields" :result="result" />
        </div>
      </template>
    </qas-single-view>
  </div>
</template>

<script>
export default {
  name: 'UsersList',

  data () {
    return {
      fields: {},
      errors: {},
      result: [],
      metadata: {},
      resolve: null
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
      return '31362c39-2cb5-4fe2-982a-c270f88d2462'
    }
  },

  methods: {
    onBeforeFetch ({ resolve, done }) {
      this.resolve = resolve

      // executa o método "onBeforeFetch" apenas uma vez
      done()
    }
  }
}
</script>
