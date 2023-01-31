<template>
  <div class="container q-py-lg">
    <qas-search-box v-model:results="results" :fuse-options="{ keys: ['label'] }" :list="list" :use-empty-results="false">
      <template #default>
        <div>
          Results:
          <pre>{{ results }}</pre>
        </div>
      </template>
    </qas-search-box>
  </div>
</template>

<script>
export default {
  data () {
    return {
      model: [],
      results: []
    }
  },

  computed: {
    list () {
      return [
        {
          label: "Old Man's War",
          email: 'email1@example.com',
          value: 'uuid1'
        },
        {
          label: 'The Lock Artist',
          email: 'email2@example.com',
          value: 'uuid2'
        },
        {
          label: 'Artist for Life',
          email: 'email3@example.com',
          value: 'uuid3'
        }
      ]
    }
  }
}
</script>
