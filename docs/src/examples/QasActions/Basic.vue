<template>
  <div class="container q-py-lg">
    <qas-actions v-bind="buttonsProps" />
  </div>
</template>

<script setup>
defineOptions({ name: 'Basic' })

const buttonsProps = {
  primaryButtonProps: {
    label: 'Botão primário',
    onClick: () => alert('Botão primário clicado')
  },

  secondaryButtonProps: {
    label: 'Botão secundário',
    onClick: () => alert('Botão secundário clicado')
  }
}
</script>
