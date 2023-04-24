<template>
  <div class="container spaced">
    <div>
      <qas-date v-model="model" label="Meu DateTimeInput" />

      <div class="q-mt-xl">Model: {{ model }}</div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      model: ''
    }
  }
}
</script>
