<template>
  <q-page class="container">
    <qas-dialog-router ref="dialogRouter" />
    <qas-btn @click="$refs.dialogRouter.show({ path: 'test-gallery' })">Abrir pagina em modal</qas-btn>
  </q-page>
</template>
