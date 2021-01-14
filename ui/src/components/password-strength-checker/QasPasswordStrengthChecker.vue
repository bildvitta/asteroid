<template>
  <div v-if="length">
    <q-linear-progress :color="option.color" rounded :track-color="trackColor" :value="option.progress" />
    <div class="q-mt-xs text-subtitle2" :class="option.textClass">{{ option.label }}</div>
  </div>
</template>

<script>
import password from '../../mixins/password'

export default {
  mixins: [password],

  props: {
    trackColor: {
      default: 'blue-grey-1',
      type: String
    },

    value: {
      default: '',
      type: String
    }
  },

  computed: {
    length () {
      return (this.value || '').length
    },

    option () {
      if (this.value.match(this.pattern)) {
        return {
          color: 'positive',
          label: 'Forte',
          progress: 1,
          textClass: 'text-positive'
        }
      }

      if (this.length >= this.weak) {
        return {
          color: 'warning',
          label: 'Fraca',
          progress: 0.5,
          textClass: 'text-warning'
        }
      }

      return {
        color: 'negative',
        label: 'Muito fraca',
        progress: 0.25,
        textClass: 'text-negative'
      }
    }
  },

  watch: {
    isSuccess (value) {
      value && this.onSuccess()
    }
  }
}
</script>
