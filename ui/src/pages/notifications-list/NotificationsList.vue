<template>
  <qas-list-view v-model:results="results" v-bind="listViewProps">
    <template #header>
      <qas-page-header :breadcrumbs="breadcrumbs" :title="title" />
    </template>

    <template #default>
      <qas-list-items :list="results" :use-clickable-item="false" :use-section-actions="false">
        <template #item-section="{ item }">
          <pv-notification-card :notification="item" />
        </template>
      </qas-list-items>
    </template>
  </qas-list-view>
</template>

<script setup>
import PvNotificationCard from './components/PvNotificationCard'

import { ref } from 'vue'

defineOptions({ name: 'NotificationsList' })

const results = ref([])

const title = 'Notificações'

const breadcrumbs = [{ label: 'Notificações' }]

const listViewProps = {
  entity: 'notifications',
  useFilter: false,
  onFetchSuccess
}

// TODO: bater uma API para marcar todos como visto.
function onFetchSuccess () {}
</script>
