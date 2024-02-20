<template>
  <qas-grabbable use-scroll-bar>
    <qas-box v-for="i in 20" :key="i" class="bg-grey-5 cursor-pointer q-ma-xs" @click="onClick(i)">
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
