<template>
  <div class="container spaced">
    <qas-form-generator v-model="model" columns="12" :fields="fields" use-box>
      <template #field-name="{ field }">
        <div class="bg-red">
          Estou dentro do slot <span class="text-bold">name</span>

          <div>Scope field:</div>

          <div class="q-pa-sm">
            <qas-debugger :inspect="[field]" />
          </div>
        </div>
      </template>

      <template #field-phone="{ field }">
        <div class="bg-blue">
          Estou dentro do slot <span class="text-bold">phone</span>

          <div>Scope field:</div>

          <div class="q-pa-sm">
            <qas-debugger :inspect="[field]" />
          </div>
        </div>
      </template>
    </qas-form-generator>
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
