<template>
  <q-page class="container spaced">
    <qas-delete custom-id="fc411e50-e799-400a-ab25-24f16af532f7" @success="deleteSuccess">
      Deletar
    </qas-delete>
  </q-page>
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
    deleteSuccess () {
      this.$router.push({ name: 'UsersCreate' })
    }
  }
}
</script>
