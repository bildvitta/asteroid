<template>
  <!-- Usando qas-single-view apenas para recuperar os dados -->
  <qas-single-view v-model:fields="fields" v-model:result="result" :custom-id="customId" :entity="entity">
    <template #default>
      <qas-grid-generator :fields="fields" :result="result" use-inline />
    </template>
  </qas-single-view>
</template>

<script setup>
import { ref } from 'vue'

defineOptions({ name: 'UsersList' })

const fields = ref({})
const result = ref({})

const entity = 'users'

// USAR SOMENTE SE NECESSÁRIO, AQUI PEGAMOS O ID DO USUÁRIO NO NOSSO MOCK DE DADOS
const customId = '3102fad5-f14c-45d4-98e9-46ef0aa9580e'
</script>
