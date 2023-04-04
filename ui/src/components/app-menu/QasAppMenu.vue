<template>
  <div class="qas-app-menu">
    <q-drawer v-model="model" :behavior="behavior" class="shadow-2" :mini="isMiniMode" :mini-width="88" show-if-above :width="drawerWidth" @mouseenter="onMouseEvent" @mouseleave="onMouseEvent">
      <div class="column full-height justify-between no-wrap">
        <div class="full-width">
          <!-- Brand -->
          <div v-if="!isUntilLarge" class="q-mb-xl q-pt-xl qas-app-menu__label" :class="{ 'qas-app-menu__label--spaced': !isMiniMode }">
            <router-link class="flex relative-position text-no-decoration" :class="brandPositionClass" :to="rootRoute">
              <q-img v-if="normalizedBrand" :alt="title" class="qas-app-menu__image-size qas-app-menu__label" :class="brandClass" height="36px" :src="normalizedBrand" />

              <span v-else-if="!isMiniMode" class="ellipsis text-bold text-primary text-subtitle2">{{ title }}</span>

              <q-badge v-if="hasDevelopmentBadge" color="red" floating :label="developmentBadgeLabel" />
            </router-link>
          </div>

          <div v-if="false" class="q-px-lg">
            <q-separator />
          </div>

          <div v-if="isUntilLarge" class="q-pr-md q-pt-md text-right">
            <qas-btn color="grey-9" icon="sym_r_close" variant="tertiary" @click="closeDrawer" />
          </div>

          <!-- Module -->
          <div v-if="displayModuleSection" class="items-center justify-between no-wrap q-mt-xl qas-app-menu__label qas-app-menu__module row" :class="{ 'qas-app-menu__label--spaced': !isMiniMode }">
            <div class="full-width text-center">
              <pv-app-menu-dropdown :current-module="currentModelOption" :options="defaultModules" v-bind="appMenuDropdownProps" />
            </div>
          </div>

          <!-- Menu -->
          <q-list v-if="items.length" class="q-mt-xl qas-app-menu__menu text-grey-9">
            <template v-for="(menuItem, index) in items">
              <div v-if="hasChildren(menuItem)" :key="`children-${index}`" class="qas-app-menu__content">
                <q-item class="ellipsis items-center q- q-pb-none qas-app-menu__item qas-app-menu__item--label-mini text-weight-bold">
                  <div class="ellipsis qas-app-menu__label text-grey-9 text-subtitle2" :class="{ 'qas-app-menu__label--spaced': !isMiniMode }">
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
          <qas-app-user v-bind="appUserProps" />
        </div>
      </div>
    </q-drawer>
  </div>
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
      required: true,
      type: String
    },

    items: {
      default: () => [],
      type: Array
    },

    miniBrand: {
      type: String,
      required: true,
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
      hasOpenedMenu: false,
      isMini: this.$qas.screen.isLarge,
      module: ''
    }
  },

  computed: {
    appMenuDropdownProps () {
      return {
        buttonDropdownProps: {
          'onUpdate:menuOpened': this.setHasOpenedMenu
        },

        currentModule: this.currentModelOption,
        options: this.defaultModules
      }
    },

    appUserProps () {
      return {
        avatarSize: '40px',
        user: this.user,

        menuProps: {
          'onUpdate:modelValue': this.setHasOpenedMenu
        },

        // eventos
        onSignOut: this.signOut
      }
    },

    behavior () {
      return this.isUntilLarge ? 'mobile' : 'desktop'
    },

    brandClass () {
      return {
        'qas-app-menu__image-size--spaced': !this.isMiniMode
      }
    },

    brandPositionClass () {
      return {
        'justify-center': true
      }
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
        icon: 'sym_r_home',
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
      return this.isUntilLarge ? 320 : 280
    },

    hasDevelopmentBadge () {
      return !!this.developmentBadgeLabel
    },

    isLargeScreen () {
      return this.$qas.screen.isLarge
    },

    isMiniMode () {
      return this.isLargeScreen && this.isMini && !this.hasOpenedMenu
    },

    isUntilLarge () {
      return this.$qas.screen.untilLarge
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
      return this.hasUser && !this.isUntilLarge
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
    closeDrawer () {
      this.$emit('update:modelValue', false)
    },

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

    onMouseEvent ({ type }) {
      if (!this.isLargeScreen) return

      const isMouseLeave = type === 'mouseleave'

      this.isMini = isMouseLeave

      this.model = false
    },

    signOut () {
      this.$emit('sign-out')
    },

    setHasOpenedMenu (value) {
      this.hasOpenedMenu = value
    }
  }
}
</script>

<style lang="scss" scoped>
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

  &__select {
    border-radius: var(--qas-generic-border-radius);
  }

  &__item {
    &:not(&--label) + &:not(&--label) {
      margin-top: var(--qas-spacing-sm);
    }

    &--children.q-item {
      & + & {
        margin-top: var(--qas-spacing-sm);
      }
    }
  }

  &__label {
    padding-left: var(--qas-spacing-md) !important;
    padding-right: var(--qas-spacing-md) !important;
    transition: padding 120ms;
    will-change: auto;

    &--spaced {
      padding-left: var(--qas-spacing-xl) !important;
      padding-right: var(--qas-spacing-xl) !important;
    }
  }

  &__image-size {
    width: 36px;

    &--spaced {
      width: 188px;
    }
  }

  &__item--label-mini {
    padding-left: 0 !important;
    padding-right: 0 !important;
  }

  .q-item:not(&__item--label-mini) {
    padding-left: var(--qas-spacing-xl) !important;
    padding-right: var(--qas-spacing-xl) !important;
  }

  &__content .q-item {
    padding-top: 0;
  }

  &__content + &__content,
  &__item + &__content,
  &__content + &__item {
    margin-top: var(--qas-spacing-sm);
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
