<template>
  <div class="container spaced">
    <qas-header-actions v-bind="headerActionsProps" />
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
