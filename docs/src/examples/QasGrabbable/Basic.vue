<template>
  <qas-grabbable>
    <qas-box v-for="i in 20" :key="i" class="bg-grey-2 cursor-pointer q-ma-sm" @click="onClick(i)">
      {{ i }}
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
