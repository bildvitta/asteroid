<template>
  <div class="q-pa-md" style="width: 150px;">
    <qas-btn icon-right="sym_r_person" label="Aqui esta o meu texto" use-ellipsis />
  </div>
</template>

<script>
export default {
  methods: {
    onClick () {
      alert('Fui clicado.')
    }
  }
}
</script>
