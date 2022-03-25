<template>
  <div class="container spaced">
    <qas-form-generator v-model="model" :columns="columns" :fields="fields">
      <template #field-name="{ field }">
        <div>
          Estou dentro do slot <span class="text-bold">name</span>
          Scope field: <qas-debugger :inspect="[field]" />
        </div>
      </template>
      <template #field-phone="{ field }">
        <div>
          Estou dentro do slot <span class="text-bold">phone</span>
          Scope field: <qas-debugger :inspect="[field]" />
        </div>
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
      return {
        phone: { col: 12 },
        document: { col: 12 }
      }
    },

    fields () {
      return {
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
