<template>
  <q-layout view="hHh Lpr lFf">
    <slot name="app-bar">
      <qas-app-bar v-bind="appBarProps" v-on="appBarEvents" @toggle-menu="toggleMenuDrawer" />
    </slot>

    <slot name="app-menu">
      <qas-app-menu v-model="menuDrawer" v-bind="defaultAppMenuProps" v-on="appMenuEvents" />
    </slot>

    <slot>
      <q-page-container>
        <router-view />
      </q-page-container>
    </slot>
  </q-layout>
</template>

<script>
import QasAppMenu from '../app-menu/QasAppMenu'
import QasAppBar from '../app-bar/QasAppBar'

export default {
  name: 'QasLayout',

  components: {
    QasAppMenu,
    QasAppBar
  },

  props: {
    value: {
      default: true,
      type: Boolean
    },

    appBarEvents: {
      default: () => ({}),
      type: Object
    },

    appBarProps: {
      default: () => ({}),
      type: Object
    },

    appMenuProps: {
      default: () => ({}),
      type: Object
    },

    appMenuEvents: {
      default: () => ({}),
      type: Object
    }
  },

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
    value: {
      handler (value) {
        this.menuDrawer = value
      },
      immediate: true
    }
  },

  methods: {
    toggleMenuDrawer () {
      this.menuDrawer = !this.menuDrawer
      this.$emit('input', this.menuDrawer)
    }
  }
}
</script>
