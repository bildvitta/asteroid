<template>
  <div class="container q-py-lg">
    <qas-tabs-generator v-model="model" :counters="{ 'tab-1': 2 }" :tabs="tabs" />

    <div class="q-my-lg">
      model: {{ model }}
    </div>

    <qas-btn @click="model = 'tab2'">Mudar o model</qas-btn>
  </div>
</template>

<script>
export default {
  data () {
    return {
      model: 'tab-1'
    }
  },

  computed: {
    tabs () {
      return [
        { label: 'tab 1', value: 'tab-1' },
        { label: 'tab 2', value: 'tab-2' },
        { label: 'tab 3', value: 'tab-3' }
      ]
    }
  }
}
</script>
