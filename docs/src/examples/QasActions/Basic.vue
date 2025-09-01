<template>
  <div class="container q-py-lg">
    <qas-actions :buttons-props />
  </div>
</template>

<script setup>
defineOptions({ name: 'Basic' })

const buttonsProps = {
  primary: {
    label: 'Botão primário',
    onClick: () => alert('Botão primário clicado')
  },

  secondary: {
    label: 'Botão secundário',
    onClick: () => alert('Botão secundário clicado')
  }
}
</script>
