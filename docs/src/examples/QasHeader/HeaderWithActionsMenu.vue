<template>
  <div class="container spaced">
    <qas-header class="q-mb-md" v-bind="headerProps" />
  </div>
</template>

<script>
export default {
  computed: {
    headerProps () {
      return {
        description: 'Algum texto de exemplo para ficar ao lado do botão de adicionar.',
        actionsMenuProps: {
          deleteProps: {
            entity: 'users'
          },
          list: {
            add: {
              label: 'Novo usuário',
              icon: 'sym_r_add'
            }
          }
        }
      }
    }
  }
}
</script>
