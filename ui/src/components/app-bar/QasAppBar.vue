<template>
  <q-header class="bg-white qas-app-bar shadow-14" height-hint="70">
    <q-toolbar class="qas-app-bar__toolbar" color="bg-white">
      <q-ajax-bar color="white" position="top" size="2px" />

      <q-btn color="grey-7" dense flat icon="o_menu" round @click="toggleMenuDrawer" />

      <q-toolbar-title class="flex">
        <div class="cursor-pointer" @click="goToRoot">
          <img v-if="brand" :alt="title" class="q-mr-sm qas-app-bar__brand" :src="brand">
          <span v-if="showTitle" class="text-bold text-grey-9 text-subtitle1 text-uppercase">{{ title }}</span>
          <q-badge v-if="hasDevelopmentBadge" align="middle" class="q-ml-sm" color="negative" :label="developmentBadgeLabel" />
        </div>
      </q-toolbar-title>

      <div v-if="hasNotifications" class="q-mr-md">
        <q-btn class="q-mr-md" dense icon="o_notifications" round unelevated>
          <q-badge v-if="notifications" color="red" floating>{{ notifications.count }}</q-badge>
        </q-btn>
      </div>

      <div class="items-center no-wrap q-gutter-md row">
        <slot name="tools" />

        <div v-if="isAuth" class="cursor-pointer items-center q-mr-sm qas-app-bar__user rounded-borders row text-grey-9" :title="user.name || user.givenName">
          <qas-avatar class="rounded-borders-left" color="white" dark :image="user.photo" rounded size="42px" text-color="primary" :title="user.name || user.givenName" />

          <div class="q-px-sm qas-app-bar__user-data qs-lh-lg text-caption">
            <div class="ellipsis">{{ user.name || user.givenName }}</div>
            <div class="ellipsis text-bold">{{ user.email }}</div>
          </div>

          <q-menu anchor="bottom end" class="shadow-14" max-height="400px" :offset="[0, 5]" self="top end">
            <div class="qas-app-bar__user-menu">
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
  </q-header>
</template>

<script>
import QasAvatar from '../avatar/QasAvatar.vue'
import QasBtn from '../btn/QasBtn.vue'

export default {
  name: 'QasAppBar',

  components: {
    QasAvatar,
    QasBtn
  },

  props: {
    brand: {
      default: '',
      type: String
    },

    isAuth: {
      type: Boolean
    },

    title: {
      type: String,
      default: ''
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

    hasDevelopmentBadge () {
      return !!this.developmentBadgeLabel
    },

    hasNotifications () {
      return !!Object.keys(this.notifications).length
    },

    showTitle () {
      return this.title && !this.brand
    }
  },

  methods: {
    goToProfile () {
      return this.$router.push(this.user.to)
    },

    goToRoot () {
      this.$router.push({ name: 'Root' })
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
.qas-app-bar {
  &__toolbar {
    height: 70px;
  }

  &__brand {
    height: 24px;
    margin-right: 8px;
    position: relative;
    top: 4px;
  }

  &__user {
    background-color: var(--qas-background-color);
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
