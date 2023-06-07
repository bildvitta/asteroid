export const tooltipPluginConfig = {
  backgroundColor: '#212121',
  titleColor: '#fff',
  titleMarginBottom: 8,
  padding: 12,
  cornerRadius: 4,
  caretSize: 0,
  boxPadding: 4,
  displayColors: false,
  callbacks: {
    title: function (items) {
      return items.map(item => item.dataset.tooltips[item.dataIndex] || item.label)
    }
  }
}
