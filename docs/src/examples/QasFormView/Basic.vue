<template>
  <qas-form-view v-model="values" v-model:fields="fields" :entity="entity">
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
          values: <qas-debugger :inspect="[values]" />
        </div>
        <div>
          Fields: <qas-debugger :inspect="[fields]" />
        </div>
      </div>
    </template>

    <template #actions>
      <div class="bg-positive q-my-lg q-pa-lg">
        template actions
      </div>
    </template>

    <template #footer>
      <div class="bg-positive q-my-lg q-pa-lg">
        template footer
      </div>
    </template>
  </qas-form-view>
</template>

<script>
export default {
  name: 'UsersList',

  data () {
    return {
      fields: {},
      errors: {},
      values: {},
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
