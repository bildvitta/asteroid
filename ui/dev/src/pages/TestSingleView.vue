<template>
  <qas-single-view v-model:fetching="isFetching" v-model:fields="fields" v-model:result="result" class="container spaced" :custom-id="customId" entity="users" :url="url">
    <template #default>
      Fields: <qas-debugger :inspect="[fields]" />
      Result: <qas-debugger :inspect="[result]" />
      isFetching: {{ isFetching }}
    </template>
  </qas-single-view>
</template>

<script>
export default {
  data () {
    return {
      result: {},
      isFetching: false,
      fields: {}
    }
  },

  computed: {
    customId () {
      // TODO: Alterar toda vez que rodar o navpi seed
      return '7ea1da9a-d422-4db5-835d-cd85ea967879'
    },

    url () {
      return 'http://localhost:5051/users/' + this.customId + '/edit'
    }
  }
}
</script>
