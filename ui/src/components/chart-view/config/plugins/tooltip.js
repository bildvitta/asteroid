export const tooltipPluginConfig = {
  backgroundColor: '#212121',
  boxPadding: 4,
  callbacks: {
    title: function (items) {
      return items.map(item => item.dataset.tooltips[item.dataIndex] || item.label)
    }
  },
  caretSize: 0,
  cornerRadius: 4,
  displayColors: false,
  padding: 12,
  titleColor: '#fff',
  titleMarginBottom: 8
}
