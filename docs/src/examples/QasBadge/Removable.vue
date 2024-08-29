<template>
  <div class="container q-gutter-md q-py-lg">
    <qas-badge v-for="(key, value) in badges" :key="value" :color="value" :label="value" removable :text-color="key" />
  </div>
</template>

<script>
export default {
  computed: {
    badges () {
      return {
        'light-blue-2': 'black',
        'green-14': 'white',
        'blue-8': 'white',
        'grey-10': 'white',
        'orange-8': 'white',
        'red-14': 'white',
        'yellow-14': 'white',
        'grey-7': 'white',
        'purple-7': 'white',
        'amber-2': 'black',
        'green-11': 'black'
      }
    }
  }
}
</script>
