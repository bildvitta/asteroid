<template>
  <qas-drawer v-model="drawerModel" v-bind="drawerProps">
    <!-- <q-page-container>
      <q-page> -->
    <router-view name="overlay" />
    <!-- </q-page>
    </q-page-container> -->
  </qas-drawer>
</template>

<script setup>
import QasDrawer from '../../drawer/QasDrawer.vue'

import useOverlayNavigation from '../../../composables/use-overlay-navigation'

import { ref, provide, watch } from 'vue'
import { useRoute } from 'vue-router'

defineOptions({ name: 'PvLayoutOverlayDrawer' })

provide('isOverlay', true)

const route = useRoute()
const { closeOverlay } = useOverlayNavigation()

const drawerModel = ref(false)

const drawerProps = {
  position: 'right',
  dialogProps: {
    onHide: closeOverlay,
    persistent: true
  }
}

watch(() => route.query.overlay, newValue => {
  // Configura os componentes baseado na query overlay
  if (newValue === 'true') {
    drawerModel.value = true
  } else {
    drawerModel.value = false
  }
}, { immediate: true })
</script>
