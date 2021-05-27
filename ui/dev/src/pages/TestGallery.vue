<template>
  <q-page class="container  spaced">
    <div>
      <qas-label label="Fotos" />
      <qas-box class="q-pa-lg">
        <qas-gallery :photos="images" :photos-quantity-to-show="4" :photos-quantity-to-show-more="2" />
      </qas-box>
    </div>
  </q-page>
</template>

<script>
export default {
  computed: {
    images () {
      return [
        'https://cdn.pixabay.com/photo/2016/10/10/12/54/space-1728314_960_720.jpg',
        'https://cdn.pixabay.com/photo/2011/12/14/12/21/orion-nebula-11107_960_720.jpg',
        'https://cdn.pixabay.com/photo/2016/10/10/12/54/space-1728314_960_720.jpg',
        'https://cdn.pixabay.com/photo/2011/12/14/12/21/orion-nebula-11107_960_720.jpg',
        'https://cdn.pixabay.com/photo/2011/12/14/12/21/orion-nebula-11107_960_720.jpg',
        'https://cdn.pixabay.com/photo/2011/12/14/12/21/orion-nebula-11107_960_720.jpg',
        'https://cdn.pixabay.com/photo/2016/10/10/12/54/space-1728314_960_720.jpg',
        'https://cdn.pixabay.com/photo/2011/12/14/12/21/orion-nebula-11107_960_720.jpg',
        'https://cdn.pixabay.com/photo/2011/12/14/12/21/orion-nebula-11107_960_720.jpg',
        'https://cdn.pixabay.com/photo/2011/12/14/12/21/orion-nebula-11107_960_720.jpg',
        'https://cdn.pixabay.com/photo/2016/10/10/12/54/space-1728314_960_720.jpg',
        'https://cdn.pixabay.com/photo/2011/12/14/12/21/orion-nebula-11107_960_720.jpg',
        'https://cdn.pixabay.com/photo/2011/12/14/12/21/orion-nebula-11107_960_720.jpg'
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
