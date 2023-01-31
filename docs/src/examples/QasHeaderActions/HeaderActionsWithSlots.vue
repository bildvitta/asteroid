<template>
  <div class="container spaced">
    <qas-header-actions>
      <template #left>
        Slot da esquerda!
      </template>

      <template #right>
        Slot da direita!
      </template>
    </qas-header-actions>
  </div>
</template>

<script>
export default {
  computed: {
    headerActionsProps () {
      return {
        text: 'Algum texto de exemplo para ficar ao lado do botão de adicionar.',
        buttonProps: {
          icon: 'sym_r_add',
          label: 'Novo usuário'
        }
      }
    }
  }
}
</script>
