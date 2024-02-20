<template>
  <div class="container spaced">
    <div class="q-col-gutter-y-lg row">
      <div class="col-12 col-sm-6">
        <qas-date v-model="date" :events="events" />
      </div>

      <div class="col-12">
        Model
        <qas-debugger :inspect="[date]" />
      </div>
    </div>
  </div>
</template>

<script>
import { date } from 'quasar'

const today = new Date()
const yesterday = date.subtractFromDate(today, { days: 1 })
const tomorrow = date.addToDate(today, { days: 1 })

export default {
  data () {
    return {
      date: date.formatDate(today, 'YYYY-MM-DD'),
      events: [
        {
          date: date.formatDate(yesterday, 'YYYY-MM-DD'),
          counter: 8
        },
        {
          date: date.formatDate(today, 'YYYY-MM-DD'),
          counter: 12
        },
        {
          date: date.formatDate(tomorrow, 'YYYY-MM-DD'),
          counter: 123
        }
      ]
    }
  }
}
</script>
