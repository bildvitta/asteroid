<template>
  <qas-single-view v-model:fields="fields" v-model:result="result" :custom-id="customId" :entity="entity">
    <template #header>
      <div class="bg-positive q-pa-lg">
        Template do header.
      </div>
    </template>

    <template #filter>
      <div class="bg-positive q-my-lg q-pa-lg">
        Template do filter.
      </div>
    </template>

    <template #default>
      <div class="bg-positive q-my-lg q-pa-lg">
        Template default
        <div>
          Result: <qas-debugger :inspect="[result]" />
        </div>
        <div>
          Fields: <qas-debugger :inspect="[fields]" />
        </div>
      </div>
    </template>

    <template #footer>
      <div class="bg-positive q-my-lg q-pa-lg">
        template footer
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

    // USAR SOMENTE SE NECESSARIO, AQUI PEGAMOS O ID DO USUARIO NO NOSSO MOCK DE DADOS
    customId () {
      return '31362c39-2cb5-4fe2-982a-c270f88d2462'
    }
  }
}
</script>
