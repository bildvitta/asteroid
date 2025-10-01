<template>
  <qas-drawer v-model="drawerModel" v-bind="drawerProps">
    <template #header>
      <div class="flex items-center justify-between">
        <div class="flex items-center">
          <qas-btn color="grey-10" icon="sym_r_keyboard_double_arrow_right" label="Fechar" @click="closeOverlay" />

          <q-separator class="q-mx-md" vertical />

          <qas-btn color="grey-10" :disable="!hasPreviousRoute" icon="sym_r_keyboard_arrow_left" tooltip="Voltar para pagina anterior" @click="goBack" />

          <qas-btn color="grey-10" :disable="!hasNextRoute" icon="sym_r_keyboard_arrow_right" tooltip="Ir para proxima pagina" @click="goForward" />
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
import QasDrawer from '../../drawer/QasDrawer.vue'
import QasBtn from '../../btn/QasBtn.vue'

import useOverlayNavigation from '../../../composables/use-overlay-navigation'

import { ref, provide, watch } from 'vue'
import { useRoute } from 'vue-router'

defineOptions({ name: 'PvLayoutOverlayDrawer' })

provide('isOverlay', true)

const route = useRoute()
const {
  closeOverlay,
  expandToFullPage,
  hasNextRoute,
  hasPreviousRoute,
  goBack,
  goForward
} = useOverlayNavigation()

const drawerModel = ref(false)

const drawerProps = {
  position: 'right',
  maxWidth: '90%',
  dialogProps: {
    onHide: closeOverlay,
    noRouteDismiss: true
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
