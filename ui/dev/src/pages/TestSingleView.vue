<template>
  <qas-single-view v-model="values" v-model:fetchingModel="isFetching" v-model:fieldsModel="fields" class="container spaced" :custom-id="customId" entity="users" :url="url">
    <template #default="{ result }">
      Values: <qas-debugger :inspect="[values]" />
      Fields: <qas-debugger :inspect="[fields]" />
      Results: <qas-debugger :inspect="[result]" />
      isFetching: {{ isFetching }}
    </template>
  </qas-single-view>
</template>

<script>
export default {
  data () {
    return {
      values: {},
      isFetching: false,
      fields: {}
    }
  },

  computed: {
    customId () {
      // TODO: Alterar toda vez que rodar o navpi seed
      return '6e8cd2fe-0945-4e84-9286-839ad2f2abcb'
    },

    url () {
      return 'http://localhost:5051/users/' + this.customId + '/edit'
    }
  }
}
</script>
