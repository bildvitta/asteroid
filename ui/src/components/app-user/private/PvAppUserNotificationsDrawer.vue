<template>
  <qas-drawer v-bind="drawerProps" v-model="model">
    <div class="fixed-position">
      <div class="justify-end row">
        <qas-btn class="q-mb-xl" icon="sym_r_check_circle" label="Marcar todas como lida" @click="markAsRead" />
      </div>

      <div>
        <qas-infinite-scroll v-model:list="notifications" max-height="calc(100vh - 165px)" url="http://localhost:8000/api/users/me/notifications">
          <qas-list-items :list="notifications" :use-clickable-item="false" :use-section-actions="false">
            <template #item-section="{ item }">
              <pv-app-user-notification-card :notification="item" />
            </template>
          </qas-list-items>
        </qas-infinite-scroll>
      </div>
    </div>
  </qas-drawer>
</template>

<script setup>
import PvAppUserNotificationCard from './PvAppUserNotificationCard.vue'
import QasDrawer from '../../drawer/QasDrawer.vue'
import QasInfiniteScroll from '../../infinite-scroll/QasInfiniteScroll.vue'

import { promiseHandler } from '../../../helpers'

import { computed, ref } from 'vue'
// import { computed, inject, ref } from 'vue'

defineOptions({ name: 'PvAppUserNotificationsDrawer' })

const props = defineProps({
  model: {
    type: Boolean
  }
})

const emit = defineEmits(['update:modelValue'])

// TODO: remover
// const accessToken = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI5YjI3Y2Y0MS0wMDk1LTQ2MDctOTdiMC03YzEyNzc4Zjc5OTEiLCJqdGkiOiJhOWMxYTA3NDYyMTVlZDVmY2UxYTUwOGU3MjRkZGVjYWI4OWI2M2JlYzc3NTdjOWQxNjY4OGE3MDBhODE5ODU3NjQ0ZjE1MGQyOWE1Yjg5OSIsImlhdCI6MTcwNTk1MzAzMS4xODAyMTQsIm5iZiI6MTcwNTk1MzAzMS4xODAyMTUsImV4cCI6MTczNzU3NTQzMS4xNzE4OTksInN1YiI6IjM1MiIsInNjb3BlcyI6WyIqIl19.uuEBT_vwqK-5LoAmADtcvdEcI0wUUp4T5AMIUctE_6mN4IOltbHWZr6I_bXe49jcpYwRKdVGH-WqdLBYV79MM2iBYKKBQg73a7YlsCAvJAK5GtzQQgntzg3-9QJFigS6WgxHfpbZx4owaIm-sV_PzhqVqFGMcLICbp0y09j20fqXUsLlTe-feL8bCU-Oisa0yQx5cAwtC8RpZlXgCcTqKZt0hibSUKLYAKHSlV7H4l-VMFd4_WsJ_swmLfXj8LyIQY023TdxkSbkBAbLi5U3nLAf6jRg7kNkfCeCZHHSQujAzbTAHYrAM7E2itdL_UJ7E5oGg6K4SNSq1Lca-JsYRcYRcRXuogMSwoI5WMW4UGBUN2CHIvsn80N6HmFHCnfjPzbztSCKAhmTRjdErvOmed03moeHZ7es0jxbfdgUb5GMpeOnce4BiRG5TVhowNvpyq1rt_lIwigCVFj_qOUref40JIS6vg9vxlVZl93_A7ResfUUoGp0xJ8o167dK8lHyAuw6TVUgimkARlmHtRLhVkqOalt3A7MwuNPVCFu_0_kfjBRd7DyiM9g_tmySJEO0wQgCEkrjGNveyvH4fSYRYtLrf104KHG0nC_vf6r5BA-bdHm5x6AB776BwhgLzOQhR8fwtkBZZW_WroQqdhai8BrZJudEnoQqXF5wpMq7lg'

// const axios = inject('axios')

const isMarkingNotificationsAsRead = ref(false)
const notifications = ref([])

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

