<template>
  <q-page class="container">
    <qas-checkbox-group v-model="model" :options="options" />

    model: <pre>{{ model }}</pre>
  </q-page>
</template>

<script>
export default {
  data () {
    return {
      model: [2, 1]
    }
  },

  computed: {
    options () {
      return [
        {
          label: 'Checkbox exemple',
          children: [
            {
              label: 'Children 1',
              value: 1
            },
            {
              label: 'Children 2',
              value: 2
            }
          ]
        }
      ]
    }
  }
}
</script>
