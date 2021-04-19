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
  name: 'SingleView',

  data () {
    return {
      values: {}
    }
  },

  watch: {
    values (value) {
      console.log('# watch => value =>', value)
    }
  },

  computed: {
    customId () {
      return 'b0c57379-f81c-4f67-af7c-9cb836c365c1'
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
