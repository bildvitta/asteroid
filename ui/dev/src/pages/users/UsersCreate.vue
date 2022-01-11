<template>
  <qas-form-view v-model="values" class="container spaced" entity="users">
    <template #header>
      <qas-page-header no-breadcrumbs :title="title" />
    </template>

    <template #default="{ fields, errors }">
      <qas-form-generator v-model="values" :errors="errors" :fields="fields" />
    </template>
  </qas-form-view>
</template>

<script>
export default {
  data () {
    return {
      values: {}
    }
  },

  computed: {
    title () {
      return 'Criar'
    }
  }
}
</script>
