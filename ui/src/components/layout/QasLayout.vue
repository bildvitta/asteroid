<template>
  <q-layout view="hHh Lpr lFf">
    <slot name="app-bar">
      <qas-app-bar v-bind="defaultAppBarProps" @toggle-menu="toggleMenuDrawer" />
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
import QasAppMenu from '../app-menu/QasAppMenu'
import QasAppBar from '../app-bar/QasAppBar'

export default {
  name: 'QasLayout',

  components: {
    QasAppMenu,
    QasAppBar
  },

  props: {
    modelValue: {
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
        ...this.appMenuEvents,
        title: this.appBarProps?.title
      }
    },

    defaultAppBarProps () {
      return {
        ...this.appBarProps,
        ...this.appBarEvents
      }
    }
  },

  watch: {
    modelValue: {
      handler (value) {
        this.menuDrawer = value
      },
      immediate: true
    }
  },

  methods: {
    toggleMenuDrawer () {
      this.menuDrawer = !this.menuDrawer
      this.$emit('update:modelValue', this.menuDrawer)
    }
  }
}
</script>
