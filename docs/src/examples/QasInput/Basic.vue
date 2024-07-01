<template>
  <div class="container q-py-lg row">
    <qas-input v-model="model" class="col-4" label="Meu input">
      <template #prepend>
        <q-icon name="sym_r_search" size="md" />
      </template>
      <template #append>
        <q-icon name="sym_r_edit" size="xs" />
        <qas-btn icon="sym_r_search" />
      </template>
    </qas-input>
    <qas-input v-model="model" class="col-4" label="Meu input" />

    <!-- Model: {{ model }} -->
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
