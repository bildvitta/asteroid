<template>
  <qas-input v-model="model" :bottom-slots="false" color="negative" v-bind="$attrs" :type="type" use-remove-error-on-type>
    <template #append>
      <q-icon class="cursor-pointer" :color="iconColor" :name="icon" @click="toggle" />
    </template>

    <template v-for="(_, name) in $slots" #[name]="context">
      <slot :name="name" v-bind="context || {}" />
    </template>

    <template v-if="useStrengthChecker" #hint>
      <qas-password-strength-checker v-bind="strengthCheckerProps" :password="model" />
    </template>
  </qas-input>
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

    strengthCheckerProps () {
      const { modelValue, ...props } = this.$props
      return props
    },

    type () {
      return this.toggleType ? 'password' : 'text'
    }
  },

  methods: {
    toggle () {
      this.toggleType = !this.toggleType
    }
  }
}
</script>
