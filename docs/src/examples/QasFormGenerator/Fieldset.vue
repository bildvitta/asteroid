<template>
  <div class="container spaced">
    <qas-form-generator v-model="model" :columns="columns" :fields="fields" :fieldset1="fieldset">
      <template #legend-personalInformation>
        Custom slot "personalInformation"
      </template>
    </qas-form-generator>

    <div class="q-mt-lg">
      model: <qas-debugger :inspect="[model]" />
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      model: {}
    }
  },

  computed: {
    columns () {
      // return {
      //   company: { col: 12 },
      //   phone: { col: 12, sm: 6 }
      // }
      return [
        { col: 12 },
        { col: 12, sm: 6 }
      ]
    },

    fieldset () {
      return {
        personalInformation: {
          label: 'Informações pessoais',
          fields: ['name', 'email']
        },

        another: {
          label: 'Outras informações',
          fields: ['phone', 'company']
        }
      }
    },

    fields () {
      return {
        uuid: {
          name: 'uuid',
          type: 'hidden'
        },

        isActive: {
          name: 'isActive',
          label: 'Usuário ativo?',
          type: 'boolean',
          default: false
        },

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
        },

        document: {
          name: 'document',
          label: 'Documento',
          type: 'string',
          mask: 'document'
        },

        phone: {
          name: 'phone',
          label: 'Telefone',
          type: 'string',
          mask: 'phone'
        }
      }
    }
  }
}
</script>
