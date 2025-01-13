<template>
  <qas-list-view v-model:fields="viewState.fields" v-model:results="viewState.results" :entity use-company-filter :use-filter="false" @fetch-success="onFetchSuccess">
    <template #header>
      <div class="q-pa-lg">
        <qas-company-select :options />
      </div>
    </template>

    <template #default>
      <div class="q-my-lg q-pa-lg">
        Template default
        <div>
          Results: <qas-debugger :inspect="[viewState.results]" />
        </div>
        <div>
          Fields: <qas-debugger :inspect="[viewState.fields]" />
        </div>
      </div>
    </template>
  </qas-list-view>
</template>

<script setup>
import { useView } from '@bildvitta/composables'

const { viewState } = useView({ mode: 'list' })

const entity = 'users'

const options = [
  {
    label: 'Empresa 1',
    value: '1'
  },
  {
    label: 'Empresa 2',
    value: '2'
  },
  {
    label: 'Empresa 3',
    value: '3'
  },
  {
    label: 'Empresa 4',
    value: '4'
  },
  {
    label: 'Empresa 5',
    value: '5'
  }
]

// functions
function onFetchSuccess (results) {
  console.log('TCL: onFetchSuccess -> results', results)
}
</script>
