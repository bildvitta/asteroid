<template>
  <div class="container q-py-lg">
    <qas-select-list-dialog ref="selectListDialog" v-model="model" v-bind="props">
      <template #dialog-description>
        <div>
          <q-toggle v-model="toggle" label="Confirmar antes de aparecer o QasSelectList" />

          <qas-select-list v-if="toggle" v-model="selectListModel" v-bind="selectListProps" />
        </div>
      </template>
    </qas-select-list-dialog>

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
      model: [],
      selectListModel: [],
      options: [],
      results: [],
      toggle: false
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
          ok: {
            disable: !this.selectListModel.length,
            onClick: () => this.$refs.selectListDialog.add({ options: this.selectListModel })
          },

          onBeforeShow: () => {
            this.selectListModel = []
          }
        },

        onAdd (value) {
          console.log('fui adc', value)
        },

        onRemove (value) {
          console.log('fui remov', value)
        }
      }
    },

    selectListProps () {
      return {
        emitValue: false,

        searchBoxProps: {
          list: this.options,
          optionsToExclude: this.model
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
