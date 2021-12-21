<template>
  <q-drawer v-model="model" class="qas-app-menu" :mini="miniMode" :width="230" @before-hide="beforeHide" @hook:mounted="$forceUpdate()" @mini-state="setMiniState">
    <div class="column flex full-height justify-between no-wrap overflow-x-hidden">
      <div>
        <div v-if="!isMini" class="q-ma-md">
          <div class="q-mb-sm text-caption text-grey-7 text-weight-medium">
            Você está no modulo:
          </div>

          <qas-select v-model="module" :options="modules" @input="redirectHandler(currentModelOption)" />
        </div>

        <q-list class="text-grey-9 text-weight-medium">
          <template v-for="(header, index) in items">
            <q-expansion-item v-if="hasChildren(header)" :key="header.label" :ref="`item-${index}`" :class="activeClassHandler(index)" :default-opened="shouldExpand(header)" expand-icon="o_keyboard_arrow_down" expand-separator group="item" :icon="header.icon" :label="header.label" :to="header.to" @click="toggleItem(index)">
              <q-item v-for="(item, itemIndex) in header.children" :key="itemIndex" v-ripple :active-class="activeItemClasses" class="qas-app-menu__item" clickable :to="item.to" @click="$forceUpdate()">
                <q-item-section v-if="item.icon" avatar>
                  <q-icon :name="item.icon" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>{{ item.label }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-expansion-item>

            <q-item v-else :key="index" v-ripple :active-class="activeItemClasses" clickable :to="header.to" @click="$forceUpdate()">
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
        <img v-if="displayModularLogoFull" alt="modular logo" class="block q-mb-md q-mx-auto" src="../../assets/logo-modular-full.svg">
      </div>
    </div>
  </q-drawer>
</template>

<script>
import { screenMixin } from '../../mixins'

export default {
  mixins: [screenMixin],

  props: {
    itemClass: {
      default: '',
      type: [Array, Object, String]
    },

    items: {
      default: () => [],
      type: Array
    },

    value: {
      default: true,
      type: Boolean
    },

    modules: {
      default: () => [],
      type: Array
    },

    currentModule: {
      default: '',
      type: String
    },

    hasBrandCompany: {
      default: true,
      type: Boolean
    }
  },

  data () {
    return {
      miniMode: false,
      module: '',
      isMini: false
    }
  },

  computed: {
    activeItemClasses () {
      return 'background-test text-primary'
    },

    model: {
      get () {
        return this.value
      },

      set (value) {
        return this.$emit('input', value)
      }
    },

    currentModelOption () {
      return this.modules.find(module => module.value === this.module)
    },

    displayModularLogoFull () {
      return !this.isMini && this.hasBrandCompany
    },

    displayModularLogo () {
      return this.isMini && this.hasBrandCompany
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
      if (this.$_isLarge) {
        this.model = true
        this.miniMode = !this.miniMode
      }
    },

    setMiniState (value) {
      this.isMini = value
    },

    redirectHandler ({ path }) {
      if (!path.includes(window.location.host)) {
        window.location.href = path
      }
    },

    activeClassHandler (index) {
      const element = this.$refs[`item-${index}`]?.[0]?.$el
      const hasActiveNode = element?.querySelector('.q-router-link--exact-active')

      return hasActiveNode ? 'qas-app-menu--active' : ''
    },

    toggleItem (index) {
      const component = this.$refs[`item-${index}`]?.[0]

      component?.to && this.isMini && component.toggle()
      this.$forceUpdate()
    }
  }
}
</script>

<style lang="scss">
.qas-app-menu {
  &--active .q-expansion-item__container > .q-item:first-child,
  &--active .q-expansion-item__container > .q-item:first-child .q-item__section--side {
    color: var(--q-color-primary);
  }
}
</style>
