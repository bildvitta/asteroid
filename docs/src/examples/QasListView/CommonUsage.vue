<template>
  <qas-list-view v-model:fields="fields" v-model:results="results" :entity use-auto-handle-on-delete>
    <template #header>
      <qas-page-header title="Lista de materiais" :use-breadcrumbs="false">
        <qas-btn icon="sym_r_add" label="Novo [item]" />
      </qas-page-header>
    </template>

    <template #default>
      <qas-table-generator v-bind="tableGeneratorProps">
        <template #body-cell-isActive="{ row }">
          <div class="text-weight-bold">{{ row.isActive }}</div>
        </template>
      </qas-table-generator>
    </template>
  </qas-list-view>
</template>

<script setup>
import { ref, computed } from 'vue'

defineOptions({ name: 'CommonUsage' })

// refs
const fields = ref({})
const results = ref([])

// consts
const entity = 'users'

// computeds
const tableGeneratorProps = computed(() => {
  return {
    rowKey: 'uuid',
    fields: fields.value,
    results: results.value,
    columns: ['name', 'email', 'isActive'],

    actionsMenuProps: row => {
      return {
        deleteProps: {
          deleteActionParams: {
            entity,
            id: row.uuid
          }
        }

      }
    }
  }
})
</script>
