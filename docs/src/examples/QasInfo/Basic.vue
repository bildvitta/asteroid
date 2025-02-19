<template>
  <div class="container q-py-lg">
    <qas-info v-bind="infoProps" />
  </div>
</template>

<script setup>
const infoProps = {
  text: 'Usuário incompleto, [clique aqui] para completar.',
  routerLinkProps: {
    to: '/start/develop'
  }
}
</script>
