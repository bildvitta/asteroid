<template>
  <div class="container q-py-lg">
    <qas-text-truncate dialog-title="Aqui está meu título!" :text="text" />
  </div>
</template>

<script>
export default {
  data () {
    return {
      text: ''
    }
  },

  created () {
    this.text = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis voluptatem dolorem animi molestias quasi sit, ipsa suscipit quaerat.'
  }
}
</script>
