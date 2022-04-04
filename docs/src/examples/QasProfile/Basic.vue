<template>
  <qas-single-view v-model:fields="fields" v-model:result="result" :custom-id="customId" :entity="entity">
    <template #header>
      <qas-profile :fields="fields" :list="['name', 'email']" :result="result" title="Título" />
    </template>
  </qas-single-view>
</template>

<script>
export default {
  name: 'UsersList',

  data () {
    return {
      fields: {},
      result: []
    }
  },

  computed: {
    entity () {
      return 'users'
    },

    // USAR SOMENTE SE NECESSÁRIO, AQUI PEGAMOS O ID DO USUÁRIO NO NOSSO MOCK DE DADOS
    customId () {
      return '31362c39-2cb5-4fe2-982a-c270f88d2462'
    }
  }
}
</script>
