<template>
  <div class="container spaced">
    <qas-header-actions class="q-mb-md" v-bind="headerActionsProps" />
  </div>
</template>

<script>
export default {
  computed: {
    headerActionsProps () {
      return {
        text: 'Algum texto de exemplo para ficar ao lado do botão de adicionar.',
        actionsMenuProps: {
          deleteProps: {
            entity: 'users'
          },
          list: {
            add: {
              label: 'Novo usuário',
              icon: 'o_add'
            }
          }
        }
      }
    }
  }
}
</script>
