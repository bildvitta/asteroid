<template>
  <q-drawer v-model="model" :breakpoint="1023" class="qas-app-menu" :width="288">
    <div class="column flex full-height justify-between no-wrap overflow-x-hidden">
      <div class="q-mt-lg">
        <div v-if="displayModuleSection" class="q-mb-lg q-mx-md">
          <div class="q-mb-sm text-caption text-grey-7 text-weight-medium">
            Você está em:
          </div>

          <qas-select v-model="module" :options="defaultModules" @update:model-value="redirectHandler(currentModelOption)" />
        </div>

        <q-list v-if="items.length" class="q-mb-lg text-grey-9">
          <template v-for="(header, index) in items">
            <div v-if="hasChildren(header)" :key="`children-${index}`" class="qas-app-menu__content">
              <q-item class="items-center qas-app-menu__item-children">
                {{ header.label }}
              </q-item>

              <q-item v-for="(child, childIndex) in header.children" :key="childIndex" :active="isActive(child)" class="qas-app-menu__children qas-app-menu__item-children" :to="getRouterRedirect(child)">
                <q-item-section v-if="child.icon" avatar>
                  <q-icon :name="child.icon" />
                </q-item-section>

                <q-item-section>
                  <q-item-label>{{ child.label }}</q-item-label>
                </q-item-section>
              </q-item>
            </div>

            <q-item v-else :key="index" :active="isActive(header)" active-class="q-router-link--active" class="qas-app-menu__item" :to="getRouterRedirect(header)">
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
      module: ''
    }
  },

  computed: {
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
      return this.defaultModules.length
    },

    currentModule () {
      const hostname = window.location.hostname

      return this.defaultModules.find(module => module?.value.includes(hostname))?.value
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
    hasChildren ({ children }) {
      return !!(children || []).length
    },

    beforeHide () {
      if (this.$qas.screen.isLarge) {
        this.model = true
      }
    },

    redirectHandler ({ value }) {
      if (!value.includes(window.location.host)) {
        window.location.href = value
      }
    },

    getPathFromObject ({ path, name }) {
      if (path) return this.getNormalizedPath(path)

      const hasRoute = this.$router.hasRoute(name)

      // TODO remover este if
      if (!hasRoute) {
        return ''
      }

      const resolvedRoute = this.$router.resolve({ name })

      return this.getNormalizedPath(resolvedRoute.path)
    },

    getNormalizedPath (path) {
      return path.split('/').filter(Boolean)?.[0]
    },

    getRouterRedirect ({ to }) {
      return to || ''
    },

    isActive ({ to }) {
      const currentPath = this.getNormalizedPath(this.$route.path)
      const itemPath = typeof to === 'string' ? this.getNormalizedPath(to) : this.getPathFromObject(to)
      return currentPath === itemPath
    }
  }
}
</script>

<style lang="scss">
.qas-app-menu {
  .q-item + .q-item {
    margin-top: 4px;
  }

  &__children {
    &.q-item {
      padding-left: 20px;
    }
  }

  &__item-children {
    &.q-item + &.q-item {
      margin-top: 8px;
    }
  }

  &__content + &__content {
    margin-top: 16px;
  }

  &__content + &__item {
    margin-top: 16px;
  }

  &__item + &__content {
    margin-top: 16px;
  }
}
</style>
