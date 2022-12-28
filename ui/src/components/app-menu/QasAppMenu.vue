<template>
  <q-drawer v-model="model" :behavior="behavior" class="qas-app-menu" :width="280">
    <div class="column full-height justify-between">
      <div class="full-width">
        <!-- Brand -->
        <div v-if="!$qas.screen.untilLarge" class="q-pt-xl q-px-lg">
          <router-link class="block q-toolbar__title relative-position text-no-decoration" :to="rootRoute">
            <img v-if="brand" :alt="title" class="full-width" :src="brand">
            <span v-else class="ellipsis text-bold text-primary">{{ title }}</span>
            <q-badge v-if="hasDevelopmentBadge" color="red" floating :label="developmentBadgeLabel" />
          </router-link>
        </div>

        <!-- Module -->
        <div v-if="displayModuleSection" class="q-mt-xl q-px-lg qas-app-menu__module">
          <qas-select v-model="module" borderless class="q-py-xs qas-app-menu__select shadow-2" dense input-class="q-px-md" :options="defaultModules" :outlined="false" :use-search="false" @update:model-value="redirectHandler(currentModelOption)" />
        </div>

        <!-- Menu -->
        <q-list v-if="items.length" class="q-mt-xl qas-app-menu__menu text-grey-9">
          <template v-for="(menuItem, index) in items">
            <div v-if="hasChildren(menuItem)" :key="`children-${index}`">
              <q-item class="items-center q-pb-none q-pt-md text-weight-bold">
                {{ menuItem.label }}
              </q-item>

              <q-item v-for="(menuChildItem, childIndex) in menuItem.children" :key="childIndex" :active="isActive(menuChildItem)" :to="getRouterRedirect(menuChildItem)">
                <q-item-section v-if="menuChildItem.icon" avatar>
                  <q-icon :name="menuChildItem.icon" />
                </q-item-section>

                <q-item-section>
                  <q-item-label>{{ menuChildItem.label }}</q-item-label>
                </q-item-section>
              </q-item>
            </div>

            <q-item v-else :key="index" :active="isActive(menuItem)" active-class="q-router-link--active" :to="getRouterRedirect(menuItem)">
              <q-item-section v-if="menuItem.icon" avatar>
                <q-icon :name="menuItem.icon" />
              </q-item-section>

              <q-item-section>
                <q-item-label>{{ menuItem.label }}</q-item-label>
              </q-item-section>
            </q-item>
          </template>
        </q-list>
      </div>

      <!-- User -->
      <div v-if="showUser" class="full-width q-pb-lg q-px-lg">
        <qas-app-user avatar-size="48px" :user="user" @sign-out="signOut" />
      </div>
    </div>
  </q-drawer>
</template>

<script>
import QasAppUser from '../app-user/QasAppUser.vue'
import { isLocalDevelopment } from '../../helpers'

export default {
  name: 'QasAppMenu',

  components: {
    QasAppUser
  },

  props: {
    brand: {
      default: '',
      type: String
    },

    items: {
      default: () => [],
      type: Array
    },

    modelValue: {
      default: true,
      type: Boolean
    },

    modules: {
      default: () => [],
      type: Array
    },

    notifications: {
      default: () => ({}),
      type: Object
    },

    title: {
      default: '',
      required: true,
      type: String
    },

    user: {
      default: () => ({}),
      require: true,
      type: Object
    }
  },

  emits: ['sign-out', 'update:modelValue'],

  data () {
    return {
      module: ''
    }
  },

  computed: {
    behavior () {
      return this.$qas.screen.untilLarge ? 'mobile' : 'desktop'
    },

    currentModelOption () {
      return this.defaultModules.find(module => module?.value === this.module)
    },

    currentModule () {
      const hostname = window.location.hostname
      return this.defaultModules.find(module => module?.value.includes(hostname))?.value
    },

    defaultModules () {
      if (!isLocalDevelopment()) return this.modules

      const defaultModules = [...this.modules]
      const { host, protocol } = window.location
      const value = `${protocol}//${host}`

      // Add a default module called "Localhost" when app is running in local development.
      defaultModules.unshift({
        label: `Localhost ${this.title ? `(${this.title})` : ''}`,
        value
      })

      return defaultModules
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

    displayModuleSection () {
      return this.defaultModules.length
    },

    hasDevelopmentBadge () {
      return !!this.developmentBadgeLabel
    },

    model: {
      get () {
        return this.modelValue
      },

      set (value) {
        return this.$emit('update:modelValue', value)
      }
    },

    rootRoute () {
      return this.$router.hasRoute('Root') ? { name: 'Root' } : { path: '/' }
    },

    showUser () {
      return this.hasUser && !this.$qas.screen.untilLarge
    }
  },

  watch: {
    currentModule: {
      handler (value) {
        this.module = value
      },

      immediate: true
    }
  },

  methods: {
    getNormalizedPath (path) {
      return path.split('/').filter(Boolean)?.[0]
    },

    getPathFromObject ({ path, name }) {
      if (path) return this.getNormalizedPath(path)

      const resolvedRoute = this.$router.resolve({ name })
      return this.getNormalizedPath(resolvedRoute.path)
    },

    getRouterRedirect ({ to }) {
      return to || ''
    },

    hasChildren ({ children }) {
      return !!(children || []).length
    },

    hasUser () {
      return !!Object.keys(this.user).length
    },

    isActive ({ to }) {
      const currentPath = this.getNormalizedPath(this.$route.path)
      const itemPath = typeof to === 'string' ? this.getNormalizedPath(to) : this.getPathFromObject(to)

      return currentPath === itemPath
    },

    redirectHandler ({ value }) {
      if (!value.includes(window.location.host)) {
        window.location.href = value
      }
    },

    signOut () {
      this.$emit('sign-out')
    }
  }
}
</script>

<style lang="scss">
.qas-app-menu {
  // Workaround para alterar o padding interno do QSelect sem influenciar na caixa de opções.
  &__module {
    .q-field__native {
      padding-left: var(--qas-spacing-md);
    }

    .q-field__append {
      margin-right: var(--qas-spacing-sm);
    }
  }

  &__menu .q-item {
    padding-left: var(--qas-spacing-lg);
  }

  &__select {
    border-radius: 4px;
  }

  // User
  .qas-app-user__data {
    line-height: 1.25;
  }

  // Media: untilLarge
  @media (min-width: $breakpoint-sm-max) {
    // Menu
    &__menu {
      max-height: calc(100vh - 310px);
      overflow-x: auto;
    }
  }
}
</style>
