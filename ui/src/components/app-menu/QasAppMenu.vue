<template>
  <q-drawer v-model="model" content-class="bg-primary-contrast" :mini="miniMode" :width="230" @before-hide="beforeHide">
    <q-list class="text-primary">
      <div v-for="(header, index) in items" :key="index">
        <q-expansion-item v-if="hasChildren(header)" :active-class="activeSecondaryItemClasses" :default-opened="shouldExpand(header)" expand-icon="o_keyboard_arrow_down" expand-separator :icon="header.icon" :label="header.label" :to="header.to">
          <q-item v-for="(item, itemIndex) in header.children" :key="itemIndex" v-ripple :active-class="activeItemClasses" clickable :to="item.to">
            <q-item-section v-if="item.icon" avatar>
              <q-icon :name="item.icon" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ item.label }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-expansion-item>

        <q-item v-else :key="index" v-ripple :active-class="activeItemClasses" clickable :to="header.to">
          <q-item-section v-if="header.icon" avatar>
            <q-icon :name="header.icon" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ header.label }}</q-item-label>
          </q-item-section>
        </q-item>
      </div>
    </q-list>
  </q-drawer>
</template>

<script>
import { screenMixin } from '../../mixins'

export default {
  mixins: [screenMixin],

  props: {
    itemClass: {
      default: '',
      type: [Array, Object, String]
    },

    items: {
      default: () => [],
      type: Array
    },

    value: {
      default: true,
      type: Boolean
    }
  },

  data () {
    return {
      miniMode: false
    }
  },

  computed: {
    activeItemClasses () {
      return 'bg-primary text-primary-contrast'
    },

    activeSecondaryItemClasses () {
      return 'active bg-secondary-contrast text-primary-contrast'
    },

    model: {
      get () {
        return this.value
      },

      set (value) {
        return this.$emit('input', value)
      }
    }
  },

  methods: {
    hasChildren ({ children }) {
      return !!(children || []).length
    },

    shouldExpand ({ children, to }) {
      return children?.length && this.$route.matched.some(item => item.path === to.path)
    },

    beforeHide () {
      if (this.$_isLarge) {
        this.model = true
        this.miniMode = !this.miniMode
      }
    }
  }
}
</script>

<style lang="scss">
.q-expansion-item {
  .active .q-expansion-item__toggle-icon {
    color: white !important;
    opacity: 1;
  }

  .q-expansion-item__toggle-icon {
    color: $primary;
    opacity: 0.2;
  }
}
</style>
