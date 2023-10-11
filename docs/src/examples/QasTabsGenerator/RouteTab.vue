<template>
  <div class="container q-py-lg">
    <qas-tabs-generator :tabs="tabs" use-route-tab />
  </div>
</template>

<script>
export default {
  computed: {
    tabs () {
      return [
        {
          label: 'Tab 1',
          value: 'tab1',
          to: '/components/tabs-generator'
        },
        {
          label: 'Tab 2',
          value: 'tab2',
          to: '/components/tabs-generator/tab-2'
        },
        {
          label: 'Tab 3',
          value: 'tab3',
          to: '/components/tabs-generator/tab-3'
        },
        {
          label: 'Tab 4',
          value: 'tab4',
          to: '/components/tabs-generator/tab-4'
        },
        {
          label: 'Tab 5',
          value: 'tab5',
          to: '/components/tabs-generator/tab-5'
        }
      ]
    }
  }
}
</script>
