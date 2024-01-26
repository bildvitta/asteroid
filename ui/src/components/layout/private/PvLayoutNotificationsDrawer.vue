<template>
  <qas-drawer v-bind="drawerProps" v-model="model">
    <div class="fixed-position">
      <div class="justify-end row">
        <qas-btn class="q-mb-xl" icon="sym_r_check_circle" label="Marcar todas como lida" @click="markAsRead" />
      </div>

      <qas-infinite-scroll v-model:list="notifications" max-height="calc(100vh - 165px)" url="http://localhost:8000/api/users/me/notifications" @fetch-success="onFetchSuccess">
        <qas-list-items :list="notifications" :use-clickable-item="false" :use-section-actions="false">
          <template #item-section="{ item }">
            <pv-layout-notification-card :notification="item" />
          </template>
        </qas-list-items>
      </qas-infinite-scroll>
    </div>
  </qas-drawer>
</template>

<script setup>
import PvLayoutNotificationCard from './PvLayoutNotificationCard.vue'
import QasDrawer from '../../drawer/QasDrawer.vue'
import QasInfiniteScroll from '../../infinite-scroll/QasInfiniteScroll.vue'

import useNotifications, { onNotifyReceived } from '../../../composables/use-notifications'

import { promiseHandler } from '../../../helpers'

import { computed, ref, inject } from 'vue'

defineOptions({ name: 'PvLayoutNotificationsDrawer' })

const props = defineProps({
  model: {
    type: Boolean
  }
})

const emit = defineEmits(['update:modelValue'])

const axios = inject('axios')

const { setUnreadNotificationsCount } = useNotifications()

const hasMadeFirstFetch = ref(false)
const isMarkingNotificationsAsRead = ref(false)

const notifications = ref([])

/**
 * Quando o usuário ainda não abriu a central de notificações, a primeira vez que
 * ele abrir vai obter esses dados via API, mesmo que ele tenha recebido a notificação
 * em real time, após ele ter aberto as notificações pelo menos uma vez, todas
 * notificações recebidas em real time serão incrementadas na central de
 * notificação sem a necessidade de chamar a API e resetar a paginação (feita por scroll).
 */
onNotifyReceived(notification => {
  if (!hasMadeFirstFetch.value) return

  notifications.value.unshift(notification)
})

const model = computed({
  get () {
    return props.model
  },

  set (value) {
    emit('update:modelValue', value)
  }
})

const drawerProps = computed(() => {
  return {
    loading: isMarkingNotificationsAsRead.value,
    maxWidth: '60%',
    title: 'Notificações'
  }
})

async function markAsRead () {
  const { data } = await promiseHandler(
    axios.patch('/users/me/notifications', { markAllAsRead: true }),
    {
      useLoading: false,
      errorMessage: 'Falha ao marcar todas notificações como lida. Por favor, tente novamente em alguns minutos.',
      onLoading: isLoading => {
        isMarkingNotificationsAsRead.value = isLoading
      }
    }
  )

  /**
   * Ao marcar todas notificações como lida, é necessário percorrer todo o array
   * de "notifications" e setar a prop "isRead" como "true", para não precisar chamar
   * novamente a API para atualizar estes dados.
   */
  if (data) {
    notifications.value.forEach(notification => {
      notification.isRead = true
    })

    /**
     * Zera o contador de notificações, responsável pelo ícone no QasAppUser.
     */
    setUnreadNotificationsCount(0)
  }
}

function onFetchSuccess () {
  hasMadeFirstFetch.value = true
}
</script>
