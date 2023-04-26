<template>
  <div class="container spaced">
    <div>
      <qas-date v-model="model" :events="['2023-03-30', '2023-04-01', '2023-04-05', '2023-04-06', '2023-04-07', '2023-04-08', '2023-04-10', '2023-04-30', '2023-05-01', '2023-05-06']" :events2="eventsFn" label="Meu DateTimeInput" :options2="['2023-04-05', '2023-04-06', '2023-04-07', '2023-04-08', '2023-04-10']" />

      <!-- <div class="q-mt-xl">Model: {{ model }}</div> -->
      <!-- <qas-btn label="test" @click="model = '2023-05-25'" /> -->
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      model: '2023-03-30'
    }
  },

  methods: {
    eventsFn (date) {
      console.log('🚀 ~ file: Basic.vue:22 ~ eventsFn ~ date:', date)
      const parts = date.split('/')
      return parts[2] % 2 === 0
    }
  }

}
</script>
