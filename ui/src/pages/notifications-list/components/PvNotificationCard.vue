<template>
  <div class="items-center row">
    <div class="q-mr-sm">
      <q-icon :color="iconColor" name="sym_r_info" size="md" />
    </div>

    <div>
      <span class="text-caption text-grey-6">
        {{ dateLabel }}
      </span>

      <div class="items-center row">
        <h6 class="text-subtitle1" :class="titleClass">
          {{ props.notification.title }}
        </h6>

        <div v-if="hasBadge" class="q-ml-sm">
          <qas-badge color="indigo-1" label="Nova" text-color="grey-10" />
        </div>
      </div>

      <div class="q-mt-xs text-body1 text-grey-8">
        {{ props.notification.message }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { dateTime } from '../../../helpers/filters'

import { computed } from 'vue'
import { date } from 'quasar'

defineOptions({ name: 'PvNotificationCard' })

const props = defineProps({
  notification: {
    type: Object,
    default: () => ({})
  }
})

const iconColor = computed(() => props.notification.read ? 'grey-8' : 'primary')
const titleClass = computed(() => props.notification.read ? 'text-grey-8' : 'text-grey-10')

const isRecentNotification = computed(() => {
  const currentDate = new Date().toISOString()

  return date.getDateDiff(currentDate, props.notification.createdAt, 'minutes') < 10
  // return date.getDateDiff(currentDate, props.notification.createdAt, 'minutes') < 10
})

const hasBadge = computed(() => isRecentNotification.value && !props.notification.read)

const dateLabel = computed(() => {
  return isRecentNotification.value
    ? 'Agora mesmo'
    : dateTime(props.notification.createdAt, 'dd/MM/yyyy HH:mm')
})
</script>
