<template>
  <q-header class="qas-app-bar shadow-2" height-hint="56">
    <q-toolbar class="bg-white qas-app-bar__toolbar text-grey-9">
      <qas-btn color="grey-9" icon="sym_r_menu" variant="tertiary" @click="toggleMenuDrawer" />

      <q-toolbar-title>
        <router-link class="flex items-center no-wrap text-no-decoration" :class="routerLinkClass" :to="rootRoute">
          <img v-if="brand" :alt="title" class="qas-app-bar__brand" :src="brand">
          <span v-else class="ellipsis text-bold text-primary">{{ title }}</span>
          <q-badge v-if="hasDevelopmentBadge" class="q-ml-sm" color="red" :label="developmentBadgeLabel" />
        </router-link>
      </q-toolbar-title>

      <slot v-if="hasUser" name="user" :user="user">
        <qas-app-user :menu-props="appUserMenuProps" :user="user" @sign-out="signOut" />
      </slot>
    </q-toolbar>
  </q-header>
</template>

<script>
import QasAppUser from '../app-user/QasAppUser.vue'
import QasBtn from '../btn/QasBtn.vue'

export default {
  name: 'QasAppBar',

  components: {
    QasAppUser,
    QasBtn
  },

  props: {
    brand: {
      default: '',
      type: String
    },

    notifications: {
      default: () => ({}),
      type: Object
    },

    title: {
      required: true,
      type: String
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
    appUserMenuProps () {
      return {
        anchor: 'bottom end',
        offset: [0, 5],
        self: 'top end'
      }
    },

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

    hasUser () {
      return !!Object.keys(this.user).length
    },

    rootRoute () {
      return this.$router.hasRoute('Root') ? { name: 'Root' } : { path: '/' }
    },

    routerLinkClass () {
      return this.$qas.screen.isSmall && 'justify-center'
    }
  },

  methods: {
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
    height: 56px;
  }

  &__brand {
    max-width: 164px;
  }
}
</style>
