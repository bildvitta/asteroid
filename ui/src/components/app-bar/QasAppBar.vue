<template>
  <q-toolbar class="qas-toolbar">
    <q-ajax-bar color="white" position="top" size="2px" />

    <q-btn dense flat icon="o_menu" round @click="toggleMenuDrawer" />

    <q-toolbar-title class="flex">
      <div class="cursor-pointer" @click="goToRoot">
        <img :alt="title" class="qas-toolbar__brand" :src="brand">
        {{ title }}
        <q-badge v-if="hasDevelopmentBadge" align="middle" color="negative" :label="developmentBadgeLabel" />
      </div>
    </q-toolbar-title>

    <q-btn dense icon="notifications_none" round unelevated>
      <q-badge color="red" floating>4</q-badge>
    </q-btn>

    <qs-apps-menu v-if="hasApps" :apps="apps" />

    <div class="items-center no-wrap q-gutter-md row">
      <slot name="tools" />

      <div v-if="isAuth" class="cursor-pointer items-center q-mr-sm qas-toolbar__user row" :title="user.name || user.givenName">
        <qs-avatar color="white" :image="asset(user.photo)" rounded size="36px" :title="user.name || user.givenName" />

        <div class="cursor-pointer q-pl-xs q-pr-sm qas-toolbar__user-data qs-lh-sm">
          <div class="ellipsis">{{ user.name || user.givenName }}</div>
          <div class="ellipsis opacity-60 qs-lh-sm text-caption">{{ user.email }}</div>
        </div>

        <q-menu anchor="bottom middle" max-height="400px" self="top middle">
          <div class="qas-toolbar__user-menu">
            <div class="q-pa-lg text-center">
              <qs-avatar class="cursor-pointer" :image="asset(user.photo)" rounded size="145px" :title="user.name || user.givenName" @click="goToProfile" />
              <div class="ellipsis q-mt-lg qs-lh-sm text-bold text-subtitle1">{{ user.name || user.givenName }}</div>
              <div class="ellipsis q-mt-xs text-caption">{{ user.email }}</div>

              <div class="q-mb-lg q-mt-xs">
                <qs-btn flat icon="o_edit" label="Editar" :to="user.to" />
              </div>

              <div>
                <qas-btn v-close-popup class="q-px-lg q-py-xs" icon="o_exit_to_app" label="Sair" outline @click="signOut" />
              </div>

              <slot name="user" :user="user" />
            </div>
          </div>
        </q-menu>
      </div>
    </div>
  </q-toolbar>
</template>

<script>
import { asset } from 'steroids'

import QasBtn from '../btn/QasBtn'

export default {
  components: {
    QasBtn
  },

  props: {
    title: {
      required: true,
      type: String
    },

    user: {
      require: true,
      type: Object,
      default: () => ({})
    },

    isAuth: {
      type: Boolean
    },

    brand: {
      required: true,
      type: String,
      default: ''
    },

    apps: {
      type: Array,
      default: () => []
    }
  },

  data () {
    return {
      menuDrawer: true
    }
  },

  computed: {
    fullscreenIcon () {
      return this.isFullscreen ? 'o_fullscreen_exit' : 'o_fullscreen'
    },

    isFullscreen () {
      return !!this.$q.fullscreen.isActive
    },

    developmentBadgeLabel () {
      const hosts = {
        localhost: 'Local',
        develop: 'Desenvolvimento',
        release: 'Homologação'
      }

      if (process.env.DEV) {
        return hosts.localhost
      }

      const current = Object.keys(hosts).find(
        host => location.hostname.includes(host)
      )

      return current ? hosts[current] : ''
    },

    hasDevelopmentBadge () {
      return !!this.developmentBadgeLabel
    },

    hasApps () {
      return !!this.apps.length
    }
  },

  methods: {
    asset,

    goToProfile () {
      return this.$router.push(this.user.to)
    },

    fullscreen () {
      this.$q.fullscreen.toggle()
    },

    goToRoot () {
      this.$router.push({ name: 'Root' })
    },

    toggleMenuDrawer () {
      this.$emit('toggle-menu')
    },

    signOut () {
      this.$emit('sign-out')
    }
  }
}
</script>

<style lang="scss">
.qas-toolbar {
  box-shadow: 0 0 15px rgba($grey-10, 0.25);
  height: 64px;

  &__brand {
    height: 24px;
    margin-right: map-get($space-sm, x);
    position: relative;
    top: 4px;
  }

  &__user {
    background-color: rgba(white, 0.1);
    border-radius: $generic-border-radius;
    transition: background-color $generic-hover-transition;

    &:focus,
    &:hover {
      background-color: rgba(white, 0.2);
    }
  }

  &__user-data {
    max-width: 150px;
  }

  &__user-menu {
    width: 300px;
  }

  @media (max-width: $breakpoint-xs) {
    &__user-data {
      display: none;
    }
  }
}
</style>
