<template>
  <!-- Usando qas-single-view apenas para recuperar os dados -->
  <qas-single-view v-model:fields="fields" v-model:result="result" :custom-id="customId" :entity="entity">
    <qas-expansion-item :badges="badges" :grid-generator-props="gridGeneratorProps" label="John Doe" :use-header-separator="false" />
  </qas-single-view>
</template>

<script setup>
import { ref, computed } from 'vue'

defineOptions({ name: 'UsersList' })

const fields = ref({})
const result = ref({})

const entity = 'users'

const badges = [
  {
    color: 'green-14',
    label: 'Aprovado',
    textColor: 'white'
  },
  {
    color: 'red-14',
    label: 'Reprovado',
    textColor: 'white'
  }
]

const gridGeneratorProps = computed(() => {
  return {
    fields: fields.value,
    result: result.value
  }
})

// USAR SOMENTE SE NECESSÁRIO, AQUI PEGAMOS O ID DO USUÁRIO NO NOSSO MOCK DE DADOS
const customId = '3102fad5-f14c-45d4-98e9-46ef0aa9580e'
</script>
