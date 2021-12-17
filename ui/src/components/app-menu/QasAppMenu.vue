<template>
  <q-drawer class="qas-app-menu" v-model="model" :mini="miniMode" :width="230" @before-hide="beforeHide" @mini-state="setMiniState" @hook:mounted="$forceUpdate()">
    <div class="flex column no-wrap justify-between full-height overflow-x-hidden">
      <div>
        <div class="q-ma-md" v-if="!isMini">
          <div class="q-mb-sm text-caption text-grey-7 text-weight-medium">
            Você está no modulo:
          </div>

          <qas-select v-model="module" :options="modules" @input="redirectHandler(currentModelOption)" />
        </div>

        <q-list class="text-grey-9 text-weight-medium">
          <template v-for="(header, index) in items">
            <q-expansion-item v-if="hasChildren(header)" :key="header.label" :default-opened="shouldExpand(header)" expand-icon="o_keyboard_arrow_down" expand-separator :icon="header.icon" :label="header.label" :to="header.to" group="item" :class="activeClassHandler(`item-${index}`)" :ref="`item-${index}`">
              <q-item v-for="(item, itemIndex) in header.children" :key="itemIndex" v-ripple :active-class="activeItemClasses" clickable :to="item.to" class="qas-app-menu__item" @click="$forceUpdate()">
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
        <img v-if="displayModularLogoFull" src="../../assets/logo-modular-full.svg" class="q-mb-md q-mx-auto block" alt="modular logo">
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

  watch: {
    currentModule: {
      handler (value) {
        this.module = value
      },
      immediate: true
    }
  },

  computed: {
    activeItemClasses () {
      return 'background-test text-primary'
      return 'bg-primary text-primary-contrast'
    },

    activeSecondaryItemClasses () {
      // return 'active background-test text-primary-contrast'
      // return 'active bg-secondary-contrast text-primary-contrast'
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

    activeClassHandler (ref) {
      const element = this.$refs[ref]?.[0]?.$el
      const hasActiveNode = element?.querySelector('.q-router-link--exact-active')

      return hasActiveNode ? 'qas-app-menu--active' : ''
    }
  }
}
</script>

<style lang="scss">
.qas-app-menu {
  &--active .q-expansion-item__container > .q-item:first-child,
  &--active .q-expansion-item__container > .q-item:first-child .q-item__section--side {
    color: $primary;
  }
}
</style>
