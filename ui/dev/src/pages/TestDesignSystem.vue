<template>
  <q-page class="container flex flex-center spaced">
    <div>
      <qas-box class="border-left border-top rounded-borders-lg" form-mode>
        <div class="q-mb-md">
          <qas-avatar class="q-mr-sm" title="Teste" />
          <qas-avatar dark title="Outro" />
        </div>

        <div>Primary: <input v-model="primaryColor" type="color"> ({{ primaryColor }})</div>
        <div>Primary contrast: <input v-model="primaryContrastColor" type="color"> ({{ primaryContrastColor }})</div>
        <hr>
        <div>Secondary: <input v-model="secondaryColor" type="color"> ({{ secondaryColor }})</div>
        <div>Secondary contrast: <input v-model="secondaryContrastColor" type="color"> ({{ secondaryContrastColor }})</div>
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
      primaryContrastColor: '',
      secondaryColor: '',
      secondaryContrastColor: '',

      radio: ''
    }
  },

  watch: {
    primaryColor () {
      colors.setBrand('primary', this.primaryColor)
      colors.setBrand('primary-contrast', this.primaryContrastColor)
    },

    secondaryColor () {
      colors.setBrand('secondary', this.secondaryColor)
      colors.setBrand('secondary-contrast', this.secondaryContrastColor)
    }
  },

  methods: {
    changeColor () {
      const primary = `#${this.getRandomColor()}`
      const secondary = `#${this.getRandomColor()}`

      this.primaryColor = primary
      this.primaryContrastColor = colors.lighten(primary, 85)

      this.secondaryColor = secondary
      this.secondaryContrastColor = colors.lighten(secondary, 85)
    },

    getRandomColor () {
      return Math.floor(Math.random() * 16777215).toString(16)
    }
  }
}
</script>
