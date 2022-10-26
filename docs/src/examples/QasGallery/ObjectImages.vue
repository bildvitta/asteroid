<template>
  <div class="container spaced">
    <div>
      <qas-gallery v-model="images" use-delete />
      <pre>{{ images }}</pre>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      model: '',
      images: [
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
        },
        {
          name: 'Imagem vermelha 2',
          url: 'https://via.placeholder.com/200x300/ff0000/969696',
          uuid: 'imagem-vermelha-2'
        },
        {
          name: 'Imagem vermelha 3',
          url: 'https://via.placeholder.com/200x300/ff0000/969696',
          uuid: 'imagem-vermelha-3'
        },
        {
          name: 'Imagem verde 2',
          url: 'https://via.placeholder.com/200x300/09ff00/969696',
          uuid: 'imagem-verde-2'
        },
        {
          name: 'Imagem azul 2',
          url: 'https://via.placeholder.com/200x300/0044ff/969696',
          uuid: 'imagem-azul-2'
        },
        {
          name: 'Imagem vermelha 4',
          url: 'https://via.placeholder.com/200x300/ff0000/969696',
          uuid: 'imagem-vermelha-4'
        }
      ]
    }
  },

  computed: {
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
        },
        {
          name: 'Imagem vermelha 2',
          url: 'https://via.placeholder.com/200x300/ff0000/969696',
          uuid: 'imagem-vermelha-2'
        },
        {
          name: 'Imagem vermelha 3',
          url: 'https://via.placeholder.com/200x300/ff0000/969696',
          uuid: 'imagem-vermelha-3'
        },
        {
          name: 'Imagem verde 2',
          url: 'https://via.placeholder.com/200x300/09ff00/969696',
          uuid: 'imagem-verde-2'
        },
        {
          name: 'Imagem azul 2',
          url: 'https://via.placeholder.com/200x300/0044ff/969696',
          uuid: 'imagem-azul-2'
        },
        {
          name: 'Imagem vermelha 4',
          url: 'https://via.placeholder.com/200x300/ff0000/969696',
          uuid: 'imagem-vermelha-4'
        }
      ]
    }
  }
}
</script>
