<template>
  <!-- Descartar essa div -->
  <div class="container spaced">
    <qas-form-view v-model="values" v-model:errors="errors" v-model:fields="fields" :before-submit="onBeforeSubmit" :cancel-route="cancelRoute" :custom-id="customId" :entity="entity" mode="replace" :use-boundary="false" @submit-success="onSubmitSuccess">
      <template #header>
        <qas-page-header :breadcrumbs="breadcrumbs" title="Editar usuário">
          <qas-actions-menu :delete-props="{ entity: 'users', customId: 'custom-id-test' }" />
        </qas-page-header>
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
      isFormSubmitted: false
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

    onBeforeSubmit ({ resolve }) {
      this.$qas.dialog({
        card: {
          title: 'Atenção',
          description: 'Você tem certeza que deseja continuar com esta ação?'
        },
        cancel: {
          label: 'Não'
        },
        ok: {
          label: 'Sim',
          onClick: resolve
        }
      })
    }
  }
}
</script>
