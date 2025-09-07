<template>
  <div class="container spaced">
    <qas-dialog-router ref="dialogRouter" />
    <qas-btn @click="$refs.dialogRouter.show({ path: '/page1' })">Abrir pagina em modal</qas-btn>
  </div>
</template>
