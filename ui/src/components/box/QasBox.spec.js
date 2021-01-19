import { mount } from '@vue/test-utils'

import '@/index.js'
import QasBox from './QasBox.vue'

describe('Test QasBox component', () => {
  const wrapper = mount(QasBox)

  it('Mount component', async () => {
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.classes()).toContain('qas-box__elevated')
  })

  it('Set form-mode', async () => {
    await wrapper.setProps({ formMode: true })
    expect(wrapper.classes()).toContain('qas-box__outlined')
  })
})
