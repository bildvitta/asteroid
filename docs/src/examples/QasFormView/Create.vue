<template>
  <!-- Descartar essa div -->
  <div class="container spaced">
    <qas-form-view v-model="values" v-model:errors="errors" v-model:fields="fields" :cancel-route="cancelRoute" :entity="entity" @submit-success="onSubmitSuccess">
      <template #header>
        <qas-page-header :breadcrumbs="breadcrumbs" title="Novo usuário" />
      </template>

      <template #filter>
        <div class="bg-positive q-my-lg q-pa-lg">
          Template do filter.
        </div>
      </template>

      <template #default>
        <div>
          <qas-form-generator v-model="values" :errors="errors" :fields="fields" />

          <qas-uploader v-model="values.uploader" entity="serviceOrders" :fields="{ name: { name: 'name', type: 'text', label: 'eae' } } " :grid-generator-props="{ fields: { name: { name: 'name', type: 'text', label: 'E-mail' } } }" label="Meu uploader" :multiple1="true" use-object-model />
        </div>
      </template>
    </qas-form-view>

    v-model: <qas-debugger :inspect="[values]" />

    <qas-box v-if="isFormSubmitted">Item foi criado com sucesso!</qas-box>
  </div>
</template>

<script>
export default {
  name: 'UsersList',

  data () {
    return {
      fields: {},
      errors: {},
      values: {
        uploader: {
          // format: 'image/jpeg',
          // url: 'https://s3.amazonaws.com/uploads.assistencia-digital.nave.dev/uploads/v2/development/serviceOrders/d5648a15-c66f-401a-9c97-0a55efda0b72.jpg',
          // name: 'teste-2 (5th copy).jpg'
        }
      },
      metadata: {},
      isFormSubmitted: false
    }
  },

  computed: {
    entity () {
      return 'serviceOrders'
    },

    cancelRoute () {
      return '/'
    },

    breadcrumbs () {
      return [
        {
          label: 'Início',
          route: { path: '/' }
        },
        {
          label: 'Algum caminho',
          route: { path: '/' }
        },
        {
          label: 'Users'
        }
      ]
    }
  },

  methods: {
    onSubmitSuccess () {
      this.isFormSubmitted = true
    }
  }
}
</script>
