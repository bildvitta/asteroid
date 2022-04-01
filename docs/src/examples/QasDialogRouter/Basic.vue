<template>
  <div class="container spaced">
    <qas-dialog-router ref="dialogRouter" />
    <qas-btn @click="$refs.dialogRouter.show({ path: '/' })">Abrir pagina em modal</qas-btn>
  </div>
</template>
