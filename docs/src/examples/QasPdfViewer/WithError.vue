<template>
  <qas-pdf-viewer :url />
</template>

<script setup>
defineOptions({ name: 'WithError' })

const url = 'https://example.com/invalid-pdf-url.pdf'
</script>
