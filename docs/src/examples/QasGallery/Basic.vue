<template>
  <div class="container spaced">
    <div>
      <qas-gallery :images="images" :initial-size="4" />
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      model: ''
    }
  },

  computed: {
    images () {
      return [
        'https://via.placeholder.com/200x300/ff0000/969696',
        'https://via.placeholder.com/200x300/09ff00/969696',
        'https://via.placeholder.com/200x300/0044ff/969696',
        'https://via.placeholder.com/200x300/ff0000/969696',
        'https://via.placeholder.com/200x300/09ff00/969696',
        'https://via.placeholder.com/200x300/0044ff/969696',
        'https://via.placeholder.com/200x300/ff0000/969696',
        'https://via.placeholder.com/200x300/09ff00/969696',
        'https://via.placeholder.com/200x300/0044ff/969696',
        'https://via.placeholder.com/200x300/ff0000/969696',
        'https://via.placeholder.com/200x300/09ff00/969696',
        'https://via.placeholder.com/200x300/0044ff/969696'
      ]
    },

    images2 () {
      return [
        {
          name: 'Imagem vermelha',
          url: 'https://via.placeholder.com/200x300/ff0000/969696',
          uuid: 'imagem-vermelha'
        },
        {
          name: 'Imagem verde',
          url: 'https://via.placeholder.com/200x300/09ff00/969696',
          uuid: 'imagem-verde'
        },
        {
          name: 'Imagem azul',
          url: 'https://via.placeholder.com/200x300/0044ff/969696',
          uuid: 'imagem-azul'
        }
      ]
    }
  }
}
</script>
