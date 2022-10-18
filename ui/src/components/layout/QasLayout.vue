<template>
  <q-layout view="hHh Lpr lFf">
    <slot name="app-bar">
      <qas-app-bar v-bind="appBarProps" @toggle-menu="toggleMenuDrawer" />
    </slot>

    <slot name="app-menu">
      <qas-app-menu v-model="menuDrawer" v-bind="defaultAppMenuProps" />
    </slot>

    <slot>
      <q-page-container>
        <router-view />
      </q-page-container>
    </slot>
  </q-layout>
</template>

<script>
import QasAppBar from '../app-bar/QasAppBar.vue'
import QasAppMenu from '../app-menu/QasAppMenu.vue'

export default {
  name: 'QasLayout',

  components: {
    QasAppBar,
    QasAppMenu
  },

  props: {
    appBarProps: {
      default: () => ({}),
      type: Object
    },

    appMenuProps: {
      default: () => ({}),
      type: Object
    },

    modelValue: {
      default: true,
      type: Boolean
    }
  },

  emits: ['update:modelValue'],

  data () {
    return {
      menuDrawer: true
    }
  },

  computed: {
    defaultAppMenuProps () {
      return {
        ...this.appMenuProps,
        title: this.appBarProps?.title
      }
    }
  },

  watch: {
    modelValue: {
      handler (value) {
        if (!this.$qas.screen.untilLarge) return

        this.menuDrawer = value
      },
      immediate: true
    }
  },

  mounted () {
    this.menuDrawer = !this.$qas.screen.untilLarge
  },

  methods: {
    toggleMenuDrawer () {
      this.menuDrawer = !this.menuDrawer
      this.$emit('update:modelValue', this.menuDrawer)
    }
  }
}
</script>
