<template>
  <qas-list-view v-model:fields="fields" v-model:results="results" :entity="entity" :use-filter="false">
    <template #default>
      <qas-table-generator :fields="fields" :results="results" row-key="uuid" />
    </template>
  </qas-list-view>
</template>

<script setup>
import { ref } from 'vue'

defineOptions({ name: 'Selection' })

const entity = 'users'

const fields = ref({})
const results = ref([])
</script>
