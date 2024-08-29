<template>
  <div class="container spaced">
    <qas-form-generator v-model="model" :columns :fields :fields-props :fieldset fieldset-gutter="lg" use-box />

    <div class="q-mt-lg">
      model: <qas-debugger :inspect="[model]" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

defineOptions({ name: 'WithButton' })

const model = ref({})

const columns = {
  isActive: { col: 12 },
  phone: { col: 12, sm: 4 },
  name: { col: 12, sm: 4 },
  email: { col: 12, sm: 4 }
}

const fieldsProps = {
  isActive: {
    'onUpdate:modelValue': value => alert(`Usuário ativo?: ${value}`)
  }
}

const fieldset = {
  personalInformation: {
    label: 'Informações pessoais',
    description: 'Informe o nome e email do usuário.',
    fields: ['isActive', 'phone', 'name', 'email'],
    column: '12',
    buttonProps: {
      label: 'Botão',
      icon: 'sym_r_draft',
      onClick: () => alert('Clicou no botão')
    }
  }
}

const fields = {
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

  name: {
    name: 'name',
    label: 'Nome',
    type: 'string'
  },

  phone: {
    name: 'phone',
    label: 'Telefone',
    type: 'phone'
  },

  email: {
    name: 'email',
    label: 'Email',
    type: 'email'
  }
}

</script>
