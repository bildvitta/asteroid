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
      default: 'grey-9',
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

    icon: {
      default: undefined,
      type: String
    },

    iconRight: {
      default: undefined,
      type: String
    },

    loading: {
      type: Boolean
    },

    variant: {
      type: String,
      default: 'primary',
      validator: value => {
        const variants = ['primary', 'secondary', 'tertiary']

        return variants.includes(value)
      }
    }
  },

  computed: {
    attributes () {
      const {
        dense,
        flat,
        glossy,
        outline,
        padding,
        round,
        unelevated,
        ...attributes
      } = this.$attrs

      return {
        ...(this.showLabel && { label: this.label }),
        class: this.classes,

        ...attributes,
        icon: this.icon,
        iconRight: this.iconRight,
        loading: this.loading
      }
    },

    hasIconOnly () {
      return !this.label && (this.icon || this.iconRight)
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

<style lang="scss">
// .qas-btn {
//   $root: &;

//   border-radius: 32px;
//   min-height: 48px;
//   padding: var(--qas-spacing-xs) var(--qas-spacing-lg);
//   text-transform: initial;
//   transition: color var(--qas-generic-transition), background-color var(--qas-generic-transition);

//   &:disabled {
//     opacity: 1 !important;
//   }

//   &:not(&--primary):not(:disabled):hover {
//     color: var(--q-primary-contrast) !important;
//   }

//   &--primary {
//     background-color: var(--q-primary);
//     color: white;

//     &:disabled {
//       background-color: $grey-4;
//       color: $grey-8;
//     }

//     &:not(:disabled):hover {
//       background-color: var(--q-primary-contrast) !important;
//     }
//   }

//   &--secondary {
//     border: 1px solid currentColor;
//     color: var(--q-primary);
//     position: relative;

//     &:disabled {
//       color: $grey-8 !important;
//     }
//   }

//   &--tertiary {
//     min-height: 24px !important;
//     padding-bottom: 0;
//     padding-top: 0;

//     &:disabled {
//       color: $grey-8 !important;
//     }

//     &-grey-9 {
//       color: $grey-9;
//     }

//     &-primary {
//       color: var(--q-primary);
//     }

//     &-white {
//       color: white;
//     }
//   }

//   &--icon-only {
//     padding: 0;

//     &:not(#{$root}--tertiary) {
//       height: 48px;
//       width: 48px;
//     }
//   }

//   &.q-btn {
//     &::before {
//       display: none;
//     }
//   }

//   .q-icon.on-left {
//     margin-right: var(--qas-spacing-xs);
//   }

//   .q-icon.on-right {
//     margin-left: var(--qas-spacing-xs);
//   }

//   .q-ripple,
//   .q-focus-helper {
//     display: none;
//   }
// }

</style>
