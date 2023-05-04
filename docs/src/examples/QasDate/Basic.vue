<template>
  <div class="container spaced">
    <div class="q-col-gutter-y-lg row">
      <div class="col-12 col-sm-6">
        <qas-date v-model="date" />
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
      date: ''
    }
  }
}
</script>
