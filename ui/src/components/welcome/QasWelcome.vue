<template>
  <div class="q-mb-md text-left">
    <h5 class="text-grey-9 text-h5">
      {{ welcomeMessage }}<span v-if="name">, <span class="text-primary text-uppercase">{{ name }}</span></span>
    </h5>

    <div class="text-grey-8">{{ currentDay }}</div>
  </div>
</template>

<script>
import { date } from 'quasar'
import dateConfig from '../../shared/date-config.js'

export default {
  name: 'QasWelcome',

  props: {
    name: {
      default: 'Douglas Calora Agostinho',
      type: String
    }
  },

  computed: {
    currentDay () {
      const timeStamp = Date.now()
      const { daysList, monthsList } = dateConfig

      // exemplo: Quarta, 11 de janeiro de 2023
      return date.formatDate(
        timeStamp, 'dddd, DDD [de] MMMM [de] YYYY', { days: daysList, months: monthsList }
      )
    },

    welcomeMessage () {
      // const today = new Date(2022, 0, 11, 5, 0, 0)
      const today = new Date()
      const time = date.formatDate(today, 'HH:mm')

      if (time >= '05:00' && time < '11:59') return 'Bom dia'

      if (time >= '12:00' && time < '18:59') return 'Boa tarde'

      return 'Boa noite'
    }
  }
}
</script>
