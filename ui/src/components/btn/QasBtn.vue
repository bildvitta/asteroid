<template>
  <q-btn class="qas-btn" v-bind="attributes">
    <slot />

    <template v-for="(_, name) in slots" #[name]="context">
      <slot :name="name" v-bind="context || {}" />
    </template>
  </q-btn>
</template>

<script>
export default {
  name: 'QasBtn',

  props: {
    color: {
      default: 'primary',
      type: String,
      validator: value => ['grey-9', 'primary', 'white'].includes(value)
    },

    useLabelOnSmallScreen: {
      default: true,
      type: Boolean
    },

    useHoverOnWhiteColor: {
      default: true,
      type: Boolean
    },

    label: {
      default: '',
      type: String
    },

    variant: {
      type: String,
      default: 'tertiary',
      validator: value => {
        const variants = ['primary', 'secondary', 'tertiary']

        return variants.includes(value)
      }
    }
  },

  computed: {
    attributes () {
      const {
        align,
        dense,
        fab,
        fabMini,
        flat,
        glossy,
        noWrap,
        outline,
        padding,
        push,
        ripple,
        round,
        size,
        square,
        stack,
        stretch,
        textColor,
        unelevated,
        ...attributes
      } = this.$attrs

      return {
        ...(this.showLabel && { label: this.label }),

        ...attributes,
        class: this.classes
      }
    },

    hasIconOnly () {
      return !this.label && (this.$attrs.icon || this.$attrs.iconRight)
    },

    classes () {
      return {
        'qas-btn--primary': this.isPrimary,
        'qas-btn--secondary': this.isSecondary,
        'qas-btn--tertiary': this.isTertiary,

        // color
        [`qas-btn--tertiary-${this.color}`]: this.isTertiary,

        // icon
        'qas-btn--icon-only': this.hasIconOnly,

        // hover
        'qas-btn--no-hover-on-white': !this.useHoverOnWhiteColor
      }
    },

    isPrimary () {
      return this.variant === 'primary'
    },

    isSecondary () {
      return this.variant === 'secondary'
    },

    isTertiary () {
      return this.variant === 'tertiary'
    },

    showLabel () {
      return this.useLabelOnSmallScreen || !this.$qas.screen.isSmall
    },

    slots () {
      const { default: _, ...slots } = this.$slots
      return slots
    }
  }
}
</script>
