<template>
  <div class="q-col-gutter-md q-pa-md row">
    <qas-card :fields="fields" has-actions :result="result">
      <template #default>
        <div>{{ result.name }}</div>
        <div>{{ result.email }}</div>
      </template>
      <template #actions>
        <q-icon class="col-grow" name="o_edit" />
        <q-icon class="col-grow" name="o_delete" />
        <q-icon class="col-grow" name="o_photo_camera" />
      </template>
    </qas-card>
    <qas-card :fields="fields" :result="result">
      <div>Pequeno texto para testar o slot default do qas-card</div>
    </qas-card>
    <qas-card :fields="fields" has-actions :result="result">
      <template #default>
        <div>{{ result.name }}</div>
        <div>{{ result.email }}</div>
      </template>
      <template #actions>
        <div class="w-full">
          <div class="text-blue text-bold text-center">Ver mais</div>
        </div>
      </template>
    </qas-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      fields: {
        name: { name: 'name', label: 'Full name', type: 'text' },
        images: ['https://englishlive.ef.com/pt-br/blog/wp-content/uploads/sites/16/2014/07/beagle-lindo.jpg']
      },

      result: {
        name: 'John Appleseed',
        email: 'john.appleseed@example.com',
        phone: '99999999999',
        gender: 'Male',
        document: '99999999999',
        address: '747 Austen View'
      }
    }
  }
}
</script>
