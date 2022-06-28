<template>
  <div class="container spaced">
    <div>
      <qas-date-time-input v-model="model" label="Somente data" use-date-only />
      Model: {{ model }}
    </div>

    <div class="q-mt-lg">
      <qas-date-time-input v-model="modelGMT" label="Somente data e ISO" use-date-only use-iso />
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
