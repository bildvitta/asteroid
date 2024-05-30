<template>
  <keep-alive>
    <q-menu anchor="top right" class="pv-app-menu-help-chat shadow-2" max-width="400px" self="top left" touch-position @before-hide="onBeforeHide">
      <header class="q-pa-md">
        <h3>Bem-vindo!</h3>

        <div class="text-subtitle1">
          Deixe a sua mensagem para o suporte técnico da Nave.
        </div>
      </header>

      <qas-box class="full-width pv-app-menu-help-chat__content relative-position" :class="boxClasses">
        <div v-show="showIframe" ref="chatContent" class="full-width" />

        <q-inner-loading :showing="showInnerLoading">
          <q-spinner color="grey" size="2rem" />
        </q-inner-loading>

        <!-- <keep-alive>
          <component :is="props.iframe" />
        </keep-alive> -->
        <!-- <iframe
          id="chat-iframe"
          class="pv-app-menu-help-chat__iframe"
          src="https://webchat.botframework.com/embed/webchat_nave_desk_ms?s=8o-EXlD3btc.tJ1o1abtwA7eNw2emYJyulBTtYkjF4X6ZpQHP5-iCLw"
        /> -->

        <div v-if="!showIframe" class="full-width self-end">
          <div class="text-subtitle2">
            Estamos conectados
          </div>

          <div class="text-body2">
            Normalmente responde em alguns minutos
          </div>

          <qas-btn class="full-width q-mt-md" label="Iniciar conversa" variant="primary" @click="toggleIframe" />
        </div>
      </qas-box>
    </q-menu>
  </keep-alive>
</template>

<script setup>
// import { ref } from 'vue'
import { onMounted, ref, nextTick, computed } from 'vue'

defineOptions({ name: 'PvAppMenuHelpChat' })

const showIframe = ref(false)
const chatContent = ref(null)
const showInnerLoading = ref(false)

onMounted(() => {
  console.log('AQUI!')
  setIframeInBody()

  window.addEventListener('scroll', onShow)
})

const boxClasses = computed(() => ({ flex: !showIframe.value }))

function onShow () {
  const iframe = getIframe()

  const { bottom, left, top } = chatContent.value.getBoundingClientRect()
  console.log('TCL: onShow -> { bottom, left, top }', { bottom, left, top })

  const styles = {
    display: 'block',
    top: `${bottom + window.scrollY}px`,
    left: `${left + window.scrollX}px`,
    bottom: `${top}px`,
    width: `${chatContent.value.offsetWidth}px`
  }

  Object.assign(iframe.style, styles)
}

function onBeforeHide () {
  const iframe = getIframe()

  iframe.style.display = 'none'
}

function create () {
  const iframe = document.createElement('iframe')
  iframe.id = 'chat-iframe'
  iframe.className = 'pv-app-menu-help-chat__iframe'
  iframe.style.display = 'none'

  return iframe
}

function getIframe () {
  return document.getElementById('chat-iframe')
}

function setIframeInBody () {
  const iframe = create()
  document.body.appendChild(iframe)
}

async function toggleIframe () {
  showIframe.value = !showIframe.value

  showInnerLoading.value = true

  setTimeout(async () => {
    showInnerLoading.value = false
    await nextTick()
    onShow()
  }, 600)
}
</script>

<style lang="scss">
.pv-app-menu-help-chat {
  &__content {
    height: 240px;
    background-color: var(--qas-background-color) !important;
  }

  &__iframe {
    // width: 100%;
    border: 0;
    border-radius: var(--qas-generic-border-radius);
    outline: none;
    position: absolute;
    height: 208px;
    z-index: 9999;
  }

  // &__content {
  //   height: 140px;
  // }
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
