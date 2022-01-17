<template>
  <div class="q-pa-md q-gutter-sm">
    <q-btn color="primary" label="Home Page" outline to="/" />
    <q-btn color="secondary" label="Home Page Delay" outline to="/" @click="openLinkWithDelay" />
  </div>
</template>

<script>
export default {
  methods: {
    openLinkWithDelay (event, go) {
      event.preventDefault()
      setTimeout(() => go('/'), 2000)
    }
  }
}
</script>
