<template>
  <q-layout class="app" view="doc-layout lHh LpR lff">
    <q-header bordered class="app-header text-dark">
      <q-toolbar>
        <q-btn dense flat icon="menu" @click="toggleLeftDrawer" />
        <q-toolbar-title>
          <router-link class="app-header__title" to="/">
            <q-img src="../assets/logo/minimalist_logo.png" width="150px" />
          </router-link>
        </q-toolbar-title>

        <q-space />

        <div class="text-bold">v{{ version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerState" bordered show-if-above side="left">
      <form class="app-search-bar">
        <q-input borderless class="app-search-bar__input" dense input-class="app-search-bar__input-element" placeholder="Buscar no Asteroid v3..." square>
          <template #prepend>
            <q-icon name="search" />
          </template>
        </q-input>

        <q-separator />
      </form>

      <q-scroll-area class="app-scroll-area-left">
        <doc-menu class="q-mt-md" :items="menuItems" />
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { version } from 'asteroid'
import { createMetaMixin } from 'quasar'

import menuItems from 'assets/menu.js'

export default {
  mixins: [createMetaMixin({
    title: 'Asteroid Docs',
    titleTemplate: title => `${title} | Asteroid Docs`
  })],

  data () {
    return {
      leftDrawerState: false
    }
  },

  computed: {
    menuItems () {
      return menuItems
    },

    version () {
      return version
    }
  },

  created () {
    if (this.$q.screen.width > 1023) {
      this.leftDrawerState = true
    }
  },

  methods: {
    toggleLeftDrawer () {
      this.leftDrawerState = !this.leftDrawerState
    }
  }
}
</script>

<style lang="scss">
.app {
  &-header,
  &-search-bar {
    background-color: $grey-4;

    @supports (backdrop-filter: none) {
      backdrop-filter: blur(7px);
      background-color: rgba(black, 0.1);
    }

    &__title {
      text-decoration: none;

      &:visited {
        color: currentColor;
      }
    }
  }

  &-search-bar {
    position: absolute;
    top: 0;
    width: 100%;

    &__input,
    .q-field__control {
      height: 50px;
    }

    &__input {
      margin-left: 18px;
      margin-right: 16px;
      width: 100%;
    }

    &__input-element {
      line-height: 38px;
    }

    .q-field__prepend,
    .q-field__append {
      height: 100%;
    }
  }

  &-scroll-area-left {
    height: calc(100% - 51px);
    margin-top: 51px;
  }
}
</style>
