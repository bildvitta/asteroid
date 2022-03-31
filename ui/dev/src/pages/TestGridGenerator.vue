<template>
  <q-page class="container spaced">
    <qas-box>
      <qas-grid-generator :fields="fields" :result="result" />
    </qas-box>
  </q-page>
</template>

<script>
export default {
  data () {
    return {
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
      result: {
        name: 'John Appleseed',
        email: 'john.appleseed@example.com',
        phone: '99999999999',
        gender: 'male',
        document: '',
        address: '747 Austen View'
      }
    }
  }
}
</script>
