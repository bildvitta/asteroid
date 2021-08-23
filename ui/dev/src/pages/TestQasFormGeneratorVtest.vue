<template>
  <qas-form-generator v-model="result" :fields="fields" />
</template>

<script>
export default {
  name: 'TestFormGenerator',

  computed: {
    fields () {
      return {
        name: {
          name: 'name',
          label: 'Full name',
          type: 'select',
          options: [
            {
              label: 'Hora',
              value: 'hour'
            },
            {
              label: 'Dia',
              value: 'day'
            },
            {
              label: 'Semana',
              value: 'week'
            },
            {
              label: 'Mês',
              value: 'month'
            }
          ]
        },
        email: {
          name: 'email',
          label: 'E-mail',
          type: 'email'
        },
        phone: {
          name: 'phone',
          label: 'Phone',
          type: 'text',
          mask: 'phone'
        },
        gender: {
          name: 'gender',
          label: 'Gender',
          type: 'text'
        },
        document: {
          name: 'document',
          label: 'Document',
          type: 'text',
          mask: 'document'
        },
        address: {
          name: 'address',
          label: 'Address',
          type: 'text'
        }
      }
    },

    result () {
      return {
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

fields : {
  name : {
    name : "name"
    label : "Full name"
    type : "text"
  }
  email : {
    name : "email"
    label : "E-mail"
    type : "email"
  }
  phone : {
    name : "phone"
    label : "Phone"
    type : "text"
    mask : "phone"
  }
  gender : {
    name : "gender"
    label : "Gender"
    type : "text"
  }
  document : {
    name : "document"
    label : "Document"
    type : "text"
    mask : "document"
  }
  address : {
    name : "address"
    label : "Address"
    type : "text"
  }
}
