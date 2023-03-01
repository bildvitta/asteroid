<template>
  <div class="flex inline items-center qas-btn-dropdown">
    <div v-if="hasLeftButton" :class="leftSideClasses">
      <slot name="left-button">
        <qas-btn variant="tertiary" v-bind="defaultButtonProps" @click="$emit('click', $event)">
          <q-menu v-if="hasMenuOnLeftSide" anchor="bottom right" auto-close self="top right">
            <div :class="menuContentClasses">
              <slot />
            </div>
          </q-menu>
        </qas-btn>
      </slot>
    </div>

    <q-separator v-if="hasSeparator" class="q-mr-sm qas-btn-dropdown__separator self-center" dark vertical />

    <div v-if="split">
      <qas-btn color="grey-9" :icon="dropdownIcon" variant="tertiary">
        <q-menu v-if="hasDefaultSlot" anchor="bottom right" auto-close self="top right">
          <div :class="menuContentClasses">
            <slot />
          </div>
        </q-menu>
      </qas-btn>
    </div>
  </div>
</template>

<script>
export default {
  name: 'QasBtnDropdown',

  inheritAttrs: false,

  props: {
    buttonProps: {
      default: () => ({}),
      type: Object
    },

    dropdownIcon: {
      default: 'sym_r_more_vert',
      type: String
    },

    split: {
      type: Boolean
    },

    useMenuPadding: {
      type: Boolean
    }
  },

  emits: ['click'],

  computed: {
    leftSideClasses () {
      return {
        'q-mr-sm': this.split
      }
    },

    menuContentClasses () {
      return {
        'q-pa-md': this.useMenuPadding
      }
    },

    hasDefaultSlot () {
      return !!this.$slots.default
    },

    hasMenuOnLeftSide () {
      return this.hasDefaultSlot && !this.split
    },

    defaultButtonProps () {
      const {
        icon,
        iconRight = this.split ?? this.dropdownIcon,
        color,
        ...defaultProps
      } = this.buttonProps

      console.log(icon)

      const { label } = defaultProps

      return {
        useLabelOnSmallScreen: false,

        ...defaultProps,

        color: color || (!this.split ? 'grey-9' : 'primary'),
        ...(!this.split && { iconRight }),
        ...(this.split && { icon }),
        ...((this.split || (!this.split && label)) && { icon })
      }
    },

    isSmall () {
      return this.$qas.screen.isSmall
    },

    hasLeftButton () {
      return !this.isSmall || !this.split
    },

    hasSeparator () {
      return !this.isSmall && this.split
    }
  }
}
</script>

<style lang="scss">
.qas-btn-dropdown {
  &__separator {
    height: 18px;
  }
}
</style>
