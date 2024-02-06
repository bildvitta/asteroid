<template>
  <div class="container spaced">
    <div class="q-col-gutter-md row">
      <qas-card
        :route="{ name: 'Root'}"
        title="Titulo"
      >
        <template #default>
          <div>
            Meu conteúdo
          </div>
        </template>
      </qas-card>

      <qas-card
        expansion-content="Conteúdo do menu expansivo"
        :route="{ name: 'Root'}"
        title="Titulo"
        use-expansion
      >
        <template #default>
          <div>
            Meu conteúdo
          </div>
        </template>
      </qas-card>

      <qas-card
        :actions-menu-props="actionsMenuProps"
        expansion-content="Conteúdo do menu expansivo"
        :route="{ name: 'Root'}"
        status-color="#c42644"
        title="Titulo"
        use-expansion
      >
        <template #default>
          <div>
            Meu conteúdo
          </div>
        </template>
      </qas-card>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    actionsMenuProps () {
      return {
        show: {
          label: 'Ir para detalhes',
          icon: 'sym_r_visibility'
        },

        edit: {
          label: 'Editar',
          icon: 'sym_r_edit'
        }
      }
    }
  }
}
</script>
