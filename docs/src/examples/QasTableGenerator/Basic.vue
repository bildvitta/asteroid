<template>
  <!-- Utilizando o list-view apenas para facilitar para recuperar os dados dos dados. -->
  <qas-list-view v-model:fields="viewState.fields" v-model:results="viewState.results" :entity :use-filter="false">
    <template #default>
      <qas-table-generator :fields="viewState.fields" :results="viewState.results" v-bind="tableGeneratorProps">
      <!-- <qas-table-generator :columns :fields="fields" :fields-props :results="results" row-key="uuid"> -->
        <!-- <template #body-cell-name>
          <qas-toggle-visibility data-table-ignore-hover text="64.829.511/0001-01" />
        </template> -->
      </qas-table-generator>
    </template>
  </qas-list-view>
</template>

<script setup>
import { useView } from '@bildvitta/composables'

defineOptions({ name: 'Basic' })

// composables
const { viewState } = useView({ mode: 'list' })

const entity = 'users'

const tableGeneratorProps = {
  columns: ['document', 'name', 'email', 'phone'],

  fieldsProps: {
    document: {
      component: 'QasStatus'
    },

    name: {
      component: 'QasTextTruncate',
      props: {
        maxWidth: 150
      }
    },

    email: {
      component: 'QasCopy',
      props: {}
    },

    sla: {
      component: 'QasBtn',
      props: {
        onClick: () => {
        }
      }
    }
  },

  rowRouteFn: row => {
    return ''
  },

  onRowClick: () => ({})
}
</script>
