<template>
  <!-- Usando qas-single-view apenas para recuperar os dados -->
  <qas-single-view v-model:fields="viewState.fields" v-model:result="viewState.result" v-bind="singleViewProps">
    <template #default>
      <div>
        <div>
          <qas-label label="object" />

          <qas-form-generator v-bind="formGeneratorProps" v-model="viewState.values" :fields="viewState.fields" />

          <q-separator class="q-mt-xl" />
        </div>

        <qas-label class="q-mt-xl" label="string" />

        <qas-form-generator v-bind="formGeneratorStringProps" v-model="viewState.values" :fields="viewState.fields" />
      </div>
    </template>
  </qas-single-view>
</template>

<script setup>
import { ref } from 'vue'

defineOptions({ name: 'ExFormCommonColumns' })

const viewState = ref({
  fields: {},
  values: []
})

const entity = 'users'

const customId = '3102fad5-f14c-45d4-98e9-46ef0aa9580e'

const singleViewProps = {
  entity,
  customId
}

const formGeneratorProps = {
  commonColumns: { col: 12, sm: 3 },
  columns: {
    name: { col: 12, sm: 12 }
  }
}

const formGeneratorStringProps = {
  commonColumns: '3',
  columns: {
    name: { col: 12 }
  }
}
</script>
