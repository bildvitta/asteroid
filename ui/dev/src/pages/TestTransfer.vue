<template>
  <q-page class="container">
    <qas-transfer v-model="model" :options="list" label="Selecionar" :fuseOptions='{"keys":["label"]}' />

    <div>
      model: <pre>{{ model }}</pre>
    </div>
    <div class="q-ma-lg">Model 2</div>
    <qas-transfer v-model="model2" :options="list" label="Selecionar" :fuseOptions='{"keys":["label"]}'>
      <template #item-first-column>
        <div>
          Template: item-first-column
        </div>
      </template>
    </qas-transfer>

    <div>
      model: <pre>{{ model2 }}</pre>
    </div>
  </q-page>
</template>

<script>
export default {
  data () {
    return {
      model: [],
      model2: [
        {
          label: 'item 3',
          email: 'email3@example.com',
          value: 'uuid3'
        },
        {
          'label': 'item 1',
          'email': 'email1@example.com',
          'value': 'uuid1'
        }
      ]
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
