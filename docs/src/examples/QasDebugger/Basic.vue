<template>
  <div class="q-pa-md">
    <qas-debugger :inspect="[first, second, third]" />
  </div>
</template>

<script>
export default {
  computed: {
    first () {
      return { a: 1, b: 2, c: 3 }
    },

    second () {
      return [{ a: 1, b: 2, c: 3 }, { a: 1, b: 2, c: 3 }, { a: 1, b: 2, c: 3 }]
    },

    third () {
      return 'Lorem ipsum dolor sit amet consectetur adipisicing elit.'
    }
  }
}
</script>
