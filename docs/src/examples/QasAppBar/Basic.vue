<template>
  <q-layout>
    <qas-app-bar :app-user-props="appUserProps" title="QasAppBar" />
  </q-layout>
</template>

<script>
const user = {
  photo: 'https://www.abc.net.au/cm/lb/6367016/data/alan2c-see-the-person-data.jpg',
  name: 'Eduardo Lima',
  email: 'eduardolima@gmail.com'
}

export default {
  computed: {
    appUserProps () {
      return {
        companiesOptions: [
          {
            label: 'Empresa 1',
            value: '1'
          },
          {
            label: 'Empresa 2',
            value: '2'
          }
        ],

        currentCompany: '1',
        user
      }
    }
  }
}
</script>
