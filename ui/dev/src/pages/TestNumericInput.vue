<template>
  <div>
    QasNumericInput
    <qas-numeric-input v-model="model" />
    <pre>{{ model }}</pre>
  </div>
</template>

<script>
export default {
  data () {
    return {
      model: 0
    }
  }
}
</script>
