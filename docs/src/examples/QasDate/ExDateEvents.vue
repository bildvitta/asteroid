<template>
  <div class="container spaced">
    <div class="q-col-gutter-y-lg row">
      <div class="col-12 col-sm-6">
        <!-- <q-date v-model="date" :events="events.map(({ date }) => date)" @navigation="navigation" /> -->
        <!-- <pre>{{ events.map(({ date }) => date) }}</pre> -->
        <qas-date v-model="date" :event-color="eventFn" :events="events" :use-inactive-dates2="false" @navigation="navigation" />
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
      date: '2023-06-10',
      // date: ['2023-05-26'],
      // events: ['2023-03-31', '2023-04-05', '2023-04-06', '2023-04-07', '2023-04-08', '2023-04-10', '2023-04-30', '2023-05-01', '2023-05-06']
      // events: []
      events: [
        {
          date: '2023-06-01',
          counter: 2
        },
        {
          date: '2023-06-03',
          counter: 2
        },
        {
          date: '2023-05-31',
          counter: 2
        },
        {
          date: '2023-07-01',
          counter: 2
        }
      ]
    }
  },

  mounted () {
    // this.navigation()
    // setTimeout(() => {
    // }, 3000)
  },

  methods: {
    eventFn (date) {
      return date.includes('30') ? 'negative' : 'positive'
    },

    async navigation () {
      await new Promise(resolve => setTimeout(resolve, 3000))
      this.events = [
        {
          date: '2023-06-02',
          counter: 2
        },
        {
          date: '2023-06-30',
          counter: 2
        },
        {
          date: '2023-07-04',
          counter: 2
        },
        {
          date: '2023-07-31',
          counter: 2
        },
        {
          date: '2023-08-01',
          counter: 2
        }
      ]
    }
  }
}
</script>
