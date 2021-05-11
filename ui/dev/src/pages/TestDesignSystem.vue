<template>
  <q-page class="container flex flex-center spaced">
    <div>
      <qas-box form-mode>
        <div>Primary: <input v-model="primaryColor" type="color"> ({{ primaryColor }})</div>
        <div>Secondary: <input v-model="secondaryColor" type="color"> ({{ secondaryColor }}</div>
      </qas-box>

      <qas-box>
        <div class="shadow-primary">box shadow</div>

        <q-radio v-model="radio" label="Radio" val="1" />
        <q-radio v-model="radio" label="Ou não?" val="2" />

        <br>

        <q-btn color="primary" label="Random Colors" @click="changeColor" />
      </qas-box>
    </div>
  </q-page>
</template>

<script>
import { colors } from 'quasar'

export default {
  data () {
    return {
      primaryColor: '',
      secondaryColor: '',

      radio: ''
    }
  },

  watch: {
    primaryColor () {
      colors.setBrand('primary', this.primaryColor)
    },

    secondaryColor () {
      colors.setBrand('secondary', this.secondaryColor)
    }
  },

  methods: {
    changeColor () {
      this.primaryColor = '#' + this.getRandomColor()
      this.secondaryColor = '#' + this.getRandomColor()
    },

    getRandomColor () {
      return Math.floor(Math.random() * 16777215).toString(16)
    }
  }
}
</script>
