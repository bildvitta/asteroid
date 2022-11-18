<template>
  <span>
    <slot>{{ text }}</slot>

    <qas-btn class="q-ml-xs" color="grey-7" flat :icon="icon" :loading="isLoading" round :size="size" @click="copy">
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
      default: 'o_file_copy',
      type: String
    },

    size: {
      default: 'xs',
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
