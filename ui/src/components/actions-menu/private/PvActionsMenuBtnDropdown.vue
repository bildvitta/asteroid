<template>
  <div class="pv-actions-menu-btn-dropdown" :class="classes">
    <q-btn-dropdown auto-close :class="dropdownClasses" :dropdown-icon="dropdownIcon" :icon="icon" :label="label" no-icon-animation :split="split" unelevated @click="$emit('split-click')">
      <slot />
    </q-btn-dropdown>
  </div>
</template>

<script>
export default {
  name: 'PvActionsMenuBtnDropdown',

  props: {
    color: {
      type: String,
      default: ''
    },

    split: {
      type: Boolean
    },

    label: {
      type: String,
      default: ''
    },

    dropdownIcon: {
      default: '',
      type: String
    },

    icon: {
      default: '',
      type: String
    },

    useHoverOnWhiteColor: {
      default: true,
      type: Boolean
    }
  },

  emits: ['split-click'],

  computed: {
    classes () {
      return {
        'pv-actions-menu-btn-dropdown--split': this.split,
        'pv-actions-menu-btn-dropdown--no-hover': !this.useHoverOnWhiteColor
      }
    },

    dropdownClasses () {
      return {
        [`qas-btn--tertiary-${this.color}`]: this.color,
        [`pv-actions-menu-btn-dropdown--split__${this.color}`]: this.color
      }
    }
  }
}
</script>

<style lang="scss">
.pv-actions-menu-btn-dropdown2 {
  // $ (necessário para funcionar o @include)

  .q-btn {
    @include set-button(tertiary, false, true);
  }

  &:not(&--split) {
    .q-btn-dropdown--simple * + .q-btn-dropdown__arrow {
      margin-left: var(--qas-spacing-xs) !important;
    }
  }

  &--no-hover {
    .q-btn {
      // @include set-button(tertiary, false, true);
    }
  }

  &--split {
    .q-btn-group {
      .q-btn:first-child {
        padding-right: calc(var(--qas-spacing-sm) + 1px) !important;
        position: relative;

        &::after {
          content: '';
          display: block;
          height: 18px;
          position: absolute;
          right: 0;
          top: 50%;
          transform: translateY(-50%);
          width: 1px;
          z-index: 1;
        }
      }
    }

    &__primary.q-btn-group .q-btn:first-child::after {
      background-color: var(--q-primary);
    }

    &__grey-9.q-btn-group .q-btn:first-child::after {
      background-color: $grey-9;
    }

    &__white.q-btn-group .q-btn:first-child::after {
      background-color: white;
    }

    .q-btn:last-child {
      padding-left: var(--qas-spacing-sm) !important;

      @include set-button(tertiary, true, false);
    }
  }
}
</style>
