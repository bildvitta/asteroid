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

export default {
  data () {
    return {
      date: '2024-01-29',
      events: [
        {
          date: '2024-01-31',
          counter: 2
        },
        {
          date: '2024-01-06',
          counter: 2
        },
        {
          date: '2024-01-03',
          counter: 2
        },
        {
          date: '2024-02-01',
          counter: 2
        },
        {
          date: '2024-02-20',
          counter: 2
        },
        {
          date: '2024-03-01',
          counter: 2
        },
        {
          date: '2024-03-04',
          counter: 2
        },
        {
          date: '2024-04-31',
          counter: 2
        },
        {
          date: '2024-04-01',
          counter: 2
        }
      ]
    }
  }
}
</script>
