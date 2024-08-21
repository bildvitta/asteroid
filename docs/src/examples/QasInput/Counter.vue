<template>
  <div class="container q-col-gutter-sm q-py-lg row">
    <qas-input v-model="model" class="col-12" :counter label="Meu input" :maxlength />
  </div>
</template>

<script setup>
import { ref } from 'vue'

defineOptions({ name: 'Counter' })

const counter = true
const maxlength = 12

const model = ref('')
</script>
