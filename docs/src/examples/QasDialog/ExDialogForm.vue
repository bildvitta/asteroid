<template>
  <div class="container q-py-lg">
    <qas-btn @click="toggle">Abrir Dialog</qas-btn>

    <qas-dialog v-model="isDialogOpened" v-bind="dialogProps">
      <template #description>
        <div>
          <qas-input v-model="text" :rules="[value => value.length > 3 || 'error']" />
          <qas-input v-model="text2" :rules="[value => value.length > 3 || 'error']" />
        </div>
      </template>
    </qas-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isDialogOpened: false,
      text: '',
      text2: ''
    }
  },

  computed: {
    dialogProps () {
      return {
        card: {
          title: 'Título do dialog',
          description: 'Cerca elétrica perto do corrimão risco iminente de choque. Código da ordem de serviço: 159488 CRM ID: 1179512'
        },
        useForm: true
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
