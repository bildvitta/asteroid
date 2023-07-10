<template>
  <div class="justify-between no-wrap q-col-gutter-x-md q-mb-xl row text-body1 text-grey-8" :class="containerClass">
    <div :class="leftClass">
      <slot name="left">
        {{ text }}
      </slot>
    </div>

    <div v-if="hasRightSide" class="col-3 col-md-3 col-sm-4 justify-end row">
      <slot name="right">
        <qas-actions-menu v-if="hasDefaultActionsMenu" v-bind="actionsMenuProps" />

        <qas-btn v-if="hasDefaultButton" :use-label-on-small-screen="false" v-bind="buttonProps" />
      </slot>
    </div>
  </div>
</template>

<script>
const AlignTypes = {
  Start: 'start',
  Center: 'center',
  End: 'end'
}

export default {
  name: 'QasHeaderActions',

  props: {
    actionsMenuProps: {
      type: Object,
      default: () => ({})
    },

    alignColumns: {
      default: 'center',
      type: String,
      validator: value => Object.values(AlignTypes).includes(value)
    },

    buttonProps: {
      default: () => ({}),
      type: Object
    },

    text: {
      type: String,
      default: ''
    }
  },

  computed: {
    containerClass () {
      return `items-${this.alignColumns}`
    },

    hasDefaultButton () {
      return !!Object.keys(this.buttonProps).length
    },

    hasDefaultActionsMenu () {
      return !!Object.keys(this.actionsMenuProps).length
    },

    hasRightSlot () {
      return !!this.$slots.right
    },

    hasRightSide () {
      return this.hasRightSlot || this.hasDefaultActionsMenu || this.hasDefaultButton
    },

    leftClass () {
      return this.hasRightSide ? 'col-9 col-md-9 col-sm-8' : 'col-12'
    }
  }
}
</script>
