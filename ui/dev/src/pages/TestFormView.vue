<template>
  <qas-form-view v-model="values" v-model:errorsModel="errors" v-model:fieldsModel="fields" class="container spaced" entity="users" mode="create">
    <template #default>
      <pre>{{ errors }}</pre> aquiiii
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
  }
}
</script>
