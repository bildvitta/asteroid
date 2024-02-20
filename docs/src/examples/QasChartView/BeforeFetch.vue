<template>
  <div class="container spaced">
    <qas-chart-view
      :before-fetch="beforeFetch"
      entity="charts_multiple_results"
      subtitle="Passando o dia 01/06/2023 como padrão"
      title="Demonstração da propriedade beforeFetch"
      type="line"
      use-filter-button
    />
  </div>
</template>

<script>
export default {
  name: 'QasChartViewBeforeFetch',

  methods: {
    beforeFetch ({ payload, resolve, done }) {
      resolve({
        ...payload,
        filters: {
          ...payload.filters,
          date: '2023-06-01T03:00:00.000Z'
        }
      })

      done()
    }
  }
}
</script>
