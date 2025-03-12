<template>
  <qas-list-view v-model:fields="fields" v-model:results="results" :entity="entity" :use-filter="false">
    <template #default>
      <qas-table-generator :fields="fields" :results="results" row-key="uuid">
        <template #parent-header>
          <div class="items-center q-gutter-x-sm q-my-md row">
            <qas-status color="grey-6" />

            <div class="text-body1">
              Acessando o slot do header
            </div>
          </div>
        </template>
      </qas-table-generator>
    </template>
  </qas-list-view>
</template>

<script setup>
import { ref } from 'vue'

defineOptions({ name: 'WithHeader' })

const entity = 'users'

const fields = ref({})
const results = ref([])
</script>
