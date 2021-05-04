<template>
  <q-page class="container flex flex-center spaced">
    <div class="shadow-primary">box shadow</div>

    <q-radio v-model="radio" label="Radio" val="1" />
    <q-radio v-model="radio" label="Ou não?" val="2" />

    <q-btn label="change color" @click="changeColor" />
  </q-page>
</template>

<script>
import { colors } from 'quasar'

export default {
  data () {
    return {
      radio: ''
    }
  },

  methods: {
    changeColor () {
      const color = Math.floor(Math.random() * 16777215).toString(16)
      colors.setBrand('primary', '#' + color)
    }
  }
}
</script>
