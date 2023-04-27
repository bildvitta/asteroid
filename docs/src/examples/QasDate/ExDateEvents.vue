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
      date: '2023-04-05',
      events: ['2023-04-01', '2023-04-05', '2023-04-06', '2023-04-07', '2023-04-08', '2023-04-10', '2023-04-30', '2023-05-01', '2023-05-06']
    }
  }
}
</script>
