<template>
  <q-page class="doc-page" padding>
    <div v-if="title" class="row">
      <doc-heading :badge="badge" :title="title" />
    </div>

    <slot />
  </q-page>
</template>

<script>
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
  }
}
</script>

<style lang="scss">
.doc-page {
  margin-left: auto;
  margin-right: auto;
  max-width: 1080;
  padding: 16px 46px;
}
</style>
