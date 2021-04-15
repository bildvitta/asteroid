<template>
  <div>
    <qas-single-view entity="users" v-model="values" v-bind="$attrs">
      <template v-slot="{ fields, result }">
        Fields: <qas-debugger :inspect="[fields]" />
        Results: <qas-debugger :inspect="[result]" />
      </template>
    </qas-single-view>
  </div>
</template>

<script>
export default {
  name: 'UserSingle',

  data () {
    return {
      values: {}
    }
  },

  watch: {
    values (value) {
      console.log('value =>', value)
    }
  },

  computed: {
    getUrl () {
      return 'https://jsonplaceholder.typicode.com/todos/1'
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
