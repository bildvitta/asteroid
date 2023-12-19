<template>
  <div class="qas-btn-dropdown" :class="classes">
    <div v-if="hasLeftButton" :class="leftSideClasses">
      <slot name="left-button">
        <qas-btn variant="tertiary" v-bind="defaultButtonProps" @click="$emit('click', $event)">
          <q-menu v-if="hasMenuOnLeftSide" v-model="isMenuOpened" anchor="bottom right" auto-close self="top right" @update:model-value="onUpdateMenuValue">
            <div :class="menuContentClasses">
              <slot />
            </div>
          </q-menu>
        </qas-btn>
      </slot>
    </div>

    <q-separator v-if="hasSeparator" class="q-mr-sm qas-btn-dropdown__separator self-center" dark vertical />

    <div v-if="useSplit">
      <qas-btn color="grey-10" :icon="dropdownIcon" variant="tertiary">
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

    useSplit: {
      type: Boolean
    },

    useMenuPadding: {
      type: Boolean
    },

    menu: {
      type: Boolean
    }
  },

  emits: ['click', 'update:menu'],

  data () {
    return {
      isMenuOpened: false
    }
  },

  computed: {
    classes () {
      return {
        'flex inline items-center': this.useSplit
      }
    },

    leftSideClasses () {
      return {
        'q-mr-sm': this.useSplit
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
      return this.hasDefaultSlot && !this.useSplit
    },

    defaultButtonProps () {
      const {
        icon,
        iconRight,
        color,
        ...defaultProps
      } = this.buttonProps

      const defaultIconRight = iconRight || this.dropdownIcon

      return {
        useLabelOnSmallScreen: false,

        ...defaultProps,

        color: color || (!this.useSplit ? 'grey-10' : 'primary'),
        ...(!this.useSplit && { iconRight: defaultIconRight }),
        ...(this.useSplit && { icon })
      }
    },

    isSmall () {
      return this.$qas.screen.isSmall
    },

    hasLeftButton () {
      return !this.isSmall || !this.useSplit
    },

    hasSeparator () {
      return !this.isSmall && this.useSplit
    }
  },

  watch: {
    menu: {
      handler (value) {
        this.isMenuOpened = value
      },

      immediate: true
    }
  },

  methods: {
    onUpdateMenuValue (value) {
      this.$emit('update:menu', value)
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
