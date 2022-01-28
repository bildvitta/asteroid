<template>
  <div class="q-pa-md">
    <qas-breakline :text="text" />
  </div>
</template>

<script>
const text =
  `Lorem ipsum dolor sit amet consectetur adipisicing elit.
Impedit, commodi? Quisquam inventore cum nam excepturi.
Temporibus repellendus ea veritatis id eius blanditiis eaque quas rerum, magnam, sit excepturi provident numquam.`

export default {
  computed: {
    text () {
      return text
    }
  }
}
</script>
