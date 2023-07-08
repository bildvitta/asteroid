<template>
  <div class="container q-py-lg">
    <qas-text-truncate dialog-title="Aqui está meu título!" text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis voluptatem dolorem animi molestias quasi sit, ipsa suscipit quaerat.">
      <q-checkbox v-model="model" class="ellipsis flex" label="Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis voluptatem dolorem animi molestias quasi sit, ipsa suscipit quaerat." />
    </qas-text-truncate>
    <q-checkbox v-model="model" class="ellipsis flex" label="Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis voluptatem dolorem animi molestias quasi sit, ipsa suscipit quaerat." />
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
