<template>
  <div class="container spaced">
    <qas-field v-model="model" :field="field" />
  </div>
</template>

<script>
export default {
  data () {
    return {
      model: ''
    }
  },

  computed: {
    field () {
      return {
        name: 'hidden',
        type: 'hidden',
        label: 'Campo escondido'
      }
    }
  }
}
</script>
