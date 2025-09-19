<template>
  <div>
    <div>
      Pagina 3
    </div>

    <qas-btn label="Abrir pagina 1" @click="openDialog" />
  </div>
  <!-- <qas-dialog-router ref="dialogRouterRef" /> -->
</template>

<script setup>
import { inject } from 'vue'

const dialogRouter = inject('dialogRouter')

// const dialogRouterRef = ref(null)

function openDialog () {
  dialogRouter.show({ path: '/page2' })
}
</script>
