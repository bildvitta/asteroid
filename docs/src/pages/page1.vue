<template>
  <div>
    <div>
      Pagina 1
    </div>

    <qas-btn label="Abrir pagina 2" @click="openDialog" />
  </div>
  <!-- <qas-dialog-router ref="dialogRouterRef" /> -->
</template>

<script setup>
import { inject } from 'vue'

const dialogRouter = inject('dialogRouter', {})
const isInsideDialogRouter = inject('isInsideDialogRouter', false)

// const dialogRouterRef = ref(null)

function openDialog () {
  if (isInsideDialogRouter) dialogRouter.show({ name: 'Page2' })
}

</script>
