<template>
  <div class="container q-py-lg">
    <qas-select-list v-model="model" delete-only :list="list">
      <template #item-action="{ item }">
        <div>
          <pre>{{ item }}</pre>
        </div>
      </template>

      <div class="q-mt-lg">
        Model: <pre>{{ model }}</pre>
      </div>
    </qas-select-list>
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
          label: 'item 1',
          email: 'email1@example.com',
          value: 'uuid1'
        },
        {
          label: 'item 2',
          email: 'email2@example.com',
          value: 'uuid2'
        },
        {
          label: 'item 3',
          email: 'email3@example.com',
          value: 'uuid3'
        }
      ]
    }
  }
}
</script>
