<template>
  <qas-drawer v-model="drawerModel" v-bind="drawerProps">
    <template #header>
      <div class="flex items-center justify-between">
        <div class="flex items-center">
          <qas-btn color="grey-10" icon="sym_r_keyboard_double_arrow_right" label="Fechar" @click="closeOverlay" />

          <q-separator class="q-mx-md" vertical />

          <qas-btn color="grey-10" :disable="!hasPreviousRoute" icon="sym_r_keyboard_arrow_left" tooltip="Voltar para página anterior." @click="goBack" />

          <qas-btn color="grey-10" :disable="!hasNextRoute" icon="sym_r_keyboard_arrow_right" tooltip="Ir para próxima página." @click="goForward" />
        </div>

        <qas-btn color="grey-10" icon="sym_r_zoom_out_map" label="Tela cheia" @click="expandToFullPage" />
      </div>
    </template>

    <template #default>
      <router-view name="overlay" />
    </template>
  </qas-drawer>
</template>

<script setup>
import useOverlayNavigation from '../../../ui/src/composables/use-overlay-navigation'

import { ref, provide, watch } from 'vue'
import { useRoute } from 'vue-router'

defineOptions({ name: 'PvLayoutOverlayDrawer' })

// globals
provide('isOverlay', true)

// composables
const route = useRoute()
const {
  closeOverlay,
  expandToFullPage,
  hasNextRoute,
  hasPreviousRoute,
  goBack,
  goForward
} = useOverlayNavigation()

// refs
const drawerModel = ref(false)

// consts
const drawerProps = {
  position: 'right',
  maxWidth: '90%',
  dialogProps: {
    onHide: closeOverlay,
    noRouteDismiss: true
  }
}

// watchers
watch(() => route.query.overlay, overlay => {
  drawerModel.value = overlay === 'true'
}, { immediate: true })
</script>
