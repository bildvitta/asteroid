<template>
  <q-input v-model="model" bottom-slots :type="type">
    <slot v-for="(slot, key) in $slots" :slot="key" :name="key" />

    <template #append>
      <q-icon class="cursor-pointer" :color="iconColor" :name="icon" @click="toggle" />
    </template>

    <template v-if="!hideStrengthChecker" #hint>
      <qas-password-strength-checker v-bind="strengthCheckerProps" :password="model" />
    </template>
  </q-input>
</template>

<script>
import passwordMixin from '../../mixins/password.js'
import QasPasswordStrengthChecker from '../password-strength-checker/QasPasswordStrengthChecker.vue'

export default {
  name: 'QasPasswordInput',

  components: {
    QasPasswordStrengthChecker
  },

  mixins: [passwordMixin],

  props: {
    hideStrengthChecker: {
      type: Boolean
    },

    iconColor: {
      type: String,
      default: 'primary'
    },

    modelValue: {
      type: String,
      default: ''
    }
  },

  emits: ['update:modelValue'],

  data () {
    return {
      toggleType: true,
      key: 'error'
    }
  },

  computed: {
    icon () {
      return this.toggleType ? 'o_visibility_off' : 'o_visibility'
    },

    model: {
      get () {
        return this.modelValue
      },

      set (value) {
        return this.$emit('update:modelValue', value)
      }
    },

    type () {
      return this.toggleType ? 'password' : 'text'
    },

    strengthCheckerProps () {
      const { modelValue, ...props } = this.$props

      return props
    }
  },

  watch: {
    modelValue () {
      if (this.$attrs.error) {
        this.$attrs.error = false
        this.$attrs.errorMessage = ''
      }
    }
  },

  methods: {
    toggle () {
      this.toggleType = !this.toggleType
    }
  }
}
</script>
