import thirdPartyComponentHandler from '../third-party-component-handler'

export default function () {
  const { QasComponent, initializeComponent } = thirdPartyComponentHandler({
    name: 'QasChartView',
    importFn: () => import('../../components/chart-view/QasChartView.vue')
  })

  return {
    QasComponent,

    initializeComponent (app) {
      return initializeComponent({ app })
    }
  }
}
