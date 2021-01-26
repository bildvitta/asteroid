<template>
  <q-page padding>
    <MyComponent />
    <div v-test class="directive-target">
      x
    </div>
  </q-page>
</template>

<style lang="sass" scoped>
.directive-target
  width: 50px
  height: 50px
</style>
