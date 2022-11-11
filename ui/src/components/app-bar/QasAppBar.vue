<template>
  <q-header class="bg-white qas-app-bar shadow-2" height-hint="70">
    <q-toolbar class="q-px-md qas-app-bar__toolbar" color="bg-white">
      <q-ajax-bar color="white" position="top" size="2px" />

      <qas-btn v-if="$qas.screen.untilLarge" color="grey-7" dense flat icon="o_menu" round @click="toggleMenuDrawer" />

      <q-toolbar-title class="flex" :class="toolbarTitleClass">
        <div class="cursor-pointer" @click="goToRoot">
          <img v-if="brand" :alt="title" class="q-mr-sm qas-app-bar__brand" :src="brand">
          <span v-if="showTitle" class="text-bold text-grey-9 text-subtitle1 text-uppercase">{{ title }}</span>
          <q-badge v-if="hasDevelopmentBadge" align="middle" class="q-ml-sm" color="negative" :label="developmentBadgeLabel" />
        </div>
      </q-toolbar-title>

      <div v-if="hasNotifications" class="q-mr-md">
        <qas-btn class="q-mr-md" dense icon="o_notifications" round unelevated>
          <q-badge v-if="notifications" color="red" floating>{{ notifications.count }}</q-badge>
        </qas-btn>
      </div>

      <div class="items-center no-wrap q-gutter-md row">
        <slot name="tools" />

        <div v-if="hasUser" class="cursor-pointer items-center no-wrap qas-app-bar__user-content rounded-borders row text-grey-9" :title="userName">
          <qas-avatar color="white" dark :image="user.photo" rounded size="42px" text-color="primary" :title="userName" />

          <div class="q-ml-md q-pr-sm qas-app-bar__user-data qs-lh-lg">
            <div class="ellipsis q-mb-xs qas-app-bar__user-name">{{ userName }}</div>
            <div class="ellipsis qas-app-bar__user-email">{{ user.email }}</div>
          </div>

          <q-menu anchor="bottom end" class="shadow-2 text-grey-9" max-height="400px" :offset="[0, 5]" self="top end">
            <div class="qas-app-bar__user-menu">
              <div class="q-pa-lg text-center">
                <button class="unset" @click="goToProfile">
                  <qas-avatar :image="user.photo" size="145px" :title="userName" />
                </button>

                <div class="ellipsis q-mt-lg qas-app-bar__user-name qs-lh-sm">{{ userName }}</div>
                <div class="ellipsis q-mt-xs">{{ user.email }}</div>

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
        '.dev.': 'Develop'
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
    },

    hasUser () {
      return !!Object.keys(this.user).length
    },

    userName () {
      return this.user.name || this.user.givenName
    },

    toolbarTitleClass () {
      return !this.$qas.screen.untilLarge && 'q-pl-none'
    }
  },

  methods: {
    goToProfile () {
      return this.$router.push(this.user.to)
    },

    goToRoot () {
      const hasRoot = this.$router.hasRoute('Root')

      this.$router.push({
        ...(hasRoot ? { name: 'Root' } : { path: '/' })
      })
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
    position: relative;
    top: 4px;
  }

  &__user-content {
    width: 230px;
  }

  &__user-data {
    max-width: 180px;
  }

  &__user-name {
    font-weight: 600;
  }

  &__user-menu {
    width: 260px;
  }

  @media (max-width: $breakpoint-xs) {
    &__user-content {
      width: auto;
    }

    &__user-data {
      display: none;
    }
  }
}
</style>
