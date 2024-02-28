<template>
  <div class="q-py-md" style="height: 500px; background-color: var(--qas-background-color);">
    <qas-board-generator
      v-model="boardColumns"
      column-id-key="id"
      column-url="url-example"
      height="400px"
      :results="results"
    >
      <template #header-column="{ context }">
        <div class="flex justify-between text-subtitle1">
          <div>{{ context.name }}</div>
        </div>
      </template>

      <template #column-item="{ context }">
        <qas-box
          class="full-width q-mb-lg"
          style="height: 200px;"
        >
          <div class="q-mb-lg">
            Card - {{ context.item }}
          </div>
        </qas-box>
      </template>
    </qas-board-generator>
  </div>
</template>

<script>
export default {
  name: 'Basic',

  data () {
    return {
      boardColumns: {
        /*
        * Somente de exemplo, quando na verdade o componente será responsável por bater
        * as APIs das colunas com base no headers fornecidos. É possível manipular as
        * colunas do lado de fora através deste model, como neste exemplo.
        */
        'col-1': [
          { item: 'item 1 da coluna 1' },
          { item: 'item 2 da coluna 1' },
          { item: 'item 3 da coluna 1' }
        ],
        'col-2': [
          { item: 'item 1 da coluna 2' },
          { item: 'item 2 da coluna 2' },
          { item: 'item 3 da coluna 2' }
        ],
        'col-3': [
          { item: 'item 1 da coluna 3' },
          { item: 'item 2 da coluna 3' },
          { item: 'item 3 da coluna 3' }
        ]
      },

      /*
      * Headers na qual deverá fornecer para o componente.
      */
      results: [
        {
          id: 'col-1',
          name: 'Coluna 1'
        },
        {
          id: 'col-2',
          name: 'Coluna 2'
        },
        {
          id: 'col-3',
          name: 'Coluna 3'
        }
      ]
    }
  }
}
</script>
