<template>
  <div class="qas-app-menu">
    <q-drawer v-model="model" :behavior="behavior" class="shadow-2" :mini="isMiniMode" :mini-width="88" show-if-above :width="drawerWidth" @mouseenter="onMouseEvent" @mouseleave="onMouseEvent">
      <div class="column full-height justify-between no-wrap">
        <div class="full-width">
          <!-- Brand -->
          <div v-if="!screen.untilLarge" class="q-mb-xl q-pt-xl qas-app-menu__label" :class="classes.spacedItem">
            <router-link class="flex justify-center relative-position text-no-decoration" :to="rootRoute">
              <q-img v-if="normalizedBrand" :alt="title" class="qas-app-menu__brand qas-app-menu__label" :class="classes.brand" fit="contain" height="27px" no-spinner :src="normalizedBrand" />

              <span v-else-if="!isMiniMode" class="ellipsis text-bold text-primary text-subtitle2">{{ title }}</span>

              <q-badge v-if="hasDevelopmentBadge" class="q-mt-sm" color="red" :label="developmentBadgeLabel" />
            </router-link>
          </div>

          <div v-if="normalizedBrand" class="qas-app-menu__label" :class="classes.spacedItem">
            <q-separator />
          </div>

          <div v-if="screen.untilLarge" class="q-pr-xl q-pt-md text-right">
            <qas-btn color="grey-10" icon="sym_r_close" variant="tertiary" @click="closeDrawer" />
          </div>

          <!-- Module -->
          <div v-if="showAppMenuDropdown" class="items-center justify-between no-wrap q-mt-xl qas-app-menu__label qas-app-menu__module row" :class="classes.spacedItem">
            <div class="full-width text-center">
              <pv-app-menu-dropdown v-bind="appMenuDropdownProps" />
            </div>
          </div>

          <!-- List -->
          <q-list v-if="items.length" class="q-mt-xl qas-app-menu__menu text-grey-10">
            <template v-for="(menuItem, index) in items">
              <div v-if="hasChildren(menuItem)" :key="`children-${index}`" class="qas-app-menu__content" :class="classes.content">
                <q-item class="ellipsis items-center q-py-none qas-app-menu__item qas-app-menu__item--label-mini text-weight-bold">
                  <div class="ellipsis qas-app-menu__label text-grey-10 text-subtitle2" :class="classes.spacedItem">
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

                <div v-if="hasSeparator(index)" class="qas-app-menu__label" :class="classes.spacedItem">
                  <q-separator spaced />
                </div>
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
        <div v-if="showAppUser" class="full-width q-pb-lg q-px-lg">
          <qas-app-user v-bind="defaultAppUserProps" />
        </div>
      </div>
    </q-drawer>
  </div>
</template>

<script setup>
import PvAppMenuDropdown from './private/PvAppMenuDropdown.vue'
import QasAppUser from '../app-user/QasAppUser.vue'

import useAppMenuDropdown from './composables/use-app-menu-dropdown'
import useAppUser from './composables/use-app-user'
import useDevelopmentBadge from './composables/use-development-badge'
import { useScreen } from '../../composables'

import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

defineOptions({
  name: 'QasAppMenu',
  inheritAttrs: false
})

const props = defineProps({
  appUserProps: {
    type: Object,
    required: true,
    default: () => ({})
  },

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
  }
})

const emits = defineEmits(['sign-out', 'update:modelValue'])

const screen = useScreen()
const router = useRouter()

const rootRoute = router.hasRoute('Root') ? { name: 'Root' } : { path: '/' }

const hasOpenedMenu = ref(false)
const isMini = ref(screen.isLarge)

const composableParams = {
  props,
  onMenuUpdate: setHasOpenedMenu,
  onSignOut: () => emits('sign-out')
}

const { defaultAppUserProps, showAppUser } = useAppUser(composableParams)
const { appMenuDropdownProps, showAppMenuDropdown } = useAppMenuDropdown(composableParams)
const { developmentBadgeLabel, hasDevelopmentBadge } = useDevelopmentBadge()

const model = computed({
  get () {
    return props.modelValue
  },

  set (value) {
    emits('update:modelValue', value)
  }
})

const behavior = computed(() => screen.untilLarge ? 'mobile' : 'desktop')
const drawerWidth = computed(() => screen.untilLarge ? 320 : 280)
const isMiniMode = computed(() => screen.isLarge && isMini.value && !hasOpenedMenu.value)
const normalizedBrand = computed(() => isMini.value ? props.miniBrand : props.brand)

const classes = computed(() => {
  return {
    brand: {
      'qas-app-menu__brand--spaced': !isMiniMode.value
    },

    content: {
      'qas-app-menu__content--spaced': !isMiniMode.value
    },

    spacedItem: {
      'qas-app-menu__label--spaced': !isMiniMode.value
    }
  }
})

// métodos
function closeDrawer () {
  emits('update:modelValue', false)
}

function getNormalizedPath (path) {
  return path.split('/').filter(Boolean)?.[0]
}

function getPathFromObject ({ path, name }) {
  if (path) return getNormalizedPath(path)

  const resolvedRoute = router.resolve({ name })

  return getNormalizedPath(resolvedRoute.path)
}

function getRouterRedirect ({ to }) {
  return to || ''
}

function hasChildren ({ children }) {
  return !!(children || []).length
}

function hasSeparator (index) {
  return !!props.items[index + 1]
}

function isActive ({ to }) {
  const currentPath = getNormalizedPath(router.currentRoute.value.path)
  const itemPath = typeof to === 'string' ? getNormalizedPath(to) : getPathFromObject(to)

  return currentPath === itemPath
}

function onMouseEvent ({ type }) {
  if (!screen.isLarge) return

  const isMouseLeave = type === 'mouseleave'

  isMini.value = isMouseLeave

  model.value = false
}

function setHasOpenedMenu (value) {
  hasOpenedMenu.value = value
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
    transition: padding 120ms; // 120ms é o mesmo tempo utilizado na abertura do QDrawer.
    will-change: auto;

    &--spaced {
      padding-left: var(--qas-spacing-xl) !important;
      padding-right: var(--qas-spacing-xl) !important;
    }
  }

  &__brand {
    width: 40px;

    &--spaced {
      width: 208px;
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

  &__content + &__content,
  &__content + &__item,
  &__item + &__content {
    margin-top: var(--qas-spacing-sm);
  }

  // User
  .qas-app-user__data {
    line-height: 1.25;
  }

  // Media: untilLarge
  @media (min-width: $breakpoint-sm-max) {
    &__menu {
      max-height: calc(100vh - 310px);
      overflow-x: auto;
    }
  }
}
</style>
