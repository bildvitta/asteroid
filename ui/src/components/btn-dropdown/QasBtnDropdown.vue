<template>
  <div class="flex inline items-center qas-btn-dropdown">
    <div :class="leftSideClasses">
      <slot name="left-button">
        <qas-btn color="primary" variant="tertiary" v-bind="defaultButtonProps" @click="$emit('click', $event)">
          <q-menu v-if="hasMenuOnLeftSide" anchor="bottom right" auto-close self="top right">
            <div :class="menuContentClasses">
              <slot />
            </div>
          </q-menu>
        </qas-btn>
      </slot>
    </div>

    <q-separator v-if="split" class="qas-btn-dropdown__separator self-center" dark vertical />

    <div v-if="split" class="q-ml-sm">
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
      type: Object,
      default: () => ({})
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
      const { icon, iconRight, ...defaultProps } = this.buttonProps
      const { label } = defaultProps

      return {
        ...(!this.split && { color: 'grey-9' }),

        ...defaultProps,

        ...(!this.split && { iconRight: this.dropdownIcon }),
        ...((this.split || (!this.split && label)) && { icon })
      }
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
