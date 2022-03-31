<template>
  <q-page class="container spaced">
    <qas-table-generator :columns="columns" :fields="fields" :results="results" />
  </q-page>
</template>

<script>
export default {
  data () {
    return {
      columns: ['name', 'email', 'phone', 'gender', 'document', 'address'],
      fields: {
        name: { name: 'name', label: 'Full name', type: 'text' },
        email: { name: 'email', label: 'E-mail', type: 'email' },
        phone: { name: 'phone', label: 'Phone', type: 'text', mask: 'phone' },
        gender: { name: 'gender', label: 'Gender', type: 'text' },
        document: {
          name: 'document',
          label: 'Document',
          type: 'text',
          mask: 'document'
        },
        address: { name: 'address', label: 'Address', type: 'text' }
      },
      results: [
        {
          name: 'John Appleseed 1',
          email: 'john.appleseed1@example.com',
          phone: '99999999999',
          gender: 'male',
          document: '99999999999',
          address: '747 Austen View'
        },
        {
          name: 'John Appleseed 2',
          email: 'john.appleseed2@example.com',
          phone: '',
          gender: 'male',
          document: '99999999999',
          address: '747 Austen View'
        },
        {
          name: 'John Appleseed 3',
          email: 'john.appleseed3@example.com',
          phone: '99999999999',
          gender: 'male',
          document: '',
          address: '747 Austen View'
        }
      ]
    }
  }
}
</script>
