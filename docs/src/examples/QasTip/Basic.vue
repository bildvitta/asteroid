<template>
  <div class="column container flex q-col-gutter-y-md q-my-md">
    <qas-tip text="Texto do tooltip" />

    <qas-tip icon="sym_r_visibility" size="lg" text="Texto do tooltip" />

    <qas-tip color="red" text="Texto do tooltip" />
  </div>
</template>

<script setup>
defineOptions({ name: 'Basic' })
</script>
