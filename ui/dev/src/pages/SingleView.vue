<template>
  <div>
    <qas-single-view entity="users" v-model="values" :customId="customId">
      <template v-slot="{ fields, result }">
        Fields: <qas-debugger :inspect="[fields]" />
        Results: <qas-debugger :inspect="[result]" />
      </template>
    </qas-single-view>
  </div>
</template>

<script>
export default {
  name: 'UsersSingleView',

  data () {
    return {
      values: {}
    }
  },

  watch: {
    // values (value) {
    //   console.log('value =>', value)
    // }
    values: {
      handler (value) {
        console.log('### value =>', value)
      },
      immediate: true
    }
  },

  computed: {
    customId () {
      return 'a755a6d1-fc4a-4961-a8cc-b2293fe5b81c'
    },

    gridFields () {
      return [
        'uuid',
        'name',
        'email',
        'nickname'
      ]
    }
  }
}
</script>
