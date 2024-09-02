<template>
  <!-- Usando qas-single-view apenas para recuperar os dados -->
  <qas-single-view v-model:fields="viewState.fields" v-model:result="viewState.result" :custom-id="customId" :entity="entity">
    <template #default>
      <qas-grid-generator v-bind="gridGeneratorProps" />
    </template>
  </qas-single-view>
</template>

<script setup>
import { computed } from 'vue'
import { useView } from '@bildvitta/composables'

const { viewState } = useView({ mode: 'single' })
console.log('TCL: viewState', viewState)

const entity = 'users'

// USAR SOMENTE SE NECESSÁRIO, AQUI PEGAMOS O ID DO USUÁRIO NO NOSSO MOCK DE DADOS
const customId = '3102fad5-f14c-45d4-98e9-46ef0aa9580e'

const gridGeneratorProps = computed(() => {
  return {
    fields: viewState.value.fields,
    result: viewState.value.result,

    headerProps: {
      labelProps: {
        label: 'Título'
      },

      badges: [
        {
          label: 'Badge 1',
          color: 'primary',
          textColor: 'white'
        }
      ]
    },

    useBox: true
  }
})
</script>
