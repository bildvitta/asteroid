<template>
  <qas-grabbable>
    <qas-box v-for="i in 100" :key="i" class="cursor-pointer q-ma-sm" @click="onClick(i)">
      Box {{ i }}
    </qas-box>
  </qas-grabbable>
</template>

<script>
export default {
  methods: {
    onClick (index) {
      alert(`Clicado no box ${index}`)
    }
  }
}
</script>
