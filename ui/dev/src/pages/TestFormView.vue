<template>
  <qas-form-view v-model="values" v-model:errorsModel="errors" v-model:fieldsModel="fields" class="container" entity="users" :ignore-keys-in-unsaved-changes="[]" mode="replace" @submit-success="submitSuccess" @update:fields-model="update">
    <template #default>
      <pre>{{ values }}</pre> aquiiii
      <qas-btn @click="createEvent">Redirecionar</qas-btn>
      <qas-btn @click="$router.push('/test-dialog')">Redirecionar 2</qas-btn>
      <qas-form-generator v-model="values" :errors="errors" :fields="fields" />
    </template>
  </qas-form-view>
</template>

<script>
export default {
  data () {
    return {
      errors: {},
      model: '',
      fields2: {},
      fields: {},
      values: {}
    }
  },

  methods: {
    update (value) {
      console.log(value, 'value')
    },

    createEvent () {
      const event = new CustomEvent('delete-success', {
        bubbles: false,
        cancelable: false,
        detail: {
          entity: 'users',
          id: this.$route?.params?.id
        }
      })

      window.dispatchEvent(event)
      this.$router.push('/users/new')
    },

    submitSuccess () {
      this.$router.push({ name: 'UsersCreate' })
    }
  }
}
</script>
