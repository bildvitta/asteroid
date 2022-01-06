<template>
  <q-page class="container flex">
    <div class="col-6">
      <pre>{{ dateField }}</pre>
      <qas-field v-model="date" :field="dateField" />
      <pre>{{ date }}</pre>

      <pre>{{ timeField }}</pre>
      <qas-field v-model="time" :field="timeField" />
      <pre>{{ time }}</pre>

      <pre>{{ dateTimeField }}</pre>
      <qas-field v-model="dateTime" :field="dateTimeField" />
      <pre>{{ dateTime }}</pre>
    </div>

    <div class="col-6">
      <pre>{{ dateFieldGtm }}</pre>
      <qas-field v-model="dateGtm" :field="dateFieldGtm" />
      <pre>{{ dateGtm }}</pre>

      <pre>{{ timeFieldGtm }}</pre>
      <qas-field v-model="timeGtm" :field="timeFieldGtm" />
      <pre>{{ timeGtm }}</pre>

      <pre>{{ dateTimeFieldGtm }}</pre>
      <qas-field v-model="dateTimeGtm" :field="dateTimeFieldGtm" />
      <pre>{{ dateTimeGtm }}</pre>
    </div>
  </q-page>
</template>

<script>
export default {
  data () {
    return {
      date: '',
      time: '',
      dateTime: '',
      dateGtm: '',
      timeGtm: '',
      dateTimeGtm: ''
    }
  },

  computed: {
    dateField () {
      return { name: 'onlyDate', type: 'date', label: 'Data apenas' }
    },

    timeField () {
      return { name: 'onlyTime', type: 'time', label: 'Tempo apenas' }
    },

    dateTimeField () {
      return { name: 'dateTime', type: 'datetime', label: 'Date Time' }
    },

    dateFieldGtm () {
      return { name: 'onlyDate', type: 'date', label: 'Data apenas GTM', gmt: true }
    },

    timeFieldGtm () {
      return { name: 'onlyTime', type: 'time', label: 'Tempo apenas GTM', gmt: true }
    },

    dateTimeFieldGtm () {
      return { name: 'dateTime', type: 'datetime', label: 'Date Time GTM', gmt: true }
    }
  }
}
</script>
