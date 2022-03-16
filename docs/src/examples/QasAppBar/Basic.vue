<template>
  <q-layout>
    <qas-app-bar is-auth title="QasAppBar" :user="user" />
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
    user () {
      return user
    }
  }
}
</script>
