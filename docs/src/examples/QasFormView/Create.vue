<template>
  <!-- Descartar essa div -->
  <div class="container spaced">
    <qas-form-view v-model="values" v-model:errors="errors" v-model:fields="fields" :cancel-route="cancelRoute" :entity="entity" @submit-success="onSubmitSuccess">
      <template #header>
        <qas-page-header :breadcrumbs="breadcrumbs" title="Criar novo usuário" />
      </template>

      <template #filter>
        <div class="bg-positive q-my-lg q-pa-lg">
          Template do filter.
        </div>
      </template>

      <template #default>
        <div>
          <qas-form-generator v-model="values" :errors="errors" :fields="fields" />
        </div>
      </template>
    </qas-form-view>

    v-model: <qas-debugger :inspect="[values]" />

    <qas-box v-if="isFormSubmitted">Item foi criado com sucesso!</qas-box>
  </div>
</template>

<script>
export default {
  name: 'UsersList',

  data () {
    return {
      fields: {},
      errors: {},
      values: {},
      metadata: {},
      isFormSubmitted: false
    }
  },

  computed: {
    entity () {
      return 'users'
    },

    cancelRoute () {
      return '/'
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
    }
  },

  methods: {
    onSubmitSuccess () {
      this.isFormSubmitted = true
    }
  }
}
</script>
