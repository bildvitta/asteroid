<template>
  <q-drawer v-model="model" class="qas-app-menu" :mini="miniMode" :width="230" @before-hide="beforeHide" @mini-state="setMiniState">
    <div class="column flex full-height justify-between no-wrap overflow-x-hidden">
      <div>
        <div v-if="displayModuleSection" class="q-ma-md">
          <div class="q-mb-sm text-caption text-grey-7 text-weight-medium">
            Você está no modulo:
          </div>

          <qas-select v-model="module" :options="defaultModules" @update:model-value="redirectHandler(currentModelOption)" />
        </div>

        <q-list class="text-grey-9 text-weight-medium">
          <template v-for="(header, index) in items">
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
          </template>
        </q-list>
      </div>

      <div class="q-mx-md">
        <!-- TODO: O Modular não é o Asteroid, então não podemos manter esse logo aqui. -->
        <img v-if="!isMini" alt="Modular" class="block q-mb-md q-mx-auto" src="../../assets/logo-modular.svg">
      </div>
    </div>
  </q-drawer>
</template>

<script>
import { screenMixin } from '../../mixins'
import { isLocalDevelopment } from '../../helpers'

export default {
  name: 'QasAppMenu',

  mixins: [screenMixin],

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

    shouldExpand ({ children, to }) {
      return children?.length && this.$route.matched.some(item => item?.path === to?.path)
    },

    beforeHide () {
      if (this.mx_isLarge) {
        this.model = true
        this.miniMode = !this.miniMode
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
    }
  }
}
</script>

<style lang="scss">
.qas-app-menu {
  .q-expansion-item--expanded .q-item:not(&--active.q-item) {
    background-color: $grey-1;
  }
}
</style>
