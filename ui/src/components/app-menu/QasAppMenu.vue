<template>
  <div class="qas-app-menu">
    <q-drawer :key="reRenderCount" v-model="model" :behavior="behavior" class="shadow-2" :mini="isMiniMode" :mini-width="88" show-if-above :width="drawerWidth" @mouseenter="onMouseEvent" @mouseleave="onMouseEvent">
      <div class="column full-height justify-between no-wrap">
        <div class="full-width">
          <!-- Brand -->
          <div v-if="!screen.untilLarge" class="q-mb-xl q-pt-xl qas-app-menu__label" :class="classes.spacedItem">
            <router-link class="column flex items-center justify-center relative-position text-no-decoration" :to="rootRoute">
              <q-img v-if="normalizedBrand" :alt="props.title" class="qas-app-menu__brand qas-app-menu__label" fit="contain" height="27px" img-class="qas-app-menu__brand-img" no-spinner :src="normalizedBrand" />

              <span v-else-if="!isMiniMode" class="ellipsis text-bold text-primary text-subtitle2">{{ props.title }}</span>

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
          <q-list v-if="props.items.length" class="q-mt-xl qas-app-menu__menu text-grey-10" :class="menuClasses">
            <template v-for="(menuItem, index) in props.items">
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

              <!-- quando tem children vazio, não deve mostrar label do item, e a label do item
              não tem "to", então validar se tem "to" para mostrar o item -->
              <q-item v-else-if="menuItem.to" :key="index" :active="isActive(menuItem)" active-class="q-router-link--active" class="qas-app-menu__item" :to="getRouterRedirect(menuItem)">
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

        <div v-if="showAppUser">
          <!-- Chat Ajuda -->
          <q-list v-if="useChat" class="q-mt-xl">
            <q-item class="q-mb-md text-primary" clickable @click="toggleChat">
              <q-item-section avatar>
                <q-icon name="sym_r_chat" />
              </q-item-section>

              <q-item-section>
                <q-item-label>
                  <div class="ellipsis text-subtitle2">
                    Solicitar ajuda
                  </div>
                </q-item-label>
              </q-item-section>
            </q-item>
          </q-list>

          <!-- User -->
          <div class="full-width q-pb-lg q-px-lg">
            <qas-app-user v-bind="defaultAppUserProps" />
          </div>
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
import { useAuthUser } from '../../composables/private'

import { handleProcess } from '../../helpers'

import Gleap from 'gleap'
import { ref, computed, watch, onMounted } from 'vue'
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
  },

  useChat: {
    type: Boolean
  }
})

const emit = defineEmits(['sign-out', 'update:modelValue', 'toggle-notifications'])

const screen = useScreen()
const router = useRouter()

const { toggleChat } = useChatMenu()

const rootRoute = router.hasRoute('Root') ? { name: 'Root' } : { path: '/' }

const hasOpenedMenu = ref(false)
const hasOpenedHelpChat = ref(false)
const isMini = ref(screen.isLarge)
const reRenderCount = ref(0)

const composableParams = {
  props,
  onMenuUpdate: setHasOpenedMenu,
  onSignOut: () => emit('sign-out'),
  onToggleNotifications: () => emit('toggle-notifications')
}

const { defaultAppUserProps, showAppUser } = useAppUser(composableParams)
const { appMenuDropdownProps, showAppMenuDropdown } = useAppMenuDropdown(composableParams)
const { developmentBadgeLabel, hasDevelopmentBadge } = useDevelopmentBadge()

const model = computed({
  get () {
    return props.modelValue
  },

  set (value) {
    emit('update:modelValue', value)
  }
})

const behavior = computed(() => screen.untilLarge ? 'mobile' : 'desktop')
const drawerWidth = computed(() => screen.untilLarge ? 320 : 280)
const normalizedBrand = computed(() => isMini.value ? props.miniBrand : props.brand)

const isMiniMode = computed(() => {
  return screen.isLarge && isMini.value && !hasOpenedMenu.value && !hasOpenedHelpChat.value
})

const menuClasses = computed(() => ({ 'qas-app-menu__menu--spaced': !props.useChat }))

const classes = computed(() => {
  return {
    content: {
      'qas-app-menu__content--spaced': !isMiniMode.value
    },

    spacedItem: {
      'qas-app-menu__label--spaced': !isMiniMode.value
    }
  }
})

/**
 * @desc Recurso tecnológico temporário (ou definitivo), este bug ocorre por conta
 * da atualização do vue para a versão `v3.4+`, onde tiveram mudanças referentes a
 * reatividade, existem issues abertas no Quasar, porém sem expectativas
 * de que um dia será resolvido por parte deles.
 *
 * @see {@link https://github.com/quasarframework/quasar/issues/16651}
 */
watch(() => behavior.value, value => {
  /**
   * @desc quando o comportamento passa a ser desktop novamente é porque aconteceu um
   * resize na pagina, então é necessário renderizar o componente QDrawer novamente.
   */
  if (value === 'desktop') {
    reRenderCount.value += 1
  }
})

// métodos
function closeDrawer () {
  emit('update:modelValue', false)
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
  // quando o children vem vazio, "to" é "undefined", então precisa ser feito esta trativa.
  if (!to) return false

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

// composables definitions
function useChatMenu () {
  // composables
  const { user, hasUser } = useAuthUser()

  // consts
  const isMeVersionTwo = process.env.ME_VERSION === 2

  // hooks
  onMounted(initializeChat)

  // functions
  function initializeChat () {
    const gleapEnv = handleProcess(() => process.env.GLEAP)

    if (!props.useChat || !gleapEnv || !hasUser.value) return

    Gleap.initialize(gleapEnv)
    Gleap.setLanguage('pt-BR')

    const {
      uuid,
      name,
      email,
      callingCode,
      phone,
      companyLink,
      companyLinksOptions,
      mainCompanyOptions, // somente na v2
      currentMainCompany // somente na v2
    } = user.value

    const companyId = isMeVersionTwo ? currentMainCompany : companyLink
    const companyNameList = isMeVersionTwo ? mainCompanyOptions : companyLinksOptions
    const companyName = companyNameList?.find(({ value }) => value === companyId)?.label

    Gleap.identify(uuid, {
      name,
      email,
      phone: `${callingCode || '55'}${phone}`,
      companyId,
      companyName
    })
  }

  function toggleChat () {
    Gleap.isOpened() ? Gleap.close() : Gleap.open()
  }

  return {
    initializeChat,
    toggleChat
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
    transition: padding 120ms; // 120ms é o mesmo tempo utilizado na abertura do QDrawer.
    will-change: auto;

    &--spaced {
      padding-left: var(--qas-spacing-xl) !important;
      padding-right: var(--qas-spacing-xl) !important;
    }
  }

  &__brand {
    :deep(.qas-app-menu__brand-img) {
      transition: opacity 120ms ease-in; // 120ms é o mesmo tempo utilizado na abertura do QDrawer.
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
      overflow-x: hidden;

      &:not(&--spaced) {
        max-height: calc(100vh - 365px);
      }
    }

    &__menu--spaced {
      max-height: calc(100vh - 310px);
    }
  }
}
</style>
