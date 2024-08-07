<template>
  <div class="container spaced">
    <qas-form-generator v-model="model" :columns="columns" :fields="fields" :fields-props="fieldsProps" :fieldset="fieldset" fieldset-gutter="lg" :use-box="true" />

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
      return {
        isActive: { col: 12 },
        company: { col: 12 },
        phone: { col: 12 }
      }
    },

    fieldsProps () {
      return {
        isActive: {
          'onUpdate:modelValue': value => alert(`Usuário ativo?: ${value}`)
        }
      }
    },

    fieldset () {
      return {
        personalInformation: {
          label: 'Informações pessoais',
          description: 'Informe o nome e email do usuário.',
          fields: ['isActive', 'name', 'email'],
          column: { col: 12, sm: 6 }
        },

        another: {
          label: 'Outras informações',
          description: 'Informe a empresa, telefone e documento do usuário.',
          fields: ['phone', 'company'],
          column: { col: 12, sm: 6 }
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
