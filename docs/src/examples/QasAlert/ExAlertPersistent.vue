<template>
  <div class="container q-py-lg">
    <qas-alert storage-key="my-alert-persistent" text="Pequeno texto para demonstração." use-persistent-model-on-close />
  </div>
</template>

<script>
export default {
  data () {
    return {
      model: false
    }
  }
}
</script>
