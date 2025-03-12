<template>
  <!-- Usando qas-single-view apenas para recuperar os dados -->
  <qas-single-view v-model:fields="viewState.fields" v-model:result="viewState.result" v-bind="singleViewProps">
    <template #default>
      <div>
        <div>
          <qas-label label="object" />

          <qas-grid-generator v-bind="gridGeneratorProps" :fields="viewState.fields" :result="viewState.result" />

          <q-separator class="q-mt-xl" />
        </div>

        <qas-label class="q-mt-xl" label="string" />

        <qas-grid-generator v-bind="gridGeneratorStringProps" />
      </div>
    </template>
  </qas-single-view>
</template>

<script setup>
import { ref, computed } from 'vue'

defineOptions({ name: 'ExGridCommonColumns' })

const viewState = ref({
  fields: {},
  result: []
})

const entity = 'users'

const customId = '3102fad5-f14c-45d4-98e9-46ef0aa9580e'

const singleViewProps = {
  entity,
  customId
}

const gridGeneratorProps = {
  commonColumns: { col: 12, sm: 3 },
  columns: {
    name: { col: 12, sm: 12 }
  }
}

const gridGeneratorStringProps = computed(() => {
  /**
   * Adicionando um campo do tipo textarea onde será mais comúm o uso do "commonColumns" em conjunto com o "columns".
   */
  const fields = {
    ...viewState.value.fields,

    description: {
      type: 'textarea',
      label: 'Descrição'
    }
  }

  const result = {
    ...viewState.value.result,

    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a feugiat ipsum. Integer nec varius velit. Curabitur euismod, urna in varius fermentum, mi eros sollicitudin lorem, in eleifend odio magna a nulla. Praesent facilisis, ligula id pellentesque posuere, ligula sapien lacinia nulla, et bibendum ligula mi at eros. Morbi ut diam non nulla fermentum viverra. Nulla facilisi. Proin scelerisque nisi nec lectus vehicula, a consequat felis lacinia.'
  }

  return {
    fields,

    result,

    commonColumns: '3',
    columns: {
      description: { col: 12 }
    }
  }
})
</script>
