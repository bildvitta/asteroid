<template>
  <div class="q-pa-md">
    <qas-app-user :companies-options="[{ label: 'Opção', value: '1' }, { label: 'Opção 2', value: '2' }]" current-company="1" :user="user" />
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
    user () {
      return user
    }
  }
}
</script>
