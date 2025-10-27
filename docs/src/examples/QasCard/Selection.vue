<template>
  <div class="container spaced">
    <div class="q-col-gutter-md row">
      <div class="col-4">
        <qas-card v-model:selected="selected" :route="{ name: 'Root' }" title="Titulo" use-selection>
          <template #default>
            <div>
              Meu conteúdo
            </div>
          </template>
        </qas-card>
      </div>

      <div class="col-12">Model: {{ selected }}</div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

defineOptions({ name: 'PageSelection' })

const selected = ref(false)
</script>

<script>
export default {
  computed: {
    actionsMenuProps () {
      return {
        list: {
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
    },

    expansionProps () {
      return {
        label: 'Ver mais',
        content: 'Conteúdo do menu expansivo'
      }
    }
  }
}
</script>
