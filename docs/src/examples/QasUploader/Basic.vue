<template>
  <q-form class="container spaced">
    <div>
      <qas-uploader v-model="model" entity="serviceOrders" label="Meu uploader" />
      <qas-debugger :inspect="[model]" />
    </div>
  </q-form>
</template>

<script>

export default {
  data () {
    return {
      model: 'https://placehold.co/600x400/orange/white?text=img1'
    }
  }
}
</script>
