<template>
  <div>
    Pagina 2

    <qas-btn label="Abrir pagina 1" @click="openDialog" />
  </div>
  <!-- <qas-dialog-router ref="dialogRouterRef" /> -->
</template>

<script setup>
import { inject } from 'vue'

const dialogRouter = inject('dialogRouter')

console.log('fui chamado')

// const dialogRouterRef = ref(null)

function openDialog () {
  dialogRouter.show({ path: '/page1' })
}
</script>
