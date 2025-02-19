<template>
  <div class="container q-py-lg">
    <qas-info v-bind="infoProps" />
  </div>
</template>

<script setup>
const infoProps = {
  avatarProps: {
    color: 'primary'
  },

  buttonProps: {
    onClick: () => alert('Button clicked')
  },

  text: 'Usuário incompleto, [clique aqui] para completar.'
}
</script>