// const notificationsMock = [
//   {
//     uuid: '31362c39-2cb5-4fe2-982a-c270f88d246235',
//     read: true,
//     title: 'Venda assinada',
//     message: 'A venda com ID #56902 foi aprovada por Rachel Melo Muniz.',
//     createdAt: '2024-01-19T03:54:11.000Z',
//     link: 'http://localhost:8080/users'
//   },
//   {
//     uuid: '31362c39-2cb5-4fe2-51-c270f88d24684',
//     read: false,
//     title: 'Contrato assinado',
//     message: 'O contrato da venda ID #56902 foi assinado por todas as partes.',
//     createdAt: '2022-03-18T04:54:11.000Z',
//     link: ''
//   },
//   {
//     uuid: '31362c39-7823-4fe2-982a-c270f88d246235',
//     read: false,
//     title: 'Venda reprovada',
//     message: 'A venda com ID #12993 foi reprovada por Rachel Melo Muniz.',
//     createdAt: '2022-03-18T04:54:11.000Z',
//     link: 'https://www.youtube.com/watch?v=1zEIuTPho34'
//   },
//   {
//     uuid: '31362c39-2cb5-4354-982a-c270f88d246235',
//     read: true,
//     title: 'Venda assinada',
//     message: 'A venda com ID #56902 foi aprovada por Rachel Melo Muniz.',
//     createdAt: '2024-01-19T03:54:11.000Z',
//     link: 'https://www.youtube.com/watch?v=1zEIuTPho34'
//   },
//   {
//     uuid: '31362c39-2cb5-245-51-c270f88d24684',
//     read: false,
//     title: 'Contrato assinado',
//     message: 'O contrato da venda ID #56902 foi assinado por todas as partes.',
//     createdAt: '2022-03-18T04:54:11.000Z',
//     link: ''
//   },
//   {
//     uuid: '31362c39-7823-445y-982a-c270f88d246235',
//     read: false,
//     title: 'Venda reprovada',
//     message: 'A venda com ID #12993 foi reprovada por Rachel Melo Muniz.',
//     createdAt: '2022-03-18T04:54:11.000Z',
//     link: 'https://www.youtube.com/watch?v=1zEIuTPho34'
//   },
//   {
//     uuid: '31362c39-2cb5-214-982a-c270f88d246235',
//     read: true,
//     title: 'Venda assinada',
//     message: 'A venda com ID #56902 foi aprovada por Rachel Melo Muniz.',
//     createdAt: '2024-01-19T03:54:11.000Z',
//     link: 'https://www.youtube.com/watch?v=1zEIuTPho34'
//   },
//   {
//     uuid: '31362c39-2cb5-4fe2-51-c270f88d24684',
//     read: false,
//     title: 'Contrato assinado',
//     message: 'O contrato da venda ID #56902 foi assinado por todas as partes.',
//     createdAt: '2022-03-18T04:54:11.000Z',
//     link: ''
//   },
//   {
//     uuid: '5634-7823-4fe2-982a-c270f88d246235',
//     read: false,
//     title: 'Venda reprovada',
//     message: 'A venda com ID #12993 foi reprovada por Rachel Melo Muniz.',
//     createdAt: '2022-03-18T04:54:11.000Z',
//     link: 'https://www.youtube.com/watch?v=1zEIuTPho34'
//   },
//   {
//     uuid: '31362c39-2cb5-4fe2-982a-c270f88d246235',
//     read: true,
//     title: 'Venda assinada',
//     message: 'A venda com ID #56902 foi aprovada por Rachel Melo Muniz.',
//     createdAt: '2024-01-19T03:54:11.000Z',
//     link: 'https://www.youtube.com/watch?v=1zEIuTPho34'
//   },
//   {
//     uuid: '31362c39-2cb5-4fe2-51-c270465f88d24684',
//     read: false,
//     title: 'Contrato assinado',
//     message: 'O contrato da venda ID #56902 foi assinado por todas as partes.',
//     createdAt: '2022-03-18T04:54:11.000Z',
//     link: ''
//   },
//   {
//     uuid: '31362c39-7823-4fe2-982a-c270f4588d246235',
//     read: false,
//     title: 'Venda reprovada',
//     message: 'A venda com ID #12993 foi reprovada por Rachel Melo Muniz.',
//     createdAt: '2022-03-18T04:54:11.000Z',
//     link: 'https://www.youtube.com/watch?v=1zEIuTPho34'
//   },
//   {
//     uuid: '31362c39-2c577b5-4fe2-982a-c270f88d246235',
//     read: false,
//     title: 'Venda assinada',
//     message: 'A venda com ID #56902 foi aprovada por Rachel Melo Muniz.',
//     createdAt: '2024-01-22T16:10:11.000Z',
//     link: 'http://localhost:8080/companies'
//   },
//   {
//     uuid: '31362c39-2cb5-4f5657e2-51-c270f88d24684',
//     read: false,
//     title: 'Contrato assinado',
//     message: 'O contrato da venda ID #56902 foi assinado por todas as partes.',
//     createdAt: '2022-03-18T04:54:11.000Z',
//     link: ''
//   },
//   {
//     uuid: '31362c39-7823-4fdfdse2-982a-c270f88d246235',
//     read: false,
//     title: 'Venda reprovada',
//     message: 'A venda com ID #12993 foi reprovada por Rachel Melo Muniz.',
//     createdAt: '2022-03-18T04:54:11.000Z',
//     link: 'https://www.youtube.com/watch?v=1zEIuTPho34'
//   },
//   {
//     uuid: '31362c39-2cb5-4fe2-976h82a-c270f88d246235',
//     read: true,
//     title: 'Venda assinada',
//     message: 'A venda com ID #56902 foi aprovada por Rachel Melo Muniz.',
//     createdAt: '2024-01-19T03:54:11.000Z',
//     link: 'https://www.youtube.com/watch?v=1zEIuTPho34'
//   },
//   {
//     uuid: '31362c39-2cb5-4fe2-51-c2cvv70f88d24684',
//     read: false,
//     title: 'Contrato assinado',
//     message: 'O contrato da venda ID #56902 foi assinado por todas as partes.',
//     createdAt: '2022-03-18T04:54:11.000Z',
//     link: ''
//   },
//   {
//     uuid: '31362c39-7823-4fe2-982a-c270f88d246235',
//     read: false,
//     title: 'Venda reprovada',
//     message: 'A venda com ID #12993 foi reprovada por Rachel Melo Muniz.',
//     createdAt: '2022-03-18T04:54:11.000Z',
//     link: 'https://www.youtube.com/watch?v=1zEIuTPho34'
//   },
//   {
//     uuid: '31362c39-2cb5-4fe2-98fds2a-c270f88d246235',
//     read: true,
//     title: 'Venda assinada',
//     message: 'A venda com ID #56902 foi aprovada por Rachel Melo Muniz.',
//     createdAt: '2024-01-19T03:54:11.000Z',
//     link: 'https://www.youtube.com/watch?v=1zEIuTPho34'
//   },
//   {
//     uuid: '31362c39-2cb5-4fghe2-51-c270f88d24684',
//     read: false,
//     title: 'Contrato assinado',
//     message: 'O contrato da venda ID #56902 foi assinado por todas as partes.',
//     createdAt: '2022-03-18T04:54:11.000Z',
//     link: ''
//   },
//   {
//     uuid: '31362c39-7823-4feyhfg2-982a-c270f88d246235',
//     read: false,
//     title: 'Venda reprovada',
//     message: 'A venda com ID #12993 foi reprovada por Rachel Melo Muniz.',
//     createdAt: '2022-03-18T04:54:11.000Z',
//     link: 'https://www.youtube.com/watch?v=1zEIuTPho34'
//   }
// ]

async function markAsRead () {
  const { data } = promiseHandler(
    (() => new Promise(resolve => setTimeout(resolve, 2000)))(),
    // axios.patch('/users/me/notifications', { markAsRead: true }),
    {
      useLoading: false,
      errorMessage: 'Falha ao marcar todas notificações como lida. Por favor, tente novamente em alguns minutos.',
      onLoading: isLoading => {
        isMarkingNotificationsAsRead.value = isLoading
      }
    }
  )

  if (data) console.log(data)
}
</script>
