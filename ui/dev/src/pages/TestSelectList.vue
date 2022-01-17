<template>
  <q-page class="container q-py-lg">
    <qas-select-list v-model="model" :list="list" />

    template item
    <qas-select-list v-model="model2" :list="list">
      <template #item="{ add }">
        <div>
          <q-btn label="mudar o valor" @click="add({ label: 'EOQ', value: 'aaaaa' })"></q-btn>
        </div>
      </template>
    </qas-select-list>

    <div>
      model: {{ model }}
    </div>
  </q-page>
</template>

<script>
export default {
  data () {
    return {
      model: [],
      model2: []
    }
  },

  computed: {
    list () {
      return [
        {
          label: 'Item 1',
          value: 1
        },
        {
          label: 'Item 2',
          value: 2
        },
        {
          label: 'Item 3',
          value: 3
        },
        {
          label: 'Item 4',
          value: 4
        },
        {
          label: 'Item 5',
          value: 5
        },
        {
          label: 'Item 6',
          value: 6
        },
        {
          label: 'Item 7',
          value: 7
        },
        {
          label: 'Item 8',
          value: 8
        },
        {
          label: 'Item 9',
          value: 9
        },
        {
          label: 'Item 10',
          value: 10
        }
      ]
    }
  }
}
</script>
