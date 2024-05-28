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

        <qas-grid-generator v-bind="gridGeneratorStringProps" :fields="viewState.fields" :result="viewState.result" />
      </div>
    </template>
  </qas-single-view>
</template>

<script setup>
import { ref } from 'vue'

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

const gridGeneratorStringProps = {
  commonColumns: '3',
  columns: {
    name: { col: 12 }
  }
}
</script>
