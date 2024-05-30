<template>
  <q-menu class="pv-app-menu-help-chat shadow-2" v-bind="menuProps">
    <header class="q-pa-md">
      <q-img class="q-mb-md" :src="props.miniBrand" width="36px" />

      <h3 class="text-h3">
        Bem-vindo!
      </h3>

      <div class="text-body1">
        Deixe a sua mensagem para o suporte técnico da Nave.
      </div>
    </header>

    <qas-box class="full-width pv-app-menu-help-chat__content relative-position" :class="boxClasses">
      <div v-if="showIframe" ref="chatContent" class="full-width" />

      <div v-else class="full-width self-end">
        <div class="q-mb-sm text-subtitle2">
          Estamos conectados
        </div>

        <div class="text-body2">
          Normalmente responde em alguns minutos
        </div>

        <qas-btn class="full-width q-mt-lg" label="Iniciar conversa" variant="primary" @click="initializeChat" />
      </div>

      <q-inner-loading :showing="showInnerLoading">
        <q-spinner color="grey" size="2rem" />
      </q-inner-loading>
    </qas-box>
  </q-menu>
</template>

<script setup>
import { useScreen } from '../../../composables'

import { onUnmounted, ref, nextTick, computed } from 'vue'

defineOptions({ name: 'PvAppMenuHelpChat' })

const props = defineProps({
  link: {
    type: String,
    default: ''
  },

  miniBrand: {
    type: String,
    default: ''
  }
})

const screen = useScreen()

const chatContent = ref(null)
const isOpened = ref(false)
const showIframe = ref(false)
const showInnerLoading = ref(false)

const boxClasses = computed(() => {
  return {
    flex: !showIframe.value,
    'pv-app-menu-help-chat__content--is-opened': showIframe.value
  }
})

const menuProps = computed(() => {
  return {
    anchor: screen.isSmall ? 'top middle' : 'top right',
    maxWidth: screen.isSmall ? '300px' : '400px',
    self: screen.isSmall ? 'bottom middle' : 'top left',
    touchPosition: !screen.isSmall,

    onBeforeHide,
    onShow
  }
})

onUnmounted(() => {
  if (showIframe.value) {
    window.removeEventListener('scroll', onScroll)
    window.removeEventListener('resize', onScroll)
  }
})

function setIframeStyle () {
  const iframe = getIframe()

  if (!iframe) return

  const { bottom, left, top } = chatContent.value.getBoundingClientRect()

  const width = chatContent.value.offsetWidth

  const styles = {
    display: 'block',
    top: `${bottom + window.scrollY}px`,
    left: `${left + window.scrollX}px`,
    bottom: `${top}px`,
    width: `${width}px`
  }

  Object.assign(iframe.style, styles)
}

function onShow () {
  isOpened.value = true

  if (showIframe.value) setIframeStyle()
}

function onBeforeHide () {
  isOpened.value = false

  const iframe = getIframe()

  if (!iframe) return

  iframe.style.display = 'none'
}

function onScroll () {
  if (isOpened.value) setIframeStyle()
}

function createIframe () {
  const iframe = document.createElement('iframe')

  iframe.id = 'chat-iframe'
  iframe.className = 'pv-app-menu-help-chat__iframe'
  iframe.style.display = 'none'
  iframe.src = props.link

  document.body.appendChild(iframe)
}

function getIframe () {
  return document.getElementById('chat-iframe')
}

function initializeChat () {
  createIframe()

  window.addEventListener('scroll', onScroll)
  window.addEventListener('resize', onScroll)

  toggleIframe()
}

function toggleIframe () {
  showIframe.value = !showIframe.value

  showInnerLoading.value = true

  /**
   * É adicionado um loading por 3 motivos:
   * - o iframe demora um pouco para ser carregado
   * - o loading é um feedback visual para o usuário enquanto o iframe é carregado
   * - não é possível adicionar uma animação aparecendo o iframe, então desta
   * forma fica suavizado
   */
  setTimeout(async () => {
    showInnerLoading.value = false

    await nextTick()

    onShow()
  }, 2000)
}
</script>

<style lang="scss">
.pv-app-menu-help-chat {
  overflow-y: hidden;

  &__content {
    height: 260px;
    background-color: var(--qas-background-color) !important;
  }

  &__iframe {
    border: 0;
    border-radius: var(--qas-generic-border-radius);
    outline: none;
    position: absolute;
    height: calc(260px - calc(var(--qas-spacing-md) * 2));
    z-index: 9999;
  }

  // Media: isSmall
  @media (max-width: $breakpoint-sm-min) {
    &__content--is-opened {
      padding: var(--qas-spacing-sm) !important;
    }
  }
}
</style>
