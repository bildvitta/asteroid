<template>
  <div class="password-strenght-checker">
    <div :class="contentClass">
      <div class="password-strenght-checker__percent rounded-borders" :class="[option.width, option.color]" />
    </div>
    <div class="q-mt-xs text-subtitle2" :class="option.text">{{ option.label }}</div>
  </div>
</template>

<script>
import password from '../../mixins/password'

export default {
  mixins: [password],

  props: {
    value: {
      type: String,
      default: ''
    }
  },

  computed: {
    length () {
      return (this.value || '').length
    },

    isSuccess () {
      return this.value && !!this.value.match(this.pattern)
    },

    isWeak () {
      return this.length && (this.length >= this.weak)
    },

    isVeryWeak () {
      return this.length && (this.length <= this.veryWeak || this.length < this.weak)
    },

    option () {
      return this.length && [
        {
          label: 'Forte',
          value: this.isSuccess,
          width: 'password-strenght-checker__percent--lg',
          color: 'bg-positive',
          text: 'text-positive'
        },
        {
          label: 'Fraca',
          value: this.isWeak,
          width: 'password-strenght-checker__percent--md',
          color: 'bg-warning',
          text: 'text-warning'
        },
        {
          label: 'Muito Fraca',
          value: this.isVeryWeak,
          width: 'password-strenght-checker__percent--sm',
          color: 'bg-negative',
          text: 'text-negative'
        }
      ].find(item => item.value)
    },

    contentClass () {
      return this.value && 'bg-blue-grey-1'
    }
  },

  watch: {
    isSuccess (value) {
      value && this.onSuccess()
    }
  }
}
</script>

<style lang="scss">
.password-strenght-checker {
  &__percent {
    height: 3px;
    transition: width 300ms, color 300ms;
    width: 0;

    &--sm {
      width: 25%;
    }

    &--md {
      width: 50%
    }

    &--lg {
      width: 100%
    }
  }
}
</style>
