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
          icon: 'o_person'
        },
        {
          label: 'Tab 2',
          value: 'tab2',
          icon: 'o_person'
        },
        {
          label: 'Tab 3',
          value: 'tab3',
          icon: 'o_person'
        },
        {
          label: 'Tab 4',
          value: 'tab4',
          icon: 'o_person'
        },
        {
          label: 'Tab 5',
          value: 'tab5',
          icon: 'o_person'
        },
        {
          label: 'Tab 6',
          value: 'tab6',
          icon: 'o_person'
        },
        {
          label: 'Tab 7',
          value: 'tab7',
          icon: 'o_person'
        },
        {
          label: 'Tab 8',
          value: 'tab8',
          icon: 'o_person'
        },
        {
          label: 'Tab 9',
          value: 'tab9',
          icon: 'o_person'
        },
        {
          label: 'Tab 10',
          value: 'tab10',
          icon: 'o_person'
        }
      ]
    }
  }
}
</script>
