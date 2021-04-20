<template>
  <div>
    <qas-single-view v-model="values" :custom-id="getCustomId" entity="users" :url="getUrl">
      <template #default="{ fields, result }">
        Values: <qas-debugger :inspect="[values]" />
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

  computed: {
    getCustomId () {
      // TODO: Alterar toda vez que rodar o navpi seed
      return 'b0c57379-f81c-4f67-af7c-9cb836c365c1'
    },

    getUrl () {
      // FIX: Configurar Babel
      return 'http://localhost:5051/users/' + this.getCustomId + '/edit'
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
