<template>
  <div class="container spaced">
    <div>
      <qas-signature-uploader v-model="model" entity="test" upload-label="Meu uploader" />
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
