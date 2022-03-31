<template>
  <div class="container spaced">
    <div>Com children: </div>
    <qas-checkbox-group v-model="model" :options="childrenOptions" />

    <div class="q-my-lg">
      model: <qas-debugger :inspect="[model]" />
    </div>

    <div>Sem children: </div>
    <qas-checkbox-group v-model="model2" :options="options" />

    <div class="q-my-lg">
      model2: <qas-debugger :inspect="[model2]" />
    </div>
  </div>
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
    childrenOptions () {
      return [
        {
          label: 'Opção 1',
          value: 1,
          children: [
            {
              label: 'Opção 2',
              value: 2
            },
            {
              label: 'Opção 3',
              value: 3
            }
          ]
        }
      ]
    },

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
        }
      ]
    }
  }
}
</script>
