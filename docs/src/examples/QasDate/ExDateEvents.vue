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
      date: '2023-06-06',
      events: [
        {
          date: '2023-06-06',
          counter: 2
        },
        {
          date: '2023-06-03',
          counter: 2
        },
        {
          date: '2023-05-30',
          counter: 2
        },
        {
          date: '2023-05-29',
          counter: 2
        },
        {
          date: '2023-07-01',
          counter: 2
        },
        {
          date: '2023-07-04',
          counter: 2
        },
        {
          date: '2023-12-31',
          counter: 2
        },
        {
          date: '2024-01-01',
          counter: 2
        }
      ]
    }
  }
}
</script>
