<template>
  <div class="container spaced">
    <div>
      <qas-numeric-input v-model="integer" entity="test" label="integer" />
      integer: {{ integer }}
    </div>
    <div class="q-my-lg">
      <qas-numeric-input v-model="decimal" entity="test" label="decimal" mode="decimal" />
      decimal: {{ decimal }}
    </div>
    <div class="q-my-lg">
      <qas-numeric-input v-model="percent" entity="test" label="percent" mode="percent" @update-model="onUpdate" />
      percent: {{ percent }}
    </div>
    <div class="q-my-lg">
      <qas-numeric-input v-model="money" entity="test" label="money" mode="money" />
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
  },

  methods: {
    onUpdate (value) {
      console.log('onUpdate', value)
    }
  }
}
</script>
