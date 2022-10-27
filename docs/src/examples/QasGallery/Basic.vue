<template>
  <div class="container spaced">
    <div>
      <qas-gallery v-model="images" />
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      images: [
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
    }
  }
}
</script>
