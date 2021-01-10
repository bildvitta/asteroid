<template>
  <q-drawer v-model="model" bordered>
    <q-scroll-area class="fit" :class="scrollAreaClass">
      <q-list padding>
        <div v-for="(header, index) in items" :key="index">
          <q-expansion-item v-if="hasChildren(header)" expand-separator :icon="header.icon" :label="header.label">
            <q-item v-for="(item, itemIndex) in header.children" :key="itemIndex" v-ripple :class="itemClass" clickable :to="item.to">
              <q-item-section v-if="item.icon" avatar>
                <q-icon :name="item.icon" />
              </q-item-section>
              <q-item-section>
                <q-item-label>{{ item.label }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-expansion-item>

          <q-item v-else :key="index" v-ripple :class="itemClass" clickable :to="header.to">
            <q-item-section v-if="header.icon" avatar>
              <q-icon :name="header.icon" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ header.label }}</q-item-label>
            </q-item-section>
          </q-item>
        </div>
      </q-list>
    </q-scroll-area>
  </q-drawer>
</template>

<script>
export default {
  props: {
    itemClass: {
      default: '',
      type: [Array, Object, String]
    },

    items: {
      default: () => [],
      type: Array
    },

    scrollAreaClass: {
      default: '',
      type: [Array, Object, String]
    },

    value: {
      default: true,
      type: Boolean
    }
  },

  computed: {
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
    }
  }
}
</script>
