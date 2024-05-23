<template>
  <div class="container flex justify-center q-gutter-x-md q-py-lg">
    <qas-status v-for="(color, index) in colors" :key="index" :color="color" />
  </div>
</template>

<script>
import { QasStatus } from 'asteroid'

export default {
  components: {
    QasStatus
  },

  computed: {
    colors () {
      return [
        'light-blue-2',
        'green-14',
        'blue-8',
        'grey-10',
        'orange-8',
        'red-14',
        'yellow-14',
        'grey-7',
        'purple-7',
        'amber-2',
        'green-11'
      ]
    }
  }
}
</script>
