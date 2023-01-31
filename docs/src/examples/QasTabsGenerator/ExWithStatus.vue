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
      return [
        {
          label: 'Tab 1',
          value: 'tab1',
          status: 'positive'
        },
        {
          label: 'Tab 2',
          value: 'tab2',
          status: 'negative'
        },
        {
          label: 'Tab 3',
          value: 'tab3',
          status: 'positive'
        },
        {
          label: 'Tab 4',
          value: 'tab4',
          status: 'negative'
        },
        {
          label: 'Tab 5',
          value: 'tab5',
          status: 'positive'
        },
        {
          label: 'Tab 6',
          value: 'tab6',
          status: 'negative'
        },
        {
          label: 'Tab 7',
          value: 'tab7',
          status: 'positive'
        },
        {
          label: 'Tab 8',
          value: 'tab8',
          status: 'negative'
        },
        {
          label: 'Tab 9',
          value: 'tab9',
          status: 'positive'
        },
        {
          label: 'Tab 10',
          value: 'tab10',
          status: 'negative'
        }
      ]
    }
  }
}
</script>
