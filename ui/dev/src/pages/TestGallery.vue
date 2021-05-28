<template>
  <q-page class="container  spaced">
    <div>
      <qas-label label="Fotos" />
      <qas-box class="q-pa-lg">
        <qas-gallery label-show-more="carregar mais fotos" :photos="images" :photos-quantity-to-show="4" :photos-quantity-to-show-more="2" />
      </qas-box>
    </div>
  </q-page>
</template>

<script>
export default {
  computed: {
    images () {
      return [
        'https://cdn.pixabay.com/photo/2016/10/10/12/54/space-1728314_960_720.jpg'
      ]
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
