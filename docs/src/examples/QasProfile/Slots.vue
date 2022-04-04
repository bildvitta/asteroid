<template>
  <qas-single-view v-model:fields="fields" v-model:result="result" :custom-id="customId" :entity="entity">
    <template #header>
      <qas-profile :fields="fields" :list="['name', 'email']" :result="result" title="Título">
        <template #field-name="{ field }">
          <div>
            <qas-debugger :inspect="[field]" />
          </div>
        </template>
      </qas-profile>

      <div class="q-my-lg">Slot default</div>
      <qas-profile :fields="fields" :list="['name', 'email']" :result="result" title="Título">
        <template #default>
          <div>
            Substituindo todo o title e subtitle
          </div>
        </template>
      </qas-profile>

      <div class="q-my-lg">Slot grid</div>
      <qas-profile :fields="fields" :list="['name', 'email']" :result="result" title="Título">
        <template #grid>
          <div>
            Substituindo todo o QasGridGenerator!
          </div>
        </template>
      </qas-profile>
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
