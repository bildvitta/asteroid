<template>
  <!-- Usando qas-single-view apenas para recuperar os dados -->
  <qas-single-view v-model:fields="fields" v-model:result="result" :custom-id="customId" :entity="entity">
    <template #default>
      <qas-grid-generator v-bind="gridGeneratorProps" class="q-mt-md" />
    </template>
  </qas-single-view>
</template>

<script setup>
import { ref, computed } from 'vue'

defineOptions({ name: 'WithFieldset' })

const fields = ref({})
const result = ref({})

const entity = 'users'

// USAR SOMENTE SE NECESSÁRIO, AQUI PEGAMOS O ID DO USUÁRIO NO NOSSO MOCK DE DADOS
const customId = '3102fad5-f14c-45d4-98e9-46ef0aa9580e'

const gridGeneratorProps = computed(() => {
  return {
    fields: fields.value,
    result: result.value,
    useBox: true,

    columns: {
      phone: { col: 12, sm: 6 },
      name: { col: 12, sm: 6 }
    },

    fieldset: {
      informations: {
        headerProps: {
          description: 'Descrição do primeiro fieldset',
          labelProps: {
            label: 'Label do primeiro fieldset'
          },

          buttonProps: {
            label: 'Adicionar item',
            icon: 'sym_r_add'
          }
        },
        fields: ['phone', 'name'],

        // todo subset vai ter um separator, no caso de resumo vai usar subset sem label
        subset: {
          company: {
            label: 'Label do subset do primeiro fieldset',
            description: 'Descrição do subset do primeiro fieldset',
            fields: ['company']
          }
        }
      },

      summary: {
        headerProps: {
          description: 'Descrição do segundo fieldset',
          labelProps: {
            label: 'Label do primeiro fieldset'
          },

          buttonProps: {
            label: 'Adicionar item',
            icon: 'sym_r_add'
          }
        },
        fields: ['email'],
        useSeparator: true, // É possível utilizar separador entre fieldset.

        subset: {
          document: {
            label: 'Label do primeiro subset do segundo fieldset',
            description: 'Descrição do primeiro subset do segundo fieldset',
            fields: ['document']
          },

          phone: {
            label: 'Label do segundo subset do segundo fieldset',
            description: 'Descrição do segundo subset do segundo fieldset',
            fields: ['phone', 'name']
          }
        }
      }
    }
  }
})
</script>
