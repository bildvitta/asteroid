<template>
  <div class="qas-app-menu">
    <q-drawer v-model="model" :behavior="behavior" class="shadow-2" :mini="isMiniMode" mini-to-overlay :mini-width="88" show-if-above :width="drawerWidth" @mouseenter="onMouseEvent" @mouseleave="onMouseEvent">
      <div class="column full-height justify-between">
        <div class="full-width">
          <!-- Brand -->
          <div v-if="!$qas.screen.untilLarge" class="q-mb-xl q-pt-xl q-px-md">
            <router-link class="flex justify-center q-toolbar__title relative-position text-no-decoration" :to="rootRoute">
              <q-img v-if="brand" :key="imageCounterKey" :alt="title" :class="brandClass" height="36px" :src="normalizedBrand" />

              <span v-else-if="!isMiniMode" class="ellipsis text-bold text-primary text-subtitle2">{{ title }}</span>

              <q-badge v-if="hasDevelopmentBadge" color="red" floating :label="developmentBadgeLabel" />
            </router-link>
          </div>

          <div class="q-px-lg">
            <q-separator />
          </div>

          <div v-if="$qas.screen.isSmall" class="q-pr-md q-pt-md text-right">
            <qas-btn color="grey-9" icon="sym_r_close" variant="tertiary" @click="closeDrawer" />
          </div>

          <!-- Module -->
          <div v-if="displayModuleSection" class="items-center justify-between no-wrap q-mt-xl q-px-lg qas-app-menu__module row">
            <div class="full-width text-center">
              <!-- <qas-btn-dropdown :button-props="{ label: 'Usuário' }" use-menu-padding>
              <q-list>
                <q-item v-for="moduleItem in defaultModules" :key="moduleItem">
                  Meu moduleItem - {{ moduleItem }}
                </q-item>
              </q-list>
            </qas-btn-dropdown> -->

              <!-- <pv-app-menu-dropdown :current-module="currentModelOption" :options="defaultModules" /> -->
            <!-- <qas-select v-model="module" borderless class="q-py-xs qas-app-menu__select shadow-2" dense input-class="q-px-md" :options="defaultModules" :outlined="false" :use-search="false" @update:model-value="redirectHandler(currentModelOption)" /> -->
            </div>
          </div>

          <!-- Menu -->

          <q-list v-if="items.length" class="q-mt-xl qas-app-menu__menu text-grey-9">
            <template v-for="(menuItem, index) in items">
              <div v-if="hasChildren(menuItem)" :key="`children-${index}`" class="qas-app-menu__content">
                <q-item class="ellipsis items-center q- q-pb-none q-pt-md qas-app-menu__item text-weight-bold" :class="{ 'qas-app-menu__item--label-mini': isMiniMode }">
                  <!-- <q-item class="ellipsis items-center q- q-pb-none q-pt-md qas-app-menu__item text-weight-bold" :class="{ 'qas-app-menu__item--label-mini': isMiniMode }" style="padding-left: 16px; padding-right: 16px;"> -->
                  <div class="ellipsis text-grey-9 text-subtitle2" :class="{ 'q-px-md': isMiniMode }">
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
          <qas-app-user avatar-size="40px" :user="user" @sign-out="signOut" />
        </div>
      </div>
    </q-drawer>
  </div>
</template>

<script>
// import PvAppMenuDropdown from './private/PvAppMenuDropdown.vue'

import QasAppUser from '../app-user/QasAppUser.vue'

import { isLocalDevelopment } from '../../helpers'

export default {
  name: 'QasAppMenu',

  components: {
    // PvAppMenuDropdown,

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
      // required: true,
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
      module: '',
      isMini: this.$qas.screen.isLarge,
      imageCounterKey: 0
    }
  },

  computed: {
    behavior () {
      return this.$qas.screen.untilLarge ? 'mobile' : 'desktop'
    },

    brandClass () {
      return this.isMiniMode ? 'qas-app-menu__brand-mini' : 'qas-app-menu__brand'
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
      // return false
      // return true
      return this.isLargeScreen && this.isMini
    },

    isLargeScreen () {
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
    },

    isMiniMode () {
      // this.imageCounterKey++
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

    onMouseEvent ({ type }) {
      if (!this.isLargeScreen) return

      const isMouseLeave = type === 'mouseleave'

      this.isMini = isMouseLeave

      this.model = false
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
    max-width: 188px;
    width: 100%;
  }

  &__brand-mini {
    max-width: 36px;
    width: 100%;
  }

  &__menu .q-item {
    // padding-left: var(--qas-spacing-lg);
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

  .q-item:not(&__item--label-mini) {
    padding-left: 32px !important;
    padding-right: 32px !important;
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

.q-drawer__content .q-drawer-container:not(.q-drawer--mini-animate) .q-drawer--mini .q-item,
.q-drawer__content .q-drawer-container:not(.q-drawer--mini-animate) .q-drawer--mini .q-item__section {
  padding-left: 16 !important;
  padding-right: 16 !important;
}
</style>
