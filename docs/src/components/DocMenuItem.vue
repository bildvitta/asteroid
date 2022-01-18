<template>
  <q-expansion-item v-if="item.children" dense :dense-toggle="!isFirstLevel" expand-icon="keyboard_arrow_down" expand-icon-class="text-grey-5" expand-separator :icon="item.icon" :label="item.name" :switch-toggle-side="!isFirstLevel">
    <doc-menu-item v-for="(subitem, index) in item.children" :key="index" :item="subitem" :level="nextLevel" />
  </q-expansion-item>

  <q-item v-else :dense="!isFirstLevel" :inset-level="insetLevel" :to="item.path">
    <q-item-section v-if="item.icon" avatar>
      <q-icon :name="item.icon" />
    </q-item-section>

    <q-item-section>{{ item.name }}</q-item-section>

    <q-item-section v-if="item.badge" side>
      <q-badge color="brand-primary" :label="item.badge" />
    </q-item-section>
  </q-item>
</template>

<script>
export default {
  name: 'DocMenuItem',

  props: {
    item: {
      type: Object,
      default: () => ({})
    },

    level: {
      type: Number,
      default: 0
    }
  },

  computed: {
    insetLevel () {
      return this.level > 1 ? 1.2 : this.level
    },

    isFirstLevel () {
      return this.level === 0
    },

    nextLevel () {
      return this.level + 1
    }
  }
}
</script>
