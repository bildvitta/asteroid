<template>
  <q-input ref="mask" v-model="model" v-bind="$attrs" bottom-slots :type="type" v-on="events">
    <template v-if="!hideStrengthChecker" #hint>
      <qas-password-strength-checker v-bind="$props" @password-success="onSuccess" />
    </template>

    <template #append>
      <q-icon class="cursor-pointer" :color="iconColor" :name="icon" @click="toggle" />
    </template>

    <slot v-for="(slot, key) in $slots" :slot="key" :name="key" />

    <template v-for="(slot, key) in $scopedSlots" :slot="key" slot-scope="scope">
      <slot :name="key" v-bind="scope" />
    </template>
  </q-input>
</template>

<script>
import password from '../../mixins/password'

export default {
  mixins: [password],

  props: {
    value: {
      type: String,
      default: ''
    },

    hideStrengthChecker: {
      type: Boolean
    },

    iconColor: {
      type: String,
      default: 'primary'
    }
  },

  data () {
    return {
      toggleType: true
    }
  },

  computed: {
    model: {
      get () {
        return this.value
      },

      set (value) {
        return this.$emit('input', value)
      }
    },

    events () {
      const { input, ...events } = this.$listeners

      return events
    },

    icon () {
      return this.toggleType ? 'o_visibility_off' : 'o_visibility'
    },

    type () {
      return this.toggleType ? 'password' : 'text'
    }
  },

  watch: {
    value () {
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
