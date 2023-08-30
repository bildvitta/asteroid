<template>
  <div class="container q-py-lg">
    <qas-text-truncate dialog-title="Aqui está meu título!" :list="list" use-counter-mode />
  </div>
</template>

<script>
export default {

  computed: {
    list () {
      return [
        'Primeiro item com um texto bem grande que vai ser cortado e vai aparecer um botão para ver mais',
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
