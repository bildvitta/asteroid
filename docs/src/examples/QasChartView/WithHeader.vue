<template>
  <div class="container spaced">
    <qas-chart-view
      entity="charts"
      subtitle="Exibindo o número de novos contatos na semana atual."
      title="Novos contatos"
      type="bar"
    />
  </div>
</template>

<script>
export default {
  name: 'QasChartViewWithHeader'
}
</script>
