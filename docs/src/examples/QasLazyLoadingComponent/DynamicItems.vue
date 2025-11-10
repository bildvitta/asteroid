<template>
  <div class="container spaced">
    <qas-lazy-loading-component placeholder-height="300px">
      <qas-box v-for="(_, itemIndex) in 20" :key="itemIndex" class="col-6 q-mb-lg" :style="styleBox">
        Box {{ itemIndex + 1 }}
      </qas-box>
    </qas-lazy-loading-component>
  </div>
</template>

<script setup>
defineOptions({ name: 'DynamicItems' })

// constants
const styleBox = { height: '500px' }
</script>
