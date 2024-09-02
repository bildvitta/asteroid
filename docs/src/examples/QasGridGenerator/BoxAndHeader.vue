<template>
  <!-- Usando qas-single-view apenas para recuperar os dados -->
  <qas-single-view v-model:fields="fields" v-model:result="result" :custom-id="customId" :entity="entity">
    <template #default>
      <div>
        <qas-grid-generator v-bind="gridGeneratorProps" />
      </div>
    </template>
  </qas-single-view>
</template>

<script setup>
import { ref, computed } from 'vue'

const fields = ref({})
const result = ref([])

const entity = 'users'

// USAR SOMENTE SE NECESSÁRIO, AQUI PEGAMOS O ID DO USUÁRIO NO NOSSO MOCK DE DADOS
const customId = '3102fad5-f14c-45d4-98e9-46ef0aa9580e'

const gridGeneratorProps = computed(() => {
  return {
    fields: fields.value,
    result: result.value,

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
