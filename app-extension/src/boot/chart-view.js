import thirdPartyComponentHandler from '@bildvitta/quasar-ui-asteroid/src/vue-plugin/third-party-component-handler'

export default async ({ app }) => {
  const thirdParty = thirdPartyComponentHandler({
    name: 'QasChartView',
    // TODO: Voltar código comentado antes de publicar
    importFn: () => import('../../../ui/src/components/chart-view/QasChartView.vue')
    // importFn: () => import('@bildvitta/quasar-ui-asteroid/src/components/chart-view/QasChartView.vue')
  })

  thirdParty.initializeComponent({ app })
}
