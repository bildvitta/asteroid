<template>
  <qas-dialog ref="dialog" v-model="model" persistent @hide="onDialogHide">
    <template #description>
      <component :is="component" v-if="component" :route="normalizedRoute" :use-boundary="false" @hide="hide" />
    </template>
    <!-- <q-card class="full-width" style="max-width: 80vw;">
      <q-card-section>

        <qas-btn label="Fechar" v-close-popup></qas-btn>
      </q-card-section>
    </q-card> -->
  </qas-dialog>
</template>

<script setup>
import QasDialog from '../dialog/QasDialog.vue'
import { NotifyError } from '../../plugins'

import { Loading } from 'quasar'
import { ref, markRaw, provide, onMounted, onBeforeUnmount } from 'vue'
import { useRouter, useRoute } from 'vue-router'

defineOptions({ name: 'QasDialogRouter' })

// models
const model = defineModel({ type: Boolean })

const emit = defineEmits(['error', 'hide'])

provide('dialogRouter', {
  show,
  hide
})

defineExpose({ show, hide })

const router = useRouter()
const route = useRoute()

// template refs
const dialog = ref(null)

const component = ref(null)
const parentRoute = ref('')
const normalizedRoute = ref(null)

// hooks
onMounted(() => {
  window.addEventListener('popstate', onPopState)
})

onBeforeUnmount(() => {
  window.removeEventListener('popstate', onPopState)
})

// functions
function hide () {
  // dialog.value.hide()

  model.value = false

  // quando fechar manualmente, volta para rota original
  if (parentRoute.value) {
    history.replaceState(null, null, parentRoute.value)
  }
}

function onPopState (event) {
  if (model.value) {
    // se o dialog está aberto e usuário clicou em voltar
    hide()
  }
}

function onDialogHide () {
  if (history && parentRoute.value) {
    history.replaceState(null, null, parentRoute.value)
  }

  component.value = ''
  parentRoute.value = ''
  normalizedRoute.value = null

  emit('hide')
}

function getResolvedRoute (path) {
  return router.resolve(path)
}

async function show (routeParam) {
  parentRoute.value = route.fullPath
  normalizedRoute.value = getResolvedRoute(routeParam)

  if (history) {
    // history.replaceState(null, null, normalizedRoute.value.fullPath)
    history.pushState({ dialogOpen: true }, null, normalizedRoute.value.fullPath)
    // history.replaceState(null, null, normalizedRoute.value.fullPath)
  }

  try {
    Loading.show()

    const dynamicComponent = [...normalizedRoute.value.matched].pop().components.default

    if (typeof dynamicComponent !== 'function') {
      component.value = dynamicComponent
      // dialog.value.show()

      openDialog()
    } else {
      const componentFn = (await dynamicComponent()).default
      console.log('TCL: show -> componentFn', componentFn)
      component.value = markRaw(componentFn)

      // dialog.value.show()
      openDialog()
    }
  } catch (error) {
    console.log('TCL: show -> error', error)
    NotifyError('Ops! Erro ao carregar item.')
    emit('error', error)
  } finally {
    Loading.hide()
  }
}

function openDialog () {
  model.value = true
}
</script>
