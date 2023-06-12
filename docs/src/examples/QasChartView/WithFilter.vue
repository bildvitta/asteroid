<template>
  <div class="container spaced">
    <qas-chart-view
      entity="charts_multiple_results"
      subtitle="Para filtrar por dia, use o filtro ao lado."
      title="Canais de vendas impactados"
      type="line"
      use-filter-button
    />
  </div>
</template>

<script>
export default {
  name: 'QasChartViewWithFilter'
}
</script>
