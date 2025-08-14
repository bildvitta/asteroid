<template>
  <!-- Usando qas-single-view apenas para recuperar os dados -->
  <qas-single-view v-model:fields="fields" v-model:result="result" class="bg-red q-pa-md" :custom-id="customId" :entity="entity">
    <template #default>
      <qas-grid-generator v-bind="gridGeneratorProps" />
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
      }
    },

    fieldset: {
      informations: {
        label: 'Informações',
        description: 'Informe algumas informações do usuário.',
        fields: ['phone', 'name', 'company']
        // subset: { // todo subset vai ter um separator, no caso de resumo vai usar subset sem label
        //   company: {
        //     // headerProps: {
        //     //   labelProps: { label: 'Uma subseção' },
        //     //   badges: [
        //     //     {
        //     //       label: 'Minha badge',
        //     //       textColor: 'grey-10'
        //     //     }
        //     //   ],
        //     //   buttonProps: {
        //     //     label: 'Atualizar',
        //     //     onClick: () => alert('Atualizando...')
        //     //   }
        //     // },
        //     fields: ['total']
        //   }
        // }
      },

      summary: {
        label: 'Resumo',
        description: 'Resumo do outro usuário.',
        fields: ['email', 'createdAt']
        // subset: { // todo subset vai ter um separator, no caso de resumo vai usar subset sem label
        //   company: {
        //     // headerProps: {
        //     //   labelProps: { label: 'Uma subseção' },
        //     //   badges: [
        //     //     {
        //     //       label: 'Minha badge',
        //     //       textColor: 'grey-10'
        //     //     }
        //     //   ],
        //     //   buttonProps: {
        //     //     label: 'Atualizar',
        //     //     onClick: () => alert('Atualizando...')
        //     //   }
        //     // },
        //     fields: ['total']
        //   }
        // }
      }
    }
  }
})
</script>
