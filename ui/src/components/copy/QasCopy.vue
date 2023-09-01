<template>
  <span>
    <slot>{{ text }}</slot>

    <qas-btn class="q-ml-xs" color="primary" :icon="icon" :loading="isLoading" variant="tertiary" @click.stop.prevent="copy">
      <q-tooltip>Copiar</q-tooltip>
    </qas-btn>
  </span>
</template>

<script>
import { copyToClipboard } from '../../helpers'

export default {
  name: 'QasCopy',

  props: {
    icon: {
      default: 'sym_r_file_copy',
      type: String
    },

    text: {
      required: true,
      type: String
    }
  },

  data () {
    return {
      isLoading: false
    }
  },

  methods: {
    copy () {
      copyToClipboard(this.text, isLoading => {
        this.isLoading = isLoading
      })
    }
  }
}
</script>
