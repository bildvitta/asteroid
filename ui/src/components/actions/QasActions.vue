<template>
  <div class="q-mt-sm" :class="classes">
    <div v-if="hasSecondarySlot" :class="columnClasses">
      <slot name="secondary" />
    </div>

    <div v-if="hasPrimarySlot" :class="columnClasses">
      <slot name="primary" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'QasActions',

  props: {
    align: {
      default: 'end',
      type: String,
      validator: value => ['start', 'around', 'between', 'center', 'end'].includes(value)
    },

    gutter: {
      default: '',
      type: String,
      validator: value => !value || ['xs', 'sm', 'md', 'lg', 'xl'].includes(value)
    },

    useFullWidth: {
      type: Boolean
    },

    useEqualWidth: {
      type: Boolean
    }
  },

  computed: {
    classes () {
      return [
        `justify-${this.align}`,
        `q-col-gutter-${this.defaultGutter}`,
        (this.$qas.screen.isSmall || this.useFullWidth) ? 'column reverse' : 'row'
      ]
    },

    defaultGutter () {
      return this.gutter || this.$qas.screen.isSmall ? 'md' : 'lg'
    },

    columnClasses () {
      if (this.useEqualWidth) return 'col-12 col-sm-6'

      return this.useFullWidth ? 'col-12' : 'col-12 col-sm-auto'
    },

    hasPrimarySlot () {
      return !!this.$slots.primary
    },

    hasSecondarySlot () {
      return !!this.$slots.secondary
    }
  }
}
</script>
