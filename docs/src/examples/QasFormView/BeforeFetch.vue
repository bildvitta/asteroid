<template>
  <!-- Descartar essa div -->
  <div class="container spaced">
    <div class="q-pa-xl text-center">
      <qas-btn @click="resolve">Clique aqui para fazer o fetch!</qas-btn>
    </div>
    <qas-form-view v-model="values" v-model:errors="errors" v-model:fields="fields" :before-fetch="onBeforeFetch" :cancel-route="cancelRoute" :custom-id="customId" :entity="entity" mode="replace" :use-boundary="false" @submit-success="onSubmitSuccess">
      <template #header>
        <qas-page-header :breadcrumbs="breadcrumbs" title="Editar usuário">
          <qas-actions-menu :delete-props="{ entity: 'users', customId: 'custom-id-test' }" />
        </qas-page-header>
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

    <qas-box v-if="isFormSubmitted">Item foi editado com sucesso!</qas-box>
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
      isFormSubmitted: false,
      resolve: null
    }
  },

  computed: {
    entity () {
      return 'users'
    },

    // USAR SOMENTE SE NECESSÁRIO, AQUI PEGAMOS O ID DO USUÁRIO NO NOSSO MOCK DE DADOS
    customId () {
      return '31362c39-2cb5-4fe2-982a-c270f88d2462'
    },

    // ESTAMOS USANDO O CANCEL ROUTE NESTE CASO SOMENTE POR CAUSA DA DOCUMENTAÇÃO
    // USE SOMENTE SE NECESSÁRIO
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
    },

    onBeforeFetch ({ resolve }) {
      this.resolve = resolve
    }
  }
}
</script>
