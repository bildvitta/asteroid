<template>
  <!-- Usando qas-single-view apenas para recuperar os dados -->
  <!-- <qas-single-view v-model:fields="fields" v-model:result="result" :custom-id="customId" :entity="entity">
    <template #default>
      <div>
        <qas-grid-generator :fields="fields" :result="result" />
      </div>
    </template>
  </qas-single-view> -->
  <div class="bg-red container q-pa-md">
    <pre>{{ result }}</pre>
    <qas-grid-generator :fields="fields" :result="result" use-box />

    <qas-btn label="atualizar" @click="update" />
  </div>
</template>

<script>
export default {
  name: 'UsersList',

  data () {
    return {
      fields: {
        company: {
          name: 'company',
          label: 'Empresa',
          type: 'select',
          options: [
            {
              label: 'Empresa 1',
              value: 'empresa-1'
            },
            {
              label: 'Empresa 2',
              value: 'empresa-2'
            },
            {
              label: 'Empresa 3',
              value: 'empresa-3'
            }
          ]
        },

        name: {
          name: 'name',
          label: 'Nome',
          type: 'string'
        },

        email: {
          name: 'email',
          label: 'Email',
          type: 'email'
        }
      },
      errors: {},
      result: {
        company: 'empresa-1',
        name: 'Joaquim',
        email: 's2H0a@example.com'
      },
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
  },

  methods: {
    update () {
      this.result = {
        company: 'empresa-2',
        name: 'Joaquim 2',
        email: 'joaquin2@example.com'
      }
    }
  }
}
</script>
