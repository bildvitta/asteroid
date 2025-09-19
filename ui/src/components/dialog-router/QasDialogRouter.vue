<template>
  <qas-dialog ref="dialog" v-model="model" max-width="800px" persistent use-full-max-width @hide="onDialogHide">
    <template #description>
      <pre>{{ routesStack }}</pre>
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
import { ref, markRaw, provide, onMounted } from 'vue'
import { useRouter, useRoute, onBeforeRouteLeave } from 'vue-router'

defineOptions({ name: 'QasDialogRouter' })

// models
const model = defineModel({ type: Boolean })

const emit = defineEmits(['error', 'hide'])

provide('dialogRouter', {
  show,
  hide
})

provide('isInsideDialogRouter', true)

defineExpose({ show, hide })

const router = useRouter()
const route = useRoute()

// template refs
const dialog = ref(null)

const counter = ref(0)
const component = ref(null)
const parentRoute = ref('')
const normalizedRoute = ref(null)
const routesStack = ref([])

// hooks

onBeforeRouteLeave((to, from, next) => {
  // if (model.value) {
  //   return next()
  // }
  // history.pushState(null, null, window.location.href)
  next(false)
})
// onBeforeRouteLeave((to, from) => {
//   // Se o dialog estiver aberto, previne a navegação do Vue Router.
//   // O evento "popstate" vai cuidar da lógica de voltar.
//   history.pushState(null, null, to.fullPath)
//   // if (model.value) {
//   //   return true
//   // }

//   return false
//   // if (to.fullPath !== '/components/dialog-router') {

//   //   return false
//   // }

//   // return false
//   // console.log('TCL: to, from', { to, from })
//   // Prevent infinite loop by only allowing navigation if not already leaving dialog route
//   // if (from.path === '/components/dialog-router' && to.path !== from.path) {
//   //   model.value = false
//   //   next()
//   // } else {
//   //   next(from)
//   // }
// })

onMounted(() => {
  window.addEventListener('popstate', onPopState)
})

// functions
function hide () {
  // dialog.value.hide()

  model.value = false

  // quando fechar manualmente, volta para rota original
  if (parentRoute.value && typeof parentRoute.value === 'string') {
    history.replaceState(null, null, parentRoute.value)
  }
}

function onDialogHide () {
  if (history && parentRoute.value) {
    history.replaceState(null, null, parentRoute.value)
  }

  component.value = ''
  parentRoute.value = ''
  normalizedRoute.value = null
  routesStack.value = []

  emit('hide')
}

function getResolvedRoute (path) {
  return router.resolve(path)
}

async function show (routeParam) {
  parentRoute.value = route.fullPath
  normalizedRoute.value = getResolvedRoute(routeParam)

  const hasRouteInStack = routesStack.value.find(routeStack => {
    return getResolvedRoute(routeStack).fullPath === normalizedRoute.value.fullPath
  })

  // console.log("TCL: show -> hasRouteInStack", hasRouteInStack)

  if (!hasRouteInStack) routesStack.value.push(routeParam)

  if (history) {
    console.log('TCL: show -> history', normalizedRoute.value.fullPath)
    // history.replaceState({ dialogOpen: true }, null, normalizedRoute.value.fullPath)
    history.pushState(null, null, normalizedRoute.value.fullPath)
  }

  try {
    Loading.show()

    const dynamicComponent = [...normalizedRoute.value.matched].pop().components.default

    if (typeof dynamicComponent !== 'function') {
      component.value = markRaw(dynamicComponent)
      // dialog.value.show()

      openDialog()
    } else {
      const componentFn = (await dynamicComponent()).default
      component.value = markRaw(componentFn)

      // dialog.value.show()
      openDialog()
    }

    counter.value += 1
  } catch (error) {
    NotifyError('Ops! Erro ao carregar item.')
    emit('error', error)
  } finally {
    Loading.hide()
  }
}

function openDialog () {
  model.value = true
}

function onPopState (event) {
  // console.log('TCL: onPopState -> event.state')
  // console.log('TCL: onPopState -> event', event)
  // console.log("TCL: onPopState -> routesStack.value", routesStack.value)
  // routesStack.value.pop()

  // console.log("TCL: onPopState -> routesStack.value", routesStack.value)
  // if (routesStack.value.length > 0) {
  //   // Volta para a página anterior do dialog
  //   const previousRoute = routesStack.value[routesStack.value.length - 1]
  //   normalizedRoute.value = getResolvedRoute(previousRoute)
  //   show(previousRoute)
  // } else {
  //   // Stack vazio: fecha o dialog e volta para a rota original
  //   // hide()
  // }
}
</script>
