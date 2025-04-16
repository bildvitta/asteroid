<template>
  <qas-table-generator :fields :results v-bind="tableGeneratorProps">
    <!-- <qas-table-generator :columns :fields="fields" :fields-props :results="results" row-key="uuid"> -->
    <template #body-cell-name>
      <qas-toggle-visibility data-table-ignore-hover text="64.829.511/0001-01" />
    </template>
  </qas-table-generator>
</template>

<script setup>
import { fields, results } from 'src/mocks/users'

defineOptions({ name: 'Basic' })

const tableGeneratorProps = {
  columns: ['isActive', 'document', 'companies', 'createdAt', { sortable: false, name: 'date' }],

  actionsMenuProps (row) {
    return {
      list: {
        visibility: {
          label: 'Visibilidade',
          icon: 'sym_r_person',
          handler: () => alert(row.uuid)
        }
      }
    }
  },

  fieldsProps (row) {
    return {
      companies: {
        component: 'QasTextTruncate',
        props: {
          list: row.companies,
          maxVisibleItems: 1
        }
      },

      document: {
        component: 'QasCopy'
      },

      name: {
        component: 'QasTextTruncate',
        props: {
          maxWidth: 150
        }
      },

      email: {
        component: 'QasCopy'
      }
    }
  }

  // rowRouteFn: row => {
  //   return ''
  // },

  // onRowClick: () => ({})
}
</script>
