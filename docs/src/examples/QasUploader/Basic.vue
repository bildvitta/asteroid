<template>
  <div class="container spaced">
    <div>
      <qas-uploader v-model="model" entity="test" label="Meu uploader" />
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      model: ''
    }
  }
}
</script>
