<template>
  <q-layout view="hHh Lpr lff">
    <slot v-if="$qas.screen.untilLarge" name="app-bar" :toggle-notifications="toggleNotificationsDrawer">
      <qas-app-bar v-bind="appBarProps" @sign-out="signOut" @toggle-menu="toggleMenuDrawer" @toggle-notifications="toggleNotificationsDrawer" />
    </slot>

    <slot name="app-menu" :toggle-notifications="toggleNotificationsDrawer">
      <qas-app-menu :model-value="showMenuDrawer" v-bind="defaultAppMenuProps" @sign-out="signOut" @toggle-notifications="toggleNotificationsDrawer" @update:model-value="updateMenuDrawer" />
    </slot>

    <slot>
      <q-page-container>
        <q-page>
          <router-view />
        </q-page>
      </q-page-container>
    </slot>

    <q-ajax-bar color="primary" position="bottom" size="2px" />

    <pv-layout-notifications-drawer v-model="notificationsDrawer" />
  </q-layout>
</template>

<script>
import PvLayoutNotificationsDrawer from './private/PvLayoutNotificationsDrawer.vue'
import QasAppBar from '../app-bar/QasAppBar.vue'
import QasAppMenu from '../app-menu/QasAppMenu.vue'

export default {
  name: 'QasLayout',

  components: {
    PvLayoutNotificationsDrawer,
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
    },

    initialUnreadNotificationsCount: {
      type: Number,
      default: 0
    }
  },

  emits: ['sign-out', 'update:modelValue'],

  data () {
    return {
      menuDrawer: false,
      notificationsDrawer: false
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
    },

    toggleNotificationsDrawer () {
      this.notificationsDrawer = !this.notificationsDrawer
    }
  }
}
</script>
