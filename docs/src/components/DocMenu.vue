<template>
  <q-list class="doc-menu" dense>
    <doc-menu-item v-for="(item, index) in items" :key="index" :item="item" />
  </q-list>
</template>

<script>
import DocMenuItem from 'components/DocMenuItem.vue'

export default {
  components: {
    DocMenuItem
  },

  props: {
    items: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style lang="scss">
.doc-menu {
  .q-item {
    font-size: 12px;
  }

  .q-item__section--avatar {
    color: $brand-primary;
  }
}
</style>
