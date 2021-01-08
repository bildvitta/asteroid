import { shallowMount, mount } from '@vue/test-utils'

import '@/index.js'
import QasInput from './QasInput.vue'

describe('Test QasInput component', () => {
  const parent = mount({
    data: () => ({ model: '', mask: 'phone', unmaskedValue: true }),
    template: '<div><qas-input :mask="mask" :unmasked-value="unmaskedValue" v-model="model"></qas-input></div>',
    components: { 'qas-input': QasInput }
  })

  const input = parent.find('input')
  const wrapper = parent.findComponent({ name: 'QasInput' })

  function reset () {
    return {
      model: async () => await parent.setData({ model: '' }),
      unmaskedValue: async () => await parent.setData({ unmaskedValue: false })
    }
  }

  it('should exists', () => {
    expect(wrapper.exists()).toBe(true)
    expect(input.exists()).toBe(true)
  })

  it('test phone mask', async () => {
    // await input.setValue('99999999999')
    // expect(parent.vm.model).toBe('99999999999')
    // reset().model()

    // await input.setValue('9999999999')
    // expect(parent.vm.model).toBe('9999999999')
    // reset().model()

    reset().unmaskedValue()

    // await input.setValue('99999999999')
    // expect(parent.vm.model).toBe('(99) 99999-9999')
    // reset().model()

    // await parent.setData({ model: '' })
    await input.setValue('9999999999')
    await wrapper.vm.$emit('input', '9999999999')
    expect(parent.vm.model).toBe('(99) 9999-9999')

    console.log(parent.vm.model)
  })
})
