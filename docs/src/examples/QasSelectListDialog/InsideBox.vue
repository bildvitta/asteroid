<template>
  <qas-box class="container q-my-lg">
    <qas-select-list-dialog v-model="model" v-bind="props" />

    <div class="q-mt-lg">
      Model:
      <qas-debugger :inspect="[model]" />
    </div>
  </qas-box>
</template>

<script>
export default {
  data () {
    return {
      model: [],
      options: [],
      results: []
    }
  },

  computed: {
    props () {
      return {
        addButtonProps: {
          label: 'Adicionar itens'
        },
        listLabel: 'Itens selecionados',
        description: 'Selecione os itens que deseja adicionar',
        label: 'Itens',
        options: this.options,
        dialogProps: {
          card: {
            description: 'Selecione os itens que deseja adicionar'
          }
        }
      }
    }
  },

  created () {
    for (let index = 0; index < 48; index++) {
      this.options.push({
        label: `item ${index}`,
        value: `uuid${index}`
      })
    }
  }
}
</script>
