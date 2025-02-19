<template>
  <div class="container spaced">
    <qas-radio v-model="model" label="Opção 1" val="1" />
  </div>
</template>

<script setup>
import { ref } from 'vue'

defineOptions({ name: 'Basic' })

const model = ref('')
</script>
