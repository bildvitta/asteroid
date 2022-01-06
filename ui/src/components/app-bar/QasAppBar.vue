<template>
  <q-toolbar class="qas-toolbar">
    <q-ajax-bar color="white" position="top" size="2px" />

    <q-btn dense flat icon="o_menu" round @click="toggleMenuDrawer" />

    <q-toolbar-title class="flex">
      <router-link class="cursor-pointer text-no-decoration" to="/">
        <img v-if="brand" :alt="title" class="q-mr-sm qas-toolbar__brand" :src="brand">
        <span v-if="title" class="text-bold text-primary-contrast text-subtitle1 text-uppercase">{{ title }}</span>
        <q-badge v-if="hasDevelopmentBadge" align="middle" class="q-ml-sm" color="negative" :label="developmentBadgeLabel" />
      </router-link>
    </q-toolbar-title>

    <div class="items-center no-wrap q-gutter-md row">
      <!-- TODO: Notificações. -->
      <div v-if="hasNotifications">
        <qas-btn class="q-mr-md" dense icon="o_notifications" round>
          <q-badge v-if="notifications" color="red" floating>{{ notifications.count }}</q-badge>
        </qas-btn>
      </div>

      <qas-apps-menu v-if="hasApps" :apps="apps" />

      <slot name="tools" />

      <div v-if="isAuth" class="cursor-pointer items-center q-mr-sm qas-toolbar__user rounded-borders row" :title="user.name || user.givenName">
        <qas-avatar class="rounded-borders-left" color="white" dark :image="user.photo" rounded size="42px" text-color="primary" :title="user.name || user.givenName" />

        <div class="q-px-sm qas-toolbar__user-data qs-lh-lg text-caption">
          <div class="ellipsis">{{ user.name || user.givenName }}</div>
          <div class="ellipsis text-bold">{{ user.email }}</div>
        </div>

        <q-menu anchor="bottom end" content-class="shadow-primary" max-height="400px" :offset="[0, 5]" self="top end">
          <div class="qas-toolbar__user-menu">
            <div class="q-pa-lg text-center">
              <button class="unset" @click="goToProfile">
                <qas-avatar :image="user.photo" size="145px" :title="user.name || user.givenName" />
              </button>

              <div class="ellipsis q-mt-lg qs-lh-sm text-bold text-subtitle1">{{ user.name || user.givenName }}</div>
              <div class="ellipsis q-mt-xs text-caption">{{ user.email }}</div>

              <div class="q-mt-sm">
                <qas-btn flat icon="o_edit" label="Editar" :to="user.to" />
              </div>

              <div class="q-mt-sm">
                <qas-btn v-close-popup class="q-px-lg q-py-xs" dense icon="o_exit_to_app" label="Sair" outline @click="signOut" />
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
export default {
  props: {
    apps: {
      default: () => [],
      type: Array
    },

    brand: {
      default: '',
      type: String
    },

    isAuth: {
      type: Boolean
    },

    title: {
      default: '',
      required: true
    },

    notifications: {
      default: () => ({}),
      type: Object
    },

    user: {
      default: () => ({}),
      require: true,
      type: Object
    }
  },

  emits: ['sign-out', 'toggle-menu'],

  data () {
    return {
      menuDrawer: true
    }
  },

  computed: {
    developmentBadgeLabel () {
      const hosts = {
        localhost: 'Local',
        feature: 'Feature',
        develop: 'Develop',
        release: 'Release'
      }

      if (process.env.DEV) {
        return hosts.localhost
      }

      const current = Object.keys(hosts).find(
        host => location.hostname.includes(host)
      )

      return current ? hosts[current] : ''
    },

    hasApps () {
      return !!this.apps.length
    },

    hasDevelopmentBadge () {
      return !!this.developmentBadgeLabel
    },

    hasNotifications () {
      return !!Object.keys(this.notifications).length
    }
  },

  methods: {
    goToProfile () {
      return this.$router.push(this.user.to)
    },

    signOut () {
      this.$emit('sign-out')
    },

    toggleMenuDrawer () {
      this.$emit('toggle-menu')
    }
  }
}
</script>

<style lang="scss">
.qas-toolbar {
  height: 70px;

  &__brand {
    height: 24px;
    margin-right: map-get($space-sm, x);
    position: relative;
    top: 4px;
  }

  &__user {
    background-color: rgba(white, 0.1);
    transition: background-color $generic-hover-transition;

    &:focus,
    &:hover {
      background-color: rgba(white, 0.2);
    }
  }

  &__user-data {
    max-width: 180px;
  }

  &__user-menu {
    width: 260px;
  }

  @media (max-width: $breakpoint-xs) {
    &__user-data {
      display: none;
    }
  }
}
</style>
