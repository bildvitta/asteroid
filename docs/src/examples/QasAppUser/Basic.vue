<template>
  <div class="q-pa-md">
    <qas-app-user v-bind="props" />
  </div>
</template>

<script>
const user = {
  photo: 'https://www.abc.net.au/cm/lb/6367016/data/alan2c-see-the-person-data.jpg',
  name: 'Eduardo Lima',
  email: 'eduardolima@gmail.com'
}

export default {
  computed: {
    props () {
      return {
        user,
        companyProps: {
          options: [
            {
              label: 'Empresa 1',
              value: '1'
            },
            {
              label: 'Empresa 2',
              value: '2'
            }
          ],

          modelValue: '2'
        }
      }
    }
  }
}
</script>
