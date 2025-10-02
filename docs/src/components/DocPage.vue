<template>
  <component :is="component.is" v-bind="component.props">
    <div v-if="title" class="row">
      <doc-heading :badge="badge" :title="title" />
    </div>

    <slot />
  </component>
</template>

<script>
import useOverlayNavigation from '../../../ui/src/composables/use-overlay-navigation'

import { createMetaMixin } from 'quasar'

export default {
  mixins: [createMetaMixin(function () {
    return {
      title: this.title
    }
  })],

  props: {
    badge: {
      default: '',
      type: String
    },

    title: {
      default: '',
      type: String
    }
  },

  computed: {
    component () {
      const { isOverlay } = useOverlayNavigation()

      return {
        is: isOverlay ? 'div' : 'q-page',
        props: {
          ...(!isOverlay && {
            padding: true,
            class: 'doc-page'
          })
        }
      }
    }
  }
}
</script>

<style lang="scss">
.doc-page {
  margin-left: auto;
  margin-right: auto;
  max-width: 900px;
  padding: 16px 46px;
}
</style>
