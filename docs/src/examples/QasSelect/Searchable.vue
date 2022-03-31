<template>
  <div class="container q-py-lg">
    <div>
      <qas-select v-model="model" label="Meu select!" :options="options" searchable />
      Model: {{ model }}
    </div>

    <div class="q-mt-lg">
      <qas-select v-model="model2" label="Meu select multiple" multiple :options="options" searchable />
      Model múltiplo: {{ model2 }}
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      model: '',
      model2: []
    }
  },

  computed: {
    options () {
      return [
        {
          label: 'Opção 1',
          value: 1
        },
        {
          label: 'Opção 2',
          value: 2
        },
        {
          label: 'Opção 3',
          value: 3
        },
        {
          label: 'Opção 4',
          value: 4
        },
        {
          label: 'Opção 5',
          value: 5
        },
        {
          label: 'Opção 6',
          value: 6
        },
        {
          label: 'Opção 7',
          value: 7
        },
        {
          label: 'Opção 8',
          value: 8
        }
      ]
    }
  }
}
</script>
