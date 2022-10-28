<template>
  <div class="container spaced">
    <div>
      <qas-gallery v-model="images" custom-id="31362c39-2cb5-4fe2-982a-c270f88d2462" entity="users" model-key="photos" use-destroy use-object-model />
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      images: [
        {
          name: 'Imagem vermelha',
          url: 'https://via.placeholder.com/200x300/ff0000/969696',
          uuid: 'imagem-vermelha',
          destroyable: true
        },
        {
          name: 'Imagem verde',
          url: 'https://via.placeholder.com/200x300/09ff00/969696',
          uuid: 'imagem-verde',
          destroyable: true
        },
        {
          name: 'Imagem azul',
          url: 'https://via.placeholder.com/200x300/0044ff/969696',
          uuid: 'imagem-azul',
          destroyable: false
        },
        {
          name: 'Imagem vermelha 2',
          url: 'https://via.placeholder.com/200x300/ff0000/969696',
          uuid: 'imagem-vermelha-2',
          destroyable: true
        },
        {
          name: 'Imagem vermelha 3',
          url: 'https://via.placeholder.com/200x300/ff0000/969696',
          uuid: 'imagem-vermelha-3',
          destroyable: true
        },
        {
          name: 'Imagem verde 2',
          url: 'https://via.placeholder.com/200x300/09ff00/969696',
          uuid: 'imagem-verde-2',
          destroyable: true
        },
        {
          name: 'Imagem azul 2',
          url: 'https://via.placeholder.com/200x300/0044ff/969696',
          uuid: 'imagem-azul-2',
          destroyable: true
        },
        {
          name: 'Imagem vermelha 4',
          url: 'https://via.placeholder.com/200x300/ff0000/969696',
          uuid: 'imagem-vermelha-4',
          destroyable: true
        }
      ]
    }
  }
}
</script>
