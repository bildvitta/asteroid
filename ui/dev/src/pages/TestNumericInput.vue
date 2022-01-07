<template>
  <div class="q-pa-md">
    <div class="text-h3 text-primary">QasNumericInput</div>

    <div class="q-mt-xl">
      <div class="fw-bold">Default</div>
      <qas-numeric-input v-model="model1" />
      <pre>{{ model1 }}</pre>
    </div>

    <div class="q-mt-xl">
      <div class="fw-bold">Decimal</div>
      <qas-numeric-input v-model="model2" mode="decimal" />
      <pre>{{ model2 }}</pre>
    </div>

    <div class="q-mt-xl">
      <div class="fw-bold">Percentage</div>
      <qas-numeric-input v-model="model3" mode="percent" />
      <pre>{{ model3 }}</pre>
    </div>

    <div class="q-mt-xl">
      <div class="fw-bold">Money</div>
      <qas-numeric-input v-model="model4" mode="money" />
      <pre>{{ model4 }}</pre>
    </div>

    <div class="q-mt-xl">
      <div class="fw-bold">Money (French)</div>
      <qas-numeric-input v-model="model5" preset="French" />
      <pre>{{ model5 }}</pre>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      model1: 0,
      model2: 1,
      model3: 2,
      model4: 3,
      model5: 4
    }
  }
}
</script>
