<template>
  <div class="container spaced">
    <qas-sortable v-model:sorted="model" class="row" entity="users" :list="list">
      <div v-for="(item, index) in list" :key="index">
        <img :src="item.photo" style="max-width: 300px;">
      </div>
    </qas-sortable>

    Model: <pre>{{ model }}</pre>
  </div>
</template>

<script>
export default {
  data () {
    return {
      model: [],
      options: {}
    }
  },

  computed: {
    list () {
      return [
        { photo: 'https://via.placeholder.com/200x300/ff0000/969696', id: '1w312l' },
        { photo: 'https://via.placeholder.com/200x300/09ff00/969696', id: '3x432q' },
        { photo: 'https://via.placeholder.com/200x300/0044ff/969696', id: '2y927s' }
      ]
    }
  }
}
</script>
