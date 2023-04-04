<template>
  <q-layout view="hHh Lpr lff">
    <slot v-if="$qas.screen.untilLarge" name="app-bar">
      <qas-app-bar v-bind="appBarProps" @sign-out="signOut" @toggle-menu="toggleMenuDrawer" />
    </slot>

    <slot name="app-menu">
      <qas-app-menu :model-value="showMenuDrawer" v-bind="defaultAppMenuProps" @sign-out="signOut" @update:model-value="updateMenuDrawer" />
    </slot>

    <slot>
      <q-page-container>
        <q-page padding>
          <router-view />
        </q-page>
      </q-page-container>
    </slot>

    <q-ajax-bar color="primary" position="bottom" size="2px" />
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

  emits: ['sign-out', 'update:modelValue'],

  data () {
    return {
      menuDrawer: false
    }
  },

  computed: {
    defaultAppMenuProps () {
      return {
        ...this.appBarProps,
        ...this.appMenuProps
      }
    },

    showMenuDrawer () {
      return !this.$qas.screen.untilLarge || this.menuDrawer
    }
  },

  methods: {
    signOut () {
      this.$emit('sign-out')
    },

    toggleMenuDrawer () {
      this.updateMenuDrawer(!this.menuDrawer)
    },

    updateMenuDrawer (value) {
      this.menuDrawer = value
      this.$emit('update:modelValue', value)
    }
  }
}
</script>
