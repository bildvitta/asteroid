<template>
  <q-page padding>
    <!-- Default -->
    <q-btn @click.native="showDialogDefault = true">
      Open Dialog Default
    </q-btn>

    <qas-dialog v-model="showDialogDefault" v-bind="dialogConfigDefault" />

    <!-- Form -->
    <q-btn @click.native="showDialogForm = true">
      Open Dialog Form
    </q-btn>

    <qas-dialog v-model="showDialogForm" v-bind="dialogConfigForm" use-form @validate="handlerValidate">
      <template v-slot:description>
        <qas-input v-model="model.name" label="Nome" :rules="[val => !!val || 'Nome é obrigatório']" />
        <qas-input v-model="model.email" label="E-mail" :rules="[val => !!val || 'E-mail é obrigatório']" />
      </template>
    </qas-dialog>
  </q-page>
</template>

<script>
export default {
  data () {
    return {
      showDialogDefault: false,
      showDialogForm: false,
      model: {
        name: '',
        email: ''
      }
    }
  },

  computed: {
    dialogConfigDefault () {
      return {
        cancel: {
          props: { label: 'Cancel', outline: true }
        },

        card: {
          description: 'This is a description.',
          title: 'This is a title.'
        },

        ok: {
          props: { label: 'Ok, thanks!' }
        }
      }
    },
    dialogConfigForm () {
      return {
        cancel: {
          props: { label: 'Cancel', outline: true }
        },

        ok: {
          props: { label: 'Send' }
        }
      }
    }
  },
  methods: {
    handlerValidate (value) {
      this.showDialogForm = !value
    }
  }
}
</script>

<style lang="sass" scoped>
.directive-target
  width: 50px
  height: 50px
</style>
