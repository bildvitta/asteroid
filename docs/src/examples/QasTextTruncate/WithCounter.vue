<template>
  <div class="container q-py-lg">
    <qas-text-truncate class="text-negative" dialog-title="Aqui está meu título!" :list="list" :max-visible-item="3" />
  </div>
</template>

<script>
export default {
  computed: {
    list () {
      return [
        'Primeiro item',
        'Segundo item',
        'Terceiro item',
        'Quarto item',
        'Quinto item',
        'Sexto item'
      ]
    }
  }
}
</script>
