<template>
  <div class="container q-gutter-md q-py-lg">
    <qas-badge v-for="(key, value) in badges" :key="value" :color="value" :label="value" :text-color="key" />

    <qas-badge label="um valor com muitas linhas para que eu consiga fazer uns testinhoos rsrsrsr  que eu consiga fazer uns testinhoos rsrsrsr um valor com muitas linhas para que eu consiga fazer uns testinhoos rsrsrsr  que eu consiga fazer uns testinhoos rsrsrsr" multi-line />
  </div>
</template>

<script>
export default {
  computed: {
    colors () {
      return [
        'light-blue-2',
        'green-14',
        'blue-8',
        'grey-10',
        'orange-8',
        'red-14',
        'yellow-14',
        'grey-7',
        'purple-7',
        'amber-2',
        'green-11'
      ]
    },

    badges () {
      return {
        'light-blue-2': 'grey-9',
        'green-14': 'white',
        'blue-8': 'white',
        'grey-10': 'white',
        'orange-8': 'white',
        'red-14': 'white',
        'yellow-14': 'white',
        'grey-7': 'white',
        'purple-7': 'white',
        'amber-2': 'grey-9',
        'green-11': 'grey-9'
      }
    }
  }
}
</script>
