<template>
  <div class="container spaced">
    <qas-header-actions class="q-mb-md" v-bind="headerActionsProps" />
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus sint labore ipsum autem laboriosam. Ipsum officia magni dolorum libero vero blanditiis? Laudantium aspernatur tenetur accusamus excepturi vel placeat, nemo iure?
  </div>
</template>

<script>
export default {
  computed: {
    headerActionsProps () {
      return {
        description: 'Algum texto de exemplo para ficar ao lado do botão de adicionar.',
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
