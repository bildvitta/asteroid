<template>
  <q-page padding>
    <!-- Default -->
    <q-btn @click="openDialogDefault">
      Open Dialog Default
    </q-btn>

    <qas-dialog v-model="isDialogDefault" v-bind="dialogConfigDefault" />

    <!-- Form -->
    <q-btn @click="openDialogForm">
      Open Dialog Form
    </q-btn>

    <router-link to="/single-view">clica aqui</router-link>

    <qas-dialog v-model="isDialogForm" v-bind="dialogConfigForm" use-form @validate="handlerValidate">
      <template #description>
        <qas-input v-model="model.name" label="Nome" :rules="[validateField(model.name, 'Nome é obrigatório')]" />
        <qas-input v-model="model.email" label="E-mail" :rules="[validateField(model.email, 'Nome é obrigatório')]" />
      </template>
    </qas-dialog>
  </q-page>
</template>

<script>
export default {
  data () {
    return {
      isDialogDefault: false,
      isDialogForm: false,

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
    openDialogDefault () {
      this.isDialogDefault = !this.isDialogDefault
    },

    openDialogForm () {
      this.isDialogForm = !this.isDialogForm
    },

    handlerValidate (value) {
      this.isDialogForm = !value
    },

    validateField (value, message) {
      return value => !!value || message
    }
  }
}
</script>
