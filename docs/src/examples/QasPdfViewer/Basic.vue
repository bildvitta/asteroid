<template>
  <qas-pdf-viewer :url />
</template>

<script setup>
defineOptions({ name: 'Basic' })

const url = 'https://pdfobject.com/pdf/sample.pdf'
</script>
