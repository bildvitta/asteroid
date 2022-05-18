<template>
  <div class="container q-py-lg">
    <qas-input v-model="model" :error="true" label="Meu input!" />

    Model: {{ model }}
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
