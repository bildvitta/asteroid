<template>
  <div class="container q-py-lg">
    <qas-tabs-generator v-model="model" :counters="{ tab1: 2, tab2: 7 }" :tabs="tabs" />

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
      model: 'tab1'
    }
  },

  computed: {
    tabs () {
      return {
        tab1: 'tab-1',
        tab2: 'tab-2',
        tab3: 'tab-3'
      }
    }
  }
}
</script>
