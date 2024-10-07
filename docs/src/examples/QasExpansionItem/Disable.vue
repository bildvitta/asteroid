<template>
  <div class="container spaced">
    <qas-expansion-item label="John Doe">
      <template #content>
        Meu conteúdo customizado
      </template>
      <!-- <template #header>
        Meu conteúdo customizado
      </template> -->
    </qas-expansion-item>
  </div>
</template>

<script setup>
defineOptions({ name: 'Disable' })

</script>
