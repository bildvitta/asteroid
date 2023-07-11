<template>
  <div class="container q-py-lg">
    <qas-select-list v-model="model" v-bind="props" />

    <div class="q-mt-lg">
      Model:
      <qas-debugger :inspect="[model]" />
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      model: ['uuid5', 'uuid9'],
      list: [],
      results: []
    }
  },

  computed: {
    props () {
      return {
        searchBoxProps: {
          list: this.list,
          height: '100px'
        }
      }
    }
  },

  created () {
    for (let index = 0; index < 48; index++) {
      this.list2.push({
        label: `item ${index}`,
        value: `uuid${index}`
      })
    }
  }
}
</script>
