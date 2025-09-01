<template>
  <div class="container q-py-lg">
    <qas-actions :buttons-props />
  </div>
</template>

<script setup>
defineOptions({ name: 'WithTertiary' })

const buttonsProps = {
  primary: {
    label: 'Primário',
    onClick: () => alert('Botão primário clicado')
  },

  secondary: {
    label: 'Secundário',
    onClick: () => alert('Botão secundário clicado')
  },

  tertiary: {
    label: 'Terciário',
    onClick: () => alert('Botão terciário clicado')
  }
}
</script>
