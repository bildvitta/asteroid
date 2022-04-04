<template>
  <div class="container spaced">
    <div>
      <qas-date-time-input v-model="model" label="Meu DateTimeInput" />
      Model: {{ model }}
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
