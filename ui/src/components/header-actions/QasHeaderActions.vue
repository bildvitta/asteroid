<template>
  <div class="items-center justify-between no-wrap q-gutter-x-md q-mb-xl row">
    <div class="text-body1 text-grey-8">
      <slot name="left">
        {{ description }}
      </slot>
    </div>

    <div>
      <slot name="right">
        <qas-actions-menu v-if="hasDefaultActionsMenu" v-bind="actionsMenuProps" />

        <qas-btn v-if="hasDefaultButton" :use-label-on-small-screen="false" v-bind="buttonProps" />
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'QasHeaderActions',

  props: {
    actionsMenuProps: {
      type: Object,
      default: () => ({})
    },

    buttonProps: {
      default: () => ({}),
      type: Object
    },

    description: {
      type: String,
      default: ''
    }
  },

  computed: {
    hasDefaultButton () {
      return !!Object.keys(this.buttonProps).length
    },

    hasDefaultActionsMenu () {
      return !!Object.keys(this.actionsMenuProps).length
    }
  }
}
</script>
