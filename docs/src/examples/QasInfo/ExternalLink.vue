<template>
  <div class="container q-py-lg">
    <qas-info v-bind="infoProps" />
  </div>
</template>

<script setup>
const infoProps = {
  text: '[Clique aqui] para ir para o google.',
  buttonProps: {
    href: 'http://google.com',
    target: '_blank'
  }
}
</script>
