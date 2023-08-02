<template>
  <div class="container q-py-lg">
    <qas-btn @click="toggle">Abrir Dialog</qas-btn>

    <qas-dialog v-model="isDialogOpened" v-bind="dialogProps" />
  </div>
</template>

<script>
import DescriptionComponent from './DescriptionComponent'

export default {
  data () {
    return {
      isDialogOpened: false
    }
  },

  computed: {
    dialogProps () {
      return {
        card: {
          description: DescriptionComponent
        }
      }
    }
  },

  methods: {
    toggle () {
      this.isDialogOpened = !this.isDialogOpened
    }
  }
}
</script>
