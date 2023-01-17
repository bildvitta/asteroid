<template>
  <div class="container spaced">
    <div>
      Disable
      <qas-date-time-input v-model="model" disable label="Meu DateTimeInput" />
    </div>

    <div>
      Readonly
      <qas-date-time-input v-model="model" label="Meu DateTimeInput" readonly />
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      model: ''
    }
  }
}
</script>
