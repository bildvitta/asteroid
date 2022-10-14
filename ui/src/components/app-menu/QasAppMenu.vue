<template>
  <q-drawer v-model="model" class="qas-app-menu" :width="288" @before-hide="beforeHide" @mini-state="setMiniState">
    <div class="column flex full-height justify-between no-wrap overflow-x-hidden">
      <div>
        <div v-if="displayModuleSection" class="q-mb-lg q-mt-md q-mx-md">
          <div class="q-mb-sm text-caption text-grey-7 text-weight-medium">
            Você está em:
          </div>

          <qas-select v-model="module" :options="defaultModules" @update:model-value="redirectHandler(currentModelOption)" />
        </div>

        <q-list class="text-grey-9 text-weight-medium">
          <!-- <template v-for="(header, index) in items">
            <q-expansion-item v-if="hasChildren(header)" :key="header.label" :ref="`item-${index}`" :active-class="activeItemClassesSecondary" :default-opened="shouldExpand(header)" expand-icon="o_keyboard_arrow_down" expand-separator group="item" :icon="header.icon" :label="header.label" :to="header.to" @click="toggleItem(index)">
              <q-item v-for="(item, itemIndex) in header.children" :key="itemIndex" v-ripple :active-class="activeItemClasses" clickable :to="item.to">
                <q-item-section v-if="item.icon" avatar>
                  <q-icon :name="item.icon" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>{{ item.label }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-expansion-item>

            <q-item v-else :key="index" v-ripple :active-class="activeItemClasses" clickable :to="header.to">
              <q-item-section v-if="header.icon" avatar>
                <q-icon :name="header.icon" />
              </q-item-section>
              <q-item-section>
                <q-item-label>{{ header.label }}</q-item-label>
              </q-item-section>
            </q-item>
          </template> -->
        </q-list>

        <q-list v-if="items.length" class="text-grey-9">
          <template v-for="(header, index) in items">
            <!-- <pre>{{ header }}</pre> -->
            <div v-if="hasChildren(header)" :key="`children-${index}`" class="qas-app-menu__content">
              <q-item class="items-center q-mt-md qas-app-menu__item-children">
                {{ header.label }}
              </q-item>

              <q-item v-for="(child, childIndex) in header.children" :key="childIndex" :active="isActive(child)" class="qas-app-menu__item-children" :to="child.to || {}">
                <q-item-section v-if="child.icon" avatar>
                  <q-icon :name="child.icon" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>{{ child.label }}</q-item-label>
                </q-item-section>
              </q-item>
            </div>

            <q-item v-else :key="index" :active="true" active-class="text-orange" :to="header.to || {}">
              <q-item-section v-if="header.icon" avatar>
                <q-icon :name="header.icon" />
              </q-item-section>
              <q-item-section>
                <q-item-label>{{ header.label }}</q-item-label>
              </q-item-section>
            </q-item>
          </template>
        </q-list>
      </div>
    </div>
  </q-drawer>
</template>

<script>
import { isLocalDevelopment } from '../../helpers'

export default {
  name: 'QasAppMenu',

  props: {
    items: {
      default: () => [],
      type: Array
    },

    modelValue: {
      default: true,
      type: Boolean
    },

    title: {
      default: '',
      type: String
    },

    modules: {
      default: () => [],
      type: Array
    }
  },

  emits: ['update:modelValue'],

  data () {
    return {
      miniMode: false,
      module: '',
      isMini: false
    }
  },

  computed: {
    activeItemClasses () {
      return 'bg-primary-contrast text-primary text-weight-bold'
    },

    activeItemClassesSecondary () {
      return 'text-primary bg-secondary-contrast'
    },

    defaultModules () {
      if (!isLocalDevelopment()) return this.modules

      const defaultModules = [...this.modules]
      const { host, protocol } = window.location
      const value = `${protocol}//${host}`

      // if app is in development mode (local) it's added a default module
      defaultModules.unshift({
        label: `Localhost ${this.title ? `(${this.title})` : ''}`,
        value
      })

      return defaultModules
    },

    model: {
      get () {
        return this.modelValue
      },

      set (value) {
        return this.$emit('update:modelValue', value)
      }
    },

    currentModelOption () {
      return this.defaultModules.find(module => module?.value === this.module)
    },

    displayModuleSection () {
      return !this.isMini && this.defaultModules.length
    },

    currentModule () {
      const hostname = window.location.hostname

      return this.defaultModules.find(module => module?.value.includes(hostname))?.value
    },

    normalizedRoutePaths () {
      const routes = this.$router.getRoutes()

      return routes
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

  created () {
    console.log(this.$route)
  },

  methods: {
    hasChildren ({ children }) {
      return !!(children || []).length
    },

    shouldExpand ({ children, to }) {
      return children?.length && this.$route.matched.some(item => item?.path === to?.path)
    },

    beforeHide () {
      if (this.$qas.screen.isLarge) {
        this.model = true
        // this.miniMode = !this.miniMode
      }
    },

    setMiniState (value) {
      this.isMini = value
    },

    redirectHandler ({ value }) {
      if (!value.includes(window.location.host)) {
        window.location.href = value
      }
    },

    toggleItem (index) {
      const component = this.getComponent(index)

      component?.to && this.isMini && component.toggle()
    },

    getComponent (index) {
      return this.$refs[`item-${index}`]?.[0]
    },

    getPathFromObject ({ path, name }) {
      if (path) return this.getNormalizedPath(path)

      const resolvedRoute = this.$router.resolve({ name })

      return this.getNormalizedPath(resolvedRoute.path)
    },

    getNormalizedPath (path) {
      return path.split('/').filter(Boolean)?.[0]
    },

    isActive ({ to }) {
      const currentPath = this.getNormalizedPath(this.$route.path)
      const itemPath = typeof to === 'string' ? this.getNormalizedPath(to) : this.getPathFromObject(to)
      console.log('🚀 ~ file: QasAppMenu.vue ~ line 238 ~ isActive ~ currentPath', itemPath, to)
      return currentPath === itemPath
    }
  }
}
</script>

<style lang="scss">
.q-item {
  font-size: 16px;

  &.q-router-link--exact-active {
    background-color: transparent !important;
    font-weight: 600;

    &::before {
      background-color: var(--q-primary);
      bottom: 0;
      color: var(--q-primary);
      content: '';
      left: 0;
      position: absolute;
      top: 0;
      width: 4px;
    }
  }
}

.qas-app-menu {
  &__item-children {
    .q-item + .q-item {
      margin-top: 4px;
    }

    &.q-item {
      padding-left: 20px;
    }

    &.q-item + &.q-item {
      margin-top: 8px;
    }
  }
}

.q-item .q-focus-helper {
  display: none;
}

.q-item__section--avatar {
  min-width: 0;
}

.q-item--clickable {
  transition: color 300ms;

  &:hover {
    color: var(--q-primary);
  }
}
</style>
