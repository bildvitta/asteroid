<template>
  <div class="container q-py-lg">
    <qas-actions-menu label="configurações" :list="list">
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
          icon: 'o_visibility',
          label: 'Visualizar',
          handler: () => alert('handler ativado')
        }
      }
    }
  }
}
</script>
