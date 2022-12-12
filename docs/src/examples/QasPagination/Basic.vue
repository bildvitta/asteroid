<template>
  <div class="container spaced">
    <qas-pagination v-model="model" :max="50" />
  </div>
</template>

<script>
export default {
  data () {
    return {
      model: 1
    }
  }
}
</script>
