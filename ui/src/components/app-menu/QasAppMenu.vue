<template>
  <q-drawer v-model="model" :behavior="behavior" :mini="isMiniMode" :mini-width="88" :width="drawerWidth">
    <div class="column full-height justify-between qas-app-menu">
      <div class="full-width">
        <!-- Brand -->
        <div v-if="!$qas.screen.untilLarge" class="q-mb-xl q-pt-xl q-px-lg">
          <router-link class="block q-toolbar__title relative-position text-no-decoration" :to="rootRoute">
            <img v-if="brand" :alt="title" class="qas-app-menu__brand" :src="normalizedBrand">
            <span v-else class="ellipsis text-bold text-primary text-subtitle2">{{ title }}</span>
            <q-badge v-if="hasDevelopmentBadge" color="red" floating :label="developmentBadgeLabel" />
          </router-link>
        </div>

        <div class="q-px-lg">
          <q-separator />
        </div>

        <!-- Module -->
        <div v-if="displayModuleSection" class="items-center justify-between no-wrap q-mt-xl q-px-lg qas-app-menu__module row">
          <div class="full-width">
            <!-- <qas-btn-dropdown :button-props="{ label: 'Usuário' }" use-menu-padding>
              <q-list>
                <q-item v-for="moduleItem in defaultModules" :key="moduleItem">
                  Meu moduleItem - {{ moduleItem }}
                </q-item>
              </q-list>
            </qas-btn-dropdown> -->

            <pv-app-menu-dropdown :current-module="currentModelOption" :options="defaultModules" />
            <!-- <qas-select v-model="module" borderless class="q-py-xs qas-app-menu__select shadow-2" dense input-class="q-px-md" :options="defaultModules" :outlined="false" :use-search="false" @update:model-value="redirectHandler(currentModelOption)" /> -->
          </div>

          <div v-if="$qas.screen.isSmall" class="q-ml-xl">
            <qas-btn color="grey-9" icon="sym_r_close" variant="tertiary" @click="closeDrawer" />
          </div>
        </div>

        <!-- Menu -->
        <q-list v-if="items.length" class="q-mt-xl qas-app-menu__menu text-grey-9">
          <template v-for="(menuItem, index) in items">
            <div v-if="hasChildren(menuItem)" :key="`children-${index}`" class="qas-app-menu__content">
              <q-item class="items-center q-pb-none q-pt-md qas-app-menu__item qas-app-menu__item--label text-weight-bold">
                <div class="ellipsis text-grey-9 text-subtitle2">
                  {{ menuItem.label }}
                </div>
              </q-item>

              <q-item v-for="(menuChildItem, childIndex) in menuItem.children" :key="childIndex" :active="isActive(menuChildItem)" class="qas-app-menu__children qas-app-menu__item qas-app-menu__item--children" :to="getRouterRedirect(menuChildItem)">
                <q-item-section v-if="menuChildItem.icon" avatar>
                  <q-icon :name="menuChildItem.icon" />
                </q-item-section>

                <q-item-section>
                  <q-item-label>
                    <div class="ellipsis text-subtitle2">
                      {{ menuChildItem.label }}
                    </div>
                  </q-item-label>
                </q-item-section>
              </q-item>
            </div>

            <q-item v-else :key="index" :active="isActive(menuItem)" active-class="q-router-link--active" class="qas-app-menu__item" :to="getRouterRedirect(menuItem)">
              <q-item-section v-if="menuItem.icon" avatar>
                <q-icon :name="menuItem.icon" />
              </q-item-section>

              <q-item-section>
                <q-item-label>
                  <div class="ellipsis text-subtitle2">
                    {{ menuItem.label }}
                  </div>
                </q-item-label>
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
import PvAppMenuDropdown from './private/PvAppMenuDropdown.vue'

import QasAppUser from '../app-user/QasAppUser.vue'

import { isLocalDevelopment } from '../../helpers'

export default {
  name: 'QasAppMenu',

  components: {
    PvAppMenuDropdown,

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

    miniBrand: {
      type: String,
      default: ''
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
      // return 'desktop'
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

    drawerWidth () {
      return 220
      // return this.$qas.screen.isSmall ? 320 : 280
    },

    hasDevelopmentBadge () {
      return !!this.developmentBadgeLabel
    },

    isMiniMode () {
      return this.$qas.screen.isLarge
    },

    model: {
      get () {
        return this.modelValue
      },

      set (value) {
        return this.$emit('update:modelValue', value)
      }
    },

    normalizedBrand () {
      return this.isMiniMode ? this.miniBrand : this.brand
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
    },

    closeDrawer () {
      this.$emit('update:modelValue', false)
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

  &__brand {
    max-width: 208px;
    width: 100%;
  }

  &__menu .q-item {
    padding-left: var(--qas-spacing-lg);
  }

  &__select {
    border-radius: var(--qas-generic-border-radius);
  }

  &__item {
    &:not(&--label) + &:not(&--label) {
      margin-top: var(--qas-spacing-sm);
    }

    &--label {
      // margin-bottom: var(--qas-spacing-md);
      // min-height: 0;
      // padding-top: 0;
    }

    &--children.q-item {
      // padding-left: calc(var(--qas-spacing-xl) + var(--qas-spacing-sm));

      & + & {
        margin-top: var(--qas-spacing-sm);
      }
    }
  }

  // &__content + &__content,
  // &__item + &__content,
  // &__content + &__item {
  //   margin-top: var(--qas-spacing-lg);
  // }

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
