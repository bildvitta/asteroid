<template>
  <div class="container spaced">
    <qas-checkbox-group v-model="model" :false-value="false" label="Aceitar" :true-value="true" />

    <div class="q-mt-lg">
      model: {{ model }}
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

defineOptions({ name: 'Single' })

const model = ref(false)
</script>
