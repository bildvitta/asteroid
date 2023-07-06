<template>
  <div class="container q-py-lg">
    <qas-select-list v-model="model" v-bind="props" />

    <div class="q-mt-lg">
      Model:
      <qas-debugger :inspect="[model]" />
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      model: ['uuid5', 'uuid9'],
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
          label: 'teste',
          email: 'email1@example.com',
          value: 'teste'
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
        },
        {
          label: 'item 4',
          email: 'email4@example.com',
          value: 'uuid4'
        },
        {
          label: 'item 5',
          email: 'email5@example.com',
          value: 'uuid5'
        },
        {
          label: 'item 6',
          email: 'email6@example.com',
          value: 'uuid6'
        },
        {
          label: 'item 7',
          email: 'email7@example.com',
          value: 'uuid7'
        },
        {
          label: 'item 8',
          email: 'email8@example.com',
          value: 'uuid8'
        },
        {
          label: 'item 9',
          email: 'email9@example.com',
          value: 'uuid9'
        },
        {
          label: 'item 10',
          email: 'email10@example.com',
          value: 'uuid10'
        },
        {
          label: 'item 11',
          email: 'email11@example.com',
          value: 'uuid11'
        },
        {
          label: 'item 12',
          email: 'email12@example.com',
          value: 'uuid12'
        },
        {
          label: 'item 13',
          email: 'email13@example.com',
          value: 'uuid13'
        },
        {
          label: 'item 14',
          email: 'email14@example.com',
          value: 'uuid14'
        },
        {
          label: 'item 15',
          email: 'email15@example.com',
          value: 'uuid15'
        }
      ]
    },

    props () {
      return {
        searchBoxProps: {
          list: this.list
        }
      }
    }
  }
}
</script>
