<template>
  <div class="container spaced">
    <qas-uploader v-model="model" v-bind="uploaderProps" />
    <pre>{{ model }}</pre>
  </div>
</template>

<script setup>
import { ref } from 'vue'

defineOptions({ name: 'WithError' })

const model = ref(['https://placehold.co/600x400/orange/white?text=img1', 'https://placehold.co/600x400/orange/red?text=img1'])

const uploaderProps = {
  entity: 'serviceOrders',

  error: true,

  errorMessage: 'Campo obrigatório.',

  addButtonLabel: 'Botão de adicionar',

  headerProps: {
    labelProps: {
      label: 'Label personalizado'
    },

    description: 'Descrição personalizada',

    actionsMenuProps: {
      list: {
        share: {
          icon: 'sym_r_share',
          label: 'Botão de compartilhar'
        }
      }
    }
  }
}
</script>
