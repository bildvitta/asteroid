<template>
  <div class="container spaced">
    <qas-box>
      <qas-label label="Título" />

      <div class="q-col-gutter-md row">
        <div v-for="item in 10" :key="item" class="col-4">
          <qas-gallery-card v-bind="props" />
        </div>
      </div>
    </qas-box>
  </div>
</template>

<script>
export default {
  computed: {
    props () {
      return {
        name: 'Meu titulo',
        url: 'https://dhaw-crmap01-assets.s3.amazonaws.com/uploads/customers/import/upload/43e8aaef-6237-4e51-9cfd-f6b2c923f152.pdf'
        // url: 'https://picsum.photos/200/300.jpg'
      }
    }
  }
}
</script>
