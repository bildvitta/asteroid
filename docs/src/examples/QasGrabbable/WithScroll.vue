<template>
  <qas-grabbable use-scroll-bar>
    <qas-box v-for="item in 20" :key="item" class="bg-grey-4 cursor-pointer q-ma-sm text-center" @click="onClick(item)">
      Item {{ item }}
    </qas-box>
  </qas-grabbable>
</template>

<script>
export default {
  methods: {
    onClick (item) {
      alert(`Clicado no box ${item}`)
    }
  }
}
</script>
