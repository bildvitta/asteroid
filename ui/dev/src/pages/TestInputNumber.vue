<template>
  <q-page class="container flex flex-center spaced">
    <qas-form-generator v-model="values" :fields="fields" />
    {{ typeof values.quantidade }}
    <qas-field :field="fields[1]" />
  </q-page>
</template>

<script>
export default {
  name: 'TestNumberReturn',

  data () {
    return {
      text: 10,
      fields: [
        {
          name: 'name',
          type: 'string',
          label: 'Nome'
        },
        {
          name: 'quantidade',
          type: 'number',
          label: 'quantidade'
        }
      ],
      values: {}
    }
  }
}
</script>
