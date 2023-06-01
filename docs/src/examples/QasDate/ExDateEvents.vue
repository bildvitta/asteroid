<template>
  <div class="container spaced">
    <div class="q-col-gutter-y-lg row">
      <div class="col-12 col-sm-6">
        <qas-date v-model="date" :event-color2="eventFn" :events="events" :use-inactive-date2="false" :use-unmask-options="false" />
      </div>

      <div class="col-12">
        Model
        <qas-debugger :inspect="[date]" />
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      // date: '',
      date: '2022-01-29',
      // date: ['2023-05-26'],
      // events: ['2023-03-31', '2023-04-05', '2023-04-06', '2023-04-07', '2023-04-08', '2023-04-10', '2023-04-30', '2023-05-01', '2023-05-06']
      // events: []
      events: [
        {
          date: '2021-12-30',
          counter: 10
        },
        {
          date: '2022-01-29',
          counter: 12
        },
        {
          date: '2022-01-04',
          counter: 12
        },
        {
          date: '2022-02-02',
          counter: 12
        },
        {
          date: '2023-06-01',
          counter: 12
        },
        {
          date: '2023-06-02',
          counter: 12
        },
        {
          date: '2023-05-03',
          counter: 1
        },
        {
          date: '2023-05-05'
        }
      ]
    }
  },

  methods: {
    eventFn (date) {
      return date.includes('08') ? 'negative' : 'positive'
    }
  }
}
</script>
