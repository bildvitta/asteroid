<template>
  <div class="container spaced">
    <qas-toggle v-model="model" label="Aceitar" />
  </div>
</template>

<script setup>
import { ref } from 'vue'

defineOptions({ name: 'Basic' })

const model = ref(false)
</script>
