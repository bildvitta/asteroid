<template>
  <div class="flex inline items-center qas-btn-dropdown">
    <div :class="leftSideClasses">
      <slot name="left-side">
        <qas-btn v-bind="buttonProps" @click="Delete()">
          <q-menu v-if="hasMenuOnLeftSide" anchor="bottom right" self="top right">
            <slot />
          </q-menu>
        </qas-btn>
      </slot>
    </div>

    <q-separator v-if="split" class="qas-btn-dropdown__separator self-center" :color="defaultSeparatorColor" vertical />

    <div v-if="split" class="q-ml-sm">
      <qas-btn :color="defaultDropdownIconColor" :icon="dropdownIcon" variant="tertiary">
        <q-menu v-if="hasDefaultSlot" anchor="bottom right" self="top right">
          <slot />
        </q-menu>
      </qas-btn>
    </div>
  </div>
</template>

<script>
import Delete from '../../../plugins/delete/Delete.js'

export default {
  name: 'PvActionsMenuBtnDropdown1',

  props: {
    buttonProps: {
      type: Object,
      default: () => ({})
    },

    split: {
      type: Boolean
    },

    separatorColor: {
      type: String,
      default: ''
    },

    dropdownIconColor: {
      type: String,
      default: ''
    },

    dropdownIcon: {
      default: 'sym_r_more_vert',
      type: String
    }
  },

  emits: ['split-click'],

  computed: {
    leftSideClasses () {
      return {
        'q-mr-sm': this.split
      }
    },

    defaultSeparatorColor () {
      return this.separatorColor || this.buttonProps.color || 'primary'
    },

    defaultDropdownIconColor () {
      return this.dropdownIconColor || this.buttonProps.color
    },

    hasDefaultSlot () {
      return !!this.$slots.default
    },

    hasMenuOnLeftSide () {
      return this.hasDefaultSlot && !this.split
    }
  },

  methods: {
    Delete
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
