<template>
  <qas-list-view v-model:fields="viewState.fields" v-model:results="viewState.results" :entity="entity" :use-filter="false">
    <template #default>
      <qas-table-generator :fields="viewState.fields" :results="viewState.results" row-key="uuid">
        <template #body-cell-name="{ row }">
          <qas-text-truncate dialog-title="Aqui está meu título!" :max-width="180" :text="row.name" />
        </template>
      </qas-table-generator>
    </template>
  </qas-list-view>
</template>

<script setup>
import { useView } from '@bildvitta/composables'

const { viewState } = useView({ mode: 'list' })

const entity = 'users'
</script>
