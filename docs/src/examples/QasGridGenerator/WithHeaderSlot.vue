<template>
  <!-- Usando qas-single-view apenas para recuperar os dados -->
  <qas-single-view v-model:fields="viewState.fields" v-model:result="viewState.result" :custom-id :entity>
    <template #default>
      <qas-grid-generator v-bind="gridGeneratorProps">
        <template #fieldset-informations-after-header>
          <qas-alert text="Utilizando o slot after-header" />
        </template>

        <template #fieldset-informations-header-description>
          <strong>Com descrição personalizada através do slot</strong>
        </template>
      </qas-grid-generator>
    </template>
  </qas-single-view>
</template>

<script setup>
import { useView } from '@bildvitta/composables'
import { computed } from 'vue'

defineOptions({ name: 'WithHeaderSlot' })

const { viewState } = useView({ mode: 'single' })

const entity = 'users'

// USAR SOMENTE SE NECESSÁRIO, AQUI PEGAMOS O ID DO USUÁRIO NO NOSSO MOCK DE DADOS
const customId = '3102fad5-f14c-45d4-98e9-46ef0aa9580e'

const gridGeneratorProps = computed(() => {
  return {
    fields: viewState.value.fields,
    result: viewState.value.result,
    useBox: true,

    columns: {
      phone: { col: 12, sm: 6 },
      name: { col: 12, sm: 6 }
    },

    fieldset: {
      informations: {
        headerProps: {
          labelProps: {
            label: 'Label do primeiro fieldset'
          },

          buttonProps: {
            label: 'Adicionar item',
            icon: 'sym_r_add'
          }
        },
        fields: ['phone', 'name']
      },

      summary: {
        headerProps: {
          description: 'Descrição do segundo fieldset',
          labelProps: {
            label: 'Label do segundo fieldset'
          }
        },
        fields: ['email'],
        useSeparator: true // É possível utilizar separador entre fieldset.
      }
    }
  }
})
</script>
