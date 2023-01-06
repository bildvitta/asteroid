<template>
  <div class="container q-py-lg">
    <qas-actions-menu :list="list">
      <template #visibility="{ item }">
        <div class="q-pa-md">
          item: <qas-debugger :inspect="[item]" />
        </div>
      </template>
    </qas-actions-menu>
  </div>
</template>

<script>
export default {
  computed: {
    list () {
      return {
        visibility: {
          icon: 'sym_r_visibility',
          label: 'Visualizar',
          handler: () => alert('handler ativado')
        }
      }
    }
  }
}
</script>
