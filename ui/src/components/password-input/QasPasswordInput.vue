<template>
  <qas-input v-model="model" :bottom-slots="hasBottomSlots" v-bind="$attrs" :type="type" use-remove-error-on-type>
    <template #append>
      <q-icon class="cursor-pointer" :color="iconColor" :name="icon" @click="toggle" />
    </template>

    <template v-for="(_, name) in $slots" #[name]="context">
      <slot :name="name" v-bind="context || {}" />
    </template>

    <template v-if="hasStrengthChecker" #hint>
      <qas-password-strength-checker v-bind="strengthCheckerProps" :password="model" />
    </template>
  </qas-input>
</template>

<script>
import QasInput from '../input/QasInput.vue'
import passwordMixin from '../../mixins/password.js'
import QasPasswordStrengthChecker from '../password-strength-checker/QasPasswordStrengthChecker.vue'

export default {
  name: 'QasPasswordInput',

  components: {
    QasInput,
    QasPasswordStrengthChecker
  },

  mixins: [passwordMixin],

  inheritAttrs: false,

  props: {
    useStrengthChecker: {
      default: true,
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
      toggleType: true
    }
  },

  computed: {
    icon () {
      return this.toggleType ? 'sym_r_visibility_off' : 'sym_r_visibility'
    },

    model: {
      get () {
        return this.modelValue
      },

      set (value) {
        return this.$emit('update:modelValue', value)
      }
    },

    strengthCheckerProps () {
      const { modelValue, ...props } = this.$props
      return props
    },

    type () {
      return this.toggleType ? 'password' : 'text'
    },

    hasBottomSlots () {
      return !!this.model.length
    },

    hasStrengthChecker () {
      return this.useStrengthChecker && this.hasBottomSlots
    }
  },

  methods: {
    toggle () {
      this.toggleType = !this.toggleType
    }
  }
}
</script>
