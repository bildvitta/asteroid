<template>
  <qas-drawer v-model="drawerModel" v-bind="drawerProps">
    <template #header>
      <div class="flex items-center justify-between">
        <div class="flex items-center">
          <qas-btn color="grey-10" icon="sym_r_keyboard_double_arrow_right" label="Fechar" @click="closeOverlay" />

          <q-separator class="q-mx-md" vertical />

          <qas-btn color="grey-10" icon="sym_r_keyboard_arrow_left" tooltip="Voltar para pagina anterior" />

          <qas-btn color="grey-10" icon="sym_r_keyboard_arrow_right" tooltip="Ir para proxima pagina" />
        </div>

        <qas-btn color="grey-10" icon="sym_r_zoom_out_map" label="Tela cheia" @click="expandToFullPage" />
      </div>

      <pre>{{ { hasPreviousRoute, history: history?.list.length } }}</pre>
    </template>

    <template #default>
      <qas-btn label="navegar" :to="getRoute({ path: 'paginas/not-found' })"></qas-btn>
      <router-view name="overlay" />
      <!-- <q-page-container>
        <q-page>
        </q-page>
      </q-page-container> -->
    </template>
  </qas-drawer>
</template>

<script setup>
import QasDrawer from '../../drawer/QasDrawer.vue'
import QasBtn from '../../btn/QasBtn.vue'

import useOverlayNavigation from '../../../composables/use-overlay-navigation'
import useHistory from '../../../composables/use-history'

import { ref, provide, watch } from 'vue'
import { useRoute } from 'vue-router'

defineOptions({ name: 'PvLayoutOverlayDrawer' })

provide('isOverlay', true)

const route = useRoute()
const { closeOverlay, expandToFullPage, getRoute } = useOverlayNavigation()
const { hasPreviousRoute, history } = useHistory()

const drawerModel = ref(false)

const drawerProps = {
  position: 'right',
  maxWidth: '90%',
  dialogProps: {
    onHide: closeOverlay,
    noRouteDismiss: true
    // persistent: true
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
