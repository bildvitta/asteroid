import { mount } from '@vue/test-utils'

import '@/index.js'
import QasDecimalInput from './QasDecimalInput.vue'

describe('Test QasDecimalInput component', () => {
  const wrapper = mount(QasDecimalInput, {
    propsData: {
      value: 100,
      comma: true
    }
  })

  it('Computed render check', () => {
    const separator = wrapper.vm.separator

    expect(separator).toContain(',')
  })

  it('Data value check', () => {
    const valueData = wrapper.vm.$data.inputValue

    expect(valueData).toContain('100,00')
  })

  it('Check v-model', () => {
    const parent = mount({
      components: { 'qas-decimal-input': QasDecimalInput },
      data () { return { model: 0 } },
      template: '<div><qas-decimal-input v-model="model" /></div>'
    })

    const inputModel = parent.find('input')
    inputModel.element.value = 1000
    inputModel.trigger('input')

    expect(parent.vm.model).toBe(10)
  })
})
