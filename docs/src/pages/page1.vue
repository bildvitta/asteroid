<template>
  <div>
    Pagina 1

    <qas-btn label="Abrir dialog" @click="openDialog" />
  </div>
  <!-- <qas-dialog-router ref="dialogRouterRef" /> -->
</template>

<script setup>
import { inject } from 'vue'

const dialogRouter = inject('dialogRouter')

// const dialogRouterRef = ref(null)

function openDialog () {
  dialogRouter.show({ name: 'Page2' })
}
</script>
