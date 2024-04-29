<template>
  <div class="container spaced">
    <qas-chart-view :colors-list="colorsList" entity="charts_multiple_results" type="bar" />
  </div>
</template>

<script setup>
defineOptions({ name: 'QasChartViewWithCustomColors' })

const colorsList = [
  '#FFB200',
  '#F62D1B'
]
</script>
