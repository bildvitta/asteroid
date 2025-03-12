<template>
  <div class="container spaced">
    <div>
      <qas-numeric-input v-model="integer" icon-right="sym_r_person" label="integer" />
      integer: {{ integer }}
    </div>
    <div class="q-my-lg">
      <qas-numeric-input v-model="decimal" label="decimal" mode="decimal" />
      decimal: {{ decimal }}
    </div>
    <div class="q-my-lg">
      <qas-numeric-input v-model="percent" label="percent" mode="percent" />
      percent: {{ percent }}
    </div>
    <div class="q-my-lg">
      <qas-numeric-input v-model="money" label="money" mode="money" />
      money: {{ money }}
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      integer: 10,
      decimal: 0.10,
      percent: 0.10,
      money: 0.10
    }
  }
}
</script>
