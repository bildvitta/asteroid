<template>
  <div class="container spaced">
    <qas-form-generator v-model="model" :columns :common-columns :fields :fieldset use-box />

    <div class="q-mt-lg">
      model: <qas-debugger :inspect="[model]" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

defineOptions({ name: 'WithSubsets' })

const model = ref({})

const commonColumns = { col: 12, sm: 4 }

const columns = {
  others: { col: 8 },
  comment: { col: 12 }
}

const fieldset = {
  informations: {
    label: 'Informações',
    description: 'Informe algumas informações do usuário.',
    fields: ['isActive', 'phone', 'name', 'company', 'uuid'],
    subset: {
      others: {
        headerProps: {
          labelProps: { label: 'Uma subseção' },
          badges: [
            {
              label: 'Minha badge',
              textColor: 'grey-10'
            }
          ],
          buttonProps: {
            label: 'Atualizar',
            onClick: () => alert('Atualizando...')
          }
        },
        fields: ['email', 'others']
      },

      description: {
        label: 'Outra subseção',
        description: 'Exemplo utilizando outra subseção.',
        fields: ['comment']
      }
    }
  }
}

const fields = {
  uuid: {
    name: 'uuid',
    type: 'hidden'
  },

  company: {
    name: 'company',
    label: 'Empresa',
    multiple: true,
    type: 'select',
    options: [
      { label: 'Empresa com nome grande 1', value: 'company-1' },
      { label: 'Empresa com nome grande 2', value: 'company-2' },
      { label: 'Empresa com nome grande 3', value: 'company-3' },
      { label: 'Empresa com nome grande 4', value: 'company-4' }
    ]
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
  },

  others: {
    name: 'others',
    label: 'Outros',
    type: 'text'
  },

  comment: {
    name: 'comment',
    label: 'Digite um comentário aqui',
    type: 'textarea'
  }
}
</script>
