<template>
  <qas-table-generator :fields :results v-bind="tableGeneratorProps" />
</template>

<script setup>
import { fields, results } from 'src/mocks/users'

defineOptions({ name: 'WithFieldsProps' })

const tableGeneratorProps = {
  columns: [
    'isActive',
    'document',
    'companies',
    'createdAt',
    'company',
    'date',
    'email',
    'observation'
  ],

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
      isActive: {
        component: 'QasStatus',
        props: {
          color: row.default.isActive ? 'green' : 'red'
        }
      },

      createdAt: {
        component: 'QasBadge'
      },

      companies: {
        component: 'QasTextTruncate',
        props: {
          list: row.companies,
          maxVisibleItems: 1
        }
      },

      document: {
        component: 'QasToggleVisibility'
      },

      name: {
        component: 'QasTextTruncate',
        props: {
          maxWidth: 150
        }
      },

      company: {
        component: 'QasTextTruncate'
      },

      email: {
        component: 'QasCopy'
      },

      observation: {
        component: 'QasTextTruncate'
      }
    }
  },

  onRowClick: () => ({})
}
</script>
