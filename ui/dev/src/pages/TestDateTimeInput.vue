<template>
  <q-page class="container">
    <qas-date-time-input v-model="model" :date-props="{ landscape: true }" @vnode-mounted="onMounted" />

    model: <pre>{{ model }}</pre>
  </q-page>
</template>

<script>
export default {
  data () {
    return {
      model: ''
    }
  },

  methods: {
    onMounted () {
      alert('Componente mountado')
    }
  }
}
</script>
