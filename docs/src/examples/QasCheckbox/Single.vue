<template>
  <div class="container spaced">
    <div>
      <qas-checkbox v-model="model" :false-value="false" label="Aceitar" :true-value="true" />
    </div>

    <div class="q-mt-lg">
      <qas-checkbox v-model="model" disable :false-value="false" label="Aceitar" :true-value="true" />
    </div>

    <div class="q-mt-lg">
      <qas-checkbox v-model="model" error :false-value="false" label="Aceitar" :true-value="true" />
    </div>

    <div class="q-mt-lg">
      <qas-debugger :inspect="[model]" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

defineOptions({ name: 'Single' })

const model = ref(false)
</script>
