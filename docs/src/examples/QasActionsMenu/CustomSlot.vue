<template>
  <div class="container q-py-lg">
    <qas-actions-menu label="configurações" :list="list">
      <template #delete="{ item }">
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
        delete: {
          icon: 'o_delete',
          label: 'Delete',
          handler: () => alert('handler ativado')
        }
      }
    }
  }
}
</script>
