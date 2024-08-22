<template>
  <qas-box class="container q-my-md spaced">
    <qas-search-input v-model="search" />

    <div class="q-mt-lg">
      Model: {{ search }}
    </div>
  </qas-box>
</template>

<script setup>
import { ref } from 'vue'

const search = ref('')
</script>
