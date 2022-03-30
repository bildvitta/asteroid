<template>
  <div v-if="length">
    <slot :level="level">
      <q-linear-progress :color="level.color" :track-color="trackColor" :value="level.progress" />
      <div class="text-caption" :class="level.textClass">{{ level.label }}</div>
    </slot>
  </div>
</template>

<script>
import passwordMixin from '../../mixins/password.js'

export default {
  name: 'QasPasswordStrengthChecker',

  mixins: [passwordMixin],

  props: {
    modelValue: {
      default: false,
      type: Boolean
    },

    password: {
      default: '',
      type: String
    }
  },

  emits: ['update:modelValue'],

  computed: {
    length () {
      return this.password.length
    },

    level () {
      return this.levels[this.score]
    },

    score () {
      let score = -1

      score += this.useLowercase
        ? (this.password.match(/[a-z]/g) ? 1 : 0)
        : 1

      score += this.useNumbers
        ? (this.password.match(/[0-9]/g) ? 1 : 0)
        : 1

      score += this.useSpecial
        ? (this.password.match(this.specials) ? 1 : 0)
        : 1

      score += this.useUppercase
        ? (this.password.match(/[A-Z]/g) ? 1 : 0)
        : 1

      score += this.length >= parseInt(this.minlength) ? 1 : 0

      return score
    }
  },

  watch: {
    password () {
      this.emitValue()
    }
  },

  created () {
    this.emitValue()
  },

  methods: {
    emitValue () {
      this.$emit('update:modelValue', this.score === 4)
    }
  }
}
</script>
