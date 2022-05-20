<template>
  <div class="container spaced">
    <div>
      <qas-gallery :images="images" />
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
        'https://picsum.photos/200/300?random=1',
        'https://picsum.photos/200/300?random=2',
        'https://picsum.photos/200/300?random=3',
        'https://picsum.photos/200/300?random=4',
        'https://picsum.photos/200/300?random=5',
        'https://picsum.photos/200/300?random=6',
        'https://picsum.photos/200/300?random=7',
        'https://picsum.photos/200/300?random=8',
        'https://picsum.photos/200/300?random=9',
        'https://picsum.photos/200/300?random=10',
        'https://picsum.photos/200/300?random=11',
        'https://picsum.photos/200/300?random=12'
      ]
    }
  }
}
</script>
