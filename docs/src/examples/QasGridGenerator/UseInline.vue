<template>
  <!-- Usando qas-single-view apenas para recuperar os dados -->
  <qas-single-view v-model:fields="fields" v-model:result="result" class="bg-red q-pa-md" :custom-id="customId" :entity="entity">
    <template #default>
      <qas-grid-generator v-bind="gridGeneratorProps" />

      <qas-grid-generator v-bind="gridGeneratorProps2" class="q-mt-md" />
    </template>
  </qas-single-view>
</template>

<script setup>
import { ref, computed } from 'vue'

defineOptions({ name: 'UsersList' })

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
    useInline: true,

    fieldsProps: {
      company: {
        // adiciona o tooltip somente no company
        tip: 'cálculo cleyton - cálculo da recisão',
        content: {
          typography: 'h4'
        }
      },

      phone: {
        content: {
          typography: 'h4'
        }
      }
    },

    fieldset: {
      informations: {
        label: 'Informações',
        description: 'Informe algumas informações do usuário.',
        fields: ['phone', 'name'],

        subset: {
          summary: {
            fields: ['company'],
            useSeparator: true
          }
        }
      }
    }
  }
})

const gridGeneratorProps2 = computed(() => {
  return {
    fields: fields.value,
    result: result.value,
    useBox: true,

    columns: {
      phone: { col: 12, sm: 6 },
      name: { col: 12, sm: 6 }
    },

    fieldsProps: {
      phone: {
        // adiciona o tooltip somente no company
        tip: 'cálculo cleyton - cálculo da recisão'
      }
    },

    fieldset: {
      informations: {
        // label: 'Informações',
        // description: 'Informe algumas informações do usuário.',
        headerProps: {
          description: 'Primeira descrição header',
          labelProps: {
            label: 'Primeiro header'
          },

          buttonProps: {
            label: 'Adicionar subcanal',
            icon: 'sym_r_add',
            disable: false,
            onClick: () => { console.log('xd') }
          }
        },
        fields: ['phone', 'name']

        // todo subset vai ter um separator, no caso de resumo vai usar subset sem label
        // subset: {
        //   company: {
        //     label: 'titulo do primeiro subset',
        //     description: 'Descrição do primeiro subset',
        //     fields: ['company']
        //   }
        // }
      },

      summary: {
        // label: 'Resumo',
        // description: 'Resumo do outro usuário.',
        headerProps: {
          description: 'Segunda descrição header',
          labelProps: {
            label: 'Segundo header'
          },

          buttonProps: {
            label: 'Adicionar subcanal',
            icon: 'sym_r_add',
            disable: false,
            onClick: () => { console.log('xddd') }
          }
        },
        fields: ['email'],
        // useSeparator: true,

        subset: {
          document: {
            label: 'titulo do primeiro subset',
            description: 'Descrição do primeiro subset',
            fields: ['document']
            // useSeparator: false
          },

          phone: {
            label: 'titulo do segundo subset',
            description: 'Descrição do segundo subset',
            fields: ['phone', 'name']
            // useSeparator: false
          }
        }
      }
    }
  }
})
</script>
