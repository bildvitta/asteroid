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
            },
            {
              label: 'Empresa 3',
              value: '3'
            },
            {
              label: 'Empresa 4',
              value: '4'
            },
            {
              label: 'Empresa 5',
              value: '5'
            },
            {
              label: 'Empresa 6',
              value: '6'
            },
            {
              label: 'Empresa 7',
              value: '7'
            },
            {
              label: 'Empresa 8',
              value: '8'
            },
            {
              label: 'Empresa 9',
              value: '9'
            },
            {
              label: 'Empresa 10',
              value: '10'
            }
          ],

          modelValue: '2'
        }
      }
    }
  }
}
</script>
