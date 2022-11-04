<template>
  <div class="container q-py-lg">
    <div class="q-my-md">
      <qas-input v-model="companyDocument" label="company-document" mask="company-document" />
      model: {{ companyDocument }}
    </div>
    <div class="q-my-md">
      <qas-input v-model="document" label="document" mask="document" />
      model: {{ document }}
    </div>
    <div class="q-my-md">
      <qas-input v-model="personalDocument" label="personal-document" mask="personal-document" />
      model: {{ personalDocument }}
    </div>
    <div class="q-my-md">
      <qas-input v-model="phone" label="phone" mask="phone" />
      model: {{ phone }}
    </div>
    <div class="q-my-md">
      <qas-input v-model="postalCode" label="postal-code" mask="postal-code" />
      model: {{ postalCode }}
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      companyDocument: '99999999999999',
      document: '99999999999',
      personalDocument: '99999999999',
      phone: '99999999999',
      postalCode: '99999-999',
      teste: ''
    }
  }
}
</script>
