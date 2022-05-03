<template>
  <q-layout class="app" view="lHh LpR lff">
    <q-header bordered class="app-header text-dark">
      <q-toolbar>
        <q-btn dense flat icon="menu" @click="toggleLeftDrawer" />
        <q-toolbar-title>Asteroid</q-toolbar-title>

        <q-space />

        <div class="text-bold">v{{ version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerState" bordered show-if-above side="left">
      <div class="app-search-bar">
        <div class="app-search-bar__input q-pt-sm">
          <div ref="docsearch" />
        </div>

        <q-separator />
      </div>

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

import docsearch from '@docsearch/js'
import menuItems from 'assets/menu.js'

import '@docsearch/css'

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

  mounted () {
    const doc = this.$refs.docsearch

    docsearch({
      container: doc,
      appId: '79KX7BGJMZ',
      apiKey: 'c6033a408c0b489f1d57783513896367',
      indexName: 'asteroid'
    })
  },
  methods: {
    toggleLeftDrawer () {
      this.leftDrawerState = !this.leftDrawerState
    }
  }
}
</script>

<style lang="scss">
.DocSearch-Button {
  width: 100% !important;
}

// DocSearch-Button-Placeholder
// DocSearch-Button-Keys

.app {
  &-header,
  &-search-bar {
    background-color: $grey-4;

    @supports (backdrop-filter: none) {
      backdrop-filter: blur(7px);
      background-color: rgba(black, 0.1);
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
      width: 90%;
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
