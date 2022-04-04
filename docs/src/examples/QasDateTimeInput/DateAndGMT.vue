<template>
  <div class="container spaced">
    <div>
      <qas-date-time-input v-model="model" date-only label="Somente data" />
      Model: {{ model }}
    </div>

    <div class="q-mt-lg">
      <qas-date-time-input v-model="modelGMT" date-only gmt label="Somente data e GMT" />
      Model: {{ modelGMT }}
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      model: '',
      modelGMT: ''
    }
  }
}
</script>
