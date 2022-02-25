<template>
  <q-page class="container q-py-lg">
    <qas-profile :columns="columns" :fields="mockData.fields" :list="list" :result="mockData.results[0]" title="Exemplo">
      <template #field-name="{ field }">
        <div>
          <pre>{{ field }}</pre>
        </div>
      </template>
    </qas-profile>
  </q-page>
</template>

<script>
export default {
  computed: {
    columns () {
      return {
        name: {
          col: 2,
          sm: 12
        },
        email: {
          col: 12,
          sm: 6
        }
      }
    },

    mockData () {
      return require('../mock/fetchList.json')
    },

    list () {
      return ['name', 'email', 'avatar', 'type']
    }
  },

  methods: {
    onEmptyResult () {
      alert('Empty results')
    },

    changeList () {
      this.list = [{ label: 'Paul 2', value: '1' }, { label: 'Walker 2', value: '2' }]
    }
  }
}
</script>
