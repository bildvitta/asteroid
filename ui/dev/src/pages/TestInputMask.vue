<template>
  <q-page class="container flex flex-center spaced">
    <qas-input v-model="document" mask="document" outlined />
  </q-page>
</template>

<script>
export default {
  name: 'TestInputMask',

  data () {
    return {
      document: '75646872000120'
    }
  }
}
</script>
