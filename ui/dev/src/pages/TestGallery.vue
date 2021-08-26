<template>
  <q-page class="container spaced">
    <div>
      <qas-label label="Fotos" />
      <qas-gallery :items="images" />
    </div>
  </q-page>
</template>

<script>
export default {
  computed: {
    images () {
      return [
        'https://cdn.pixabay.com/photo/2016/10/10/12/54/space-1728314_960_720.jpg',
        'https://cdn.pixabay.com/photo/2016/10/10/12/54/space-1728314_960_720.jpg',
        'https://cdn.pixabay.com/photo/2016/10/10/12/54/space-1728314_960_720.jpg',
        'https://cdn.pixabay.com/photo/2016/10/10/12/54/space-1728314_960_720.jpg',
        'https://cdn.pixabay.com/photo/2016/10/10/12/54/space-1728314_960_720.jpg',
        'https://cdn.pixabay.com/photo/2016/10/10/12/54/space-1728314_960_720.jpg',
        'https://cdn.pixabay.com/photo/2016/10/10/12/54/space-1728314_960_720.jpg',
        'https://cdn.pixabay.com/photo/2016/10/10/12/54/space-1728314_960_720.jpg',
        'https://cdn.pixabay.com/photo/2016/10/10/12/54/space-1728314_960_720.jpg'
      ]
    }
  }
}
</script>
